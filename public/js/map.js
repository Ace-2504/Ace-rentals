mapboxgl.accessToken = mapToken;
console.log(mapToken);
const map = new mapboxgl.Map({
    container: 'map',
    center: coordinates,
    zoom: 9
});

const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML("<h4>Exact location will be provided after booking</h4>"))
    .addTo(map);