import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import 'leaflet/dist/leaflet.css'

interface LocationMapProps {
    zoom: number;
    center: [number, number];
    position: [number, number];
    scrollWheelZoom: boolean;
}
export default function LocationMap({zoom, center,position,scrollWheelZoom}: LocationMapProps){
    return (
        <div>
            <h2 className="text-lg font-semibold leading-6 text-gray-900 mb-2">Location</h2>
            <div className=" overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">

                <MapContainer  center={center} zoom={zoom} scrollWheelZoom={scrollWheelZoom}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

        </div>

    )
}
