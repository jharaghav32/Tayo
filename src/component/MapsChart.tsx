import React, { useEffect, useState } from 'react';
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
  };
  active: number;
  recovered: number;
  deaths: number;
}

const markerIcon = new L.Icon({
  iconUrl: require("./location.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const center: [number, number] = [40.63463151377654, -97.89969605983609];

const MapsChart: React.FC = () => {
    //creating state to store data
  const [countries, setCountries] = useState<CountryData[]>([]);

  useEffect(() => {
    //fetching data
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={3}
      style={{ width: '700px', height: '90vh' }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=0QL0WFisiNjHiiDrl9it"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {countries.map((country) => (
        <Marker
          position={[country.countryInfo.lat, country.countryInfo.long]}
          icon={markerIcon}
          key={country.country}
        >
          <Popup>
            <div>
              <h2>{country.country}</h2>
              <p>Active: {country.active}</p>
              <p>Recovered: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapsChart;
