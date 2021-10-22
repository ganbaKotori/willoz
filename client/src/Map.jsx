import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, LayersControl } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw'
import "leaflet-draw/dist/leaflet.draw.css";
import { circle } from "leaflet";

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            markers: [[51.505, -0.09]],
            mapLayers: null
        };
        this.setMapLayers = this.setMapLayers.bind(this);
    }

    setMapLayers(event) {
        this.setState({ mapLayers: event });
    }

    addMarker = (e) => {
        const { markers } = this.state
        markers.push(e.latlng)
        this.setState({ markers })
    }
    render() {
        var mapboxTiles = "https://api.mapbox.com/styles/v1/kotori13378/ckkdzuclh0s6a17nv61p7tiuv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia290b3JpMTMzNzgiLCJhIjoiY2tqd2RwYzF1MGVlbDMwbmxiYWR2NWkzZSJ9.s4hAHjSw-Avhn0EpX6hRUg";

        const _onCreate = e => {
            console.log(e);
            const { layerType, layer } = e;
            if (layerType === "polygon") {
                const { _leaflet_id } = layer;
                console.log(layer.getLatLngs()[0])

                this.setMapLayers((layers) => [...layers, { id: _leaflet_id, latlngs: layer.getLatLngs()[0] }])
            }
        }

        const _onEdited = e => {
            console.log(e);
        }

        const _onDeleted = e => {
            console.log(e)
        }

        return (
            <>
                <MapContainer center={[34.052235, -118.243683]} zoom={10} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='Created by Alexander Ramirez'
                        url={mapboxTiles}
                    />
                    <FeatureGroup>
                        < EditControl
                            position="topright"
                            onCreated={_onCreate}
                            onEdited={_onEdited}
                            onDeleted={_onDeleted}
                            draw={{
                                rectangle: false,
                                polyline: false,
                                circle: false,
                                circlemarker: false,
                                marker: false
                            }}
                        />
                    </FeatureGroup>
                    {this.state.markers.map((position, idx) =>
                        <Marker key={`marker-${idx}`} position={position}>
                            <Popup>
                                <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>

            </>
        )
    }
}

export default Map