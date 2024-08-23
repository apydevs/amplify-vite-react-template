export const  getBoundingBox = (latitude:number, longitude:number, radiusInMiles:number) => {
    const earthRadius = 3958.8; // Radius of the Earth in miles

    // Latitude boundaries
    const latDelta = radiusInMiles / earthRadius;
    const minLat = latitude - latDelta;
    const maxLat = latitude + latDelta;

    // Longitude boundaries (adjusted by latitude)
    const lonDelta = radiusInMiles / (earthRadius * Math.cos((Math.PI * latitude) / 180));
    const minLon = longitude - lonDelta;
    const maxLon = longitude + lonDelta;

    return {
        minLat,
        maxLat,
        minLon,
        maxLon
    };
};
