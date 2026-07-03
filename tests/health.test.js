const express = require("express");
const request = require("supertest");
const attachObservability = require("../observability");

function makeApp() {
  const app = express();
  attachObservability(app, { serviceName: "test" });
  return app;
}

describe("observability endpoints", () => {
  test("GET /health returns ok", async () => {
    const res = await request(makeApp()).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(typeof res.body.uptime).toBe("number");
  });

  test("GET /metrics exposes Prometheus metrics", async () => {
    const app = makeApp();
    await request(app).get("/health"); // record one request
    const res = await request(app).get("/metrics");
    expect(res.status).toBe(200);
    expect(res.text).toMatch(/process_cpu_user_seconds_total|http_request_duration_seconds/);
  });
});
