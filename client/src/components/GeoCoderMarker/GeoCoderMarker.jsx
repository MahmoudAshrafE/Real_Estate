import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from 'esri-leaflet-geocoder';
import { map_api } from '../../config/api';
import { toast } from 'react-toastify';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]);

  useEffect(() => {
    const esriGeocoderUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine=${encodeURIComponent(
      address
    )}&outFields=Match_addr,Addr_type&maxLocations=1&forStorage=false`;

    fetch(esriGeocoderUrl)
      .then((response) => response?.json())
      .then((data) => {
        const { location } = data?.candidates[0];
        if (location) {
          const { x: lng, y: lat } = location;
          setPosition([lat, lng]);
          map.flyTo([lat, lng], 6);
        }
      }).catch((error) => {
        toast.info('Add location here');
      });
  }, [address, map]);

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup />
    </Marker>
  );
};

export default GeoCoderMarker;
