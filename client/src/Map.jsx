import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, LayersControl, Polygon, Tooltip } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import "leaflet-draw/dist/leaflet.draw.css";

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            markers: [[51.505, -0.09]],
            mapLayers: null,
            map : null,
            map_bounds: null
        };
        this.setMapLayers = this.setMapLayers.bind(this);
        this.setMap = this.setMap.bind(this);
        this.setBounds = this.setBounds.bind(this);
        this.getMapBounds = this.getMapBounds.bind(this);
        //this.setMapBounds = this.setMapBounds.bind(this);
    }

    setMapLayers(event) {
        this.setState({ mapLayers: event });
    }

    setMap(map_obj) {
        this.setState({ map: map_obj });
        this.setState({ map_bounds: map_obj.getBounds() });

    }

    getMapBounds(){
        return this.state.map.getBounds()
    }

    setBounds() {
        console.log(" moved")

    }

    addMarker = (e) => {
        const { markers } = this.state
        markers.push(e.latlng)
        this.setState({ markers })
    }

    render() {
        var mapboxTiles = "https://api.mapbox.com/styles/v1/kotori13378/ckkdzuclh0s6a17nv61p7tiuv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia290b3JpMTMzNzgiLCJhIjoiY2tqd2RwYzF1MGVlbDMwbmxiYWR2NWkzZSJ9.s4hAHjSw-Avhn0EpX6hRUg";

        const { latlngs, zoom } = this.props;

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
                <MapContainer 
                    whenCreated={this.setMap} 
                    center={latlngs} zoom={10} 
                    scrollWheelZoom={false}
                    moveend={this.setBounds}
                    zoom={zoom}
                >
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

                    {this.props.income.map((income, idx) =>
                        <Polygon key={`marker-${idx}`} pathOptions={{ fillColor: income['color'] }} positions={income['position']}>
                            <Tooltip sticky>${income['average']}</Tooltip>
                        </Polygon>
                    )}
                    {this.props.demographic.map((demographic, idx) =>
                        <Polygon key={`marker-${idx}`} positions={demographic['position']}>
                            <Tooltip sticky>Demographic</Tooltip>
                        </Polygon>
                    )}

                    {this.props.school.map((school, idx) =>
                        <Marker key={`marker-${idx}`} position={school['position']}>
                        </Marker>
                    )}

                    demographic
                </MapContainer>

            </>
        )
    }
}

export default Map