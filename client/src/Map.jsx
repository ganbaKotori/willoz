import React, { useEffect, useState } from "react";
import L from "leaflet";


const Map = () => {
    var mapboxTiles = "https://api.mapbox.com/styles/v1/kotori13378/ckkdzuclh0s6a17nv61p7tiuv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia290b3JpMTMzNzgiLCJhIjoiY2tqd2RwYzF1MGVlbDMwbmxiYWR2NWkzZSJ9.s4hAHjSw-Avhn0EpX6hRUg";
    // Create our map tile layer:
    const MAP_TILE = L.tileLayer(mapboxTiles, {
        attribution: 'Created by Alexander Ramirez'
    });

    // Define the styles that are to be passed to the map instance:
    const mapStyles = {
        overflow: "hidden",
        width: "100%",
        height: "92vh"
    };

    const mapParams = {
        center: [34.052235, -118.243683],
        zoom: 10,
        zoomControl: false,
        maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
        layers: [MAP_TILE]
    };


    // This useEffect hook runs when the component is first mounted, 
    // similar to componentDidMount() lifecycle method of class-based
    // components:
    useEffect(() => {
        const map = L.map("map", mapParams);
    }, []);
    return (
        <div>
            <div id="map" style={mapStyles} />
        </div>
    )
}

export default Map