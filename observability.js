// observability.js — structured logging, Prometheus metrics, /health, /metrics,
// and optional Sentry error tracking. Reusable, no external service required to run.
//
// Mount it immediately after you create the app:
//     const attachObservability = require("./observability");
//     attachObservability(app, { serviceName: "SERVICE_NAME" });
const client = require("prom-client");
const pinoHttp = require("pino-http");

module.exports = function attachObservability(app, options = {}) {
  const serviceName = options.serviceName || "app";

  // Optional error tracking — only active if SENTRY_DSN is set, so it is safe in dev/CI.
  if (process.env.SENTRY_DSN) {
    try {
      const Sentry = require("@sentry/node");
      Sentry.init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 0.1 });
    } catch (e) {
      console.warn("Sentry DSN set but @sentry/node not installed; skipping.");
    }
  }

  // Structured request logs
  app.use(pinoHttp({ autoLogging: true }));

  // Metrics registry (default process metrics + per-request latency histogram)
  const register = new client.Registry();
  register.setDefaultLabels({ service: serviceName });
  client.collectDefaultMetrics({ register });
  const httpDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "HTTP request duration in seconds",
    labelNames: ["method", "route", "status"],
    buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
    registers: [register],
  });
  app.use((req, res, next) => {
    const end = httpDuration.startTimer();
    res.on("finish", () => {
      end({
        method: req.method,
        route: (req.route && req.route.path) || req.path,
        status: res.statusCode,
      });
    });
    next();
  });

  // Liveness/readiness probe (no DB dependency, safe for uptime checks)
  app.get("/health", (req, res) => {
    res.json({
      status: "ok",
      service: serviceName,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  // Prometheus scrape endpoint (point Grafana Cloud / Prometheus here)
  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  });

  return app;
};
