const distanceCalculate = (source, destination) => {
    const dist = google.maps.geometry.spherical.computeDistanceBetween(
        {lat: source.lat, lng: source.lng},
        {lat: destination.lat, lng: destination.lng}
    );
    const distanceToMiles = dist * 0.000621374;
    const formattedDistance = distanceToMiles.toFixed(2);
    console.log(formattedDistance);
};

export default distanceCalculate;