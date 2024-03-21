import React from "react";
import styles from "./Map.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import { useEffect } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/UseGeolocation.jsx";
import Button from "./Button.jsx";
import { UseUrlPosition } from "../hooks/UseUrlPosition.jsx";

const Map = () => {
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = UseUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition(() => [mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      {!geoLocationPosition && (
        <Button type={"position"} onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities?.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

function DetectClick() {
  const [clickedLocation, setClickedLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (clickedLocation) {
      const { lat, lng } = clickedLocation;
      navigate(`form?lat=${lat}&lng=${lng}`);
      // Reset clickedLocation to null after navigation
      setClickedLocation(null);
    }
  }, [clickedLocation, navigate]);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setClickedLocation({ lat, lng });
    },
  });

  return null;
}

export default Map;
