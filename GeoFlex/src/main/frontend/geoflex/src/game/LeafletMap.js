import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CurrentPosIcon from "./Map-Pin.png"

const Maps = (props) => {
  const [position, setPosition] = useState(null);

  function arrivedAtLocation(){
    let lat = position.lat
    let lng = position.lng
    props.setUserArrived(lat, lng)
  }
  console.log(props.destination)
  function LocationMarker() {
    

    const map = useMap();

    useEffect(async () => {
      await map.locate().on("locationfound", async function (e) {
        await setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }, []);
    var L = window.L;
    let posIcon = L.icon({
        iconUrl: CurrentPosIcon,
        iconRetinaUrl: CurrentPosIcon,
        iconAnchor: [5, 55],
        popupAnchor: [10, -44],
        iconSize: [35, 40],
      });
      

    return position === null ? null : (
      <Marker position={position} icon={posIcon} autoClose={false}>
        <Popup>Här är du</Popup>
      </Marker>
    );
  }

  function QuestionMarker() {
    /*
    Här måste vi läsa in koordinater från API till frågan.
    Koordinaterna sätts in i position.
    */
    var L = window.L;
    let visitorIcon = L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
    });
    return (
        <Marker position={[props.destination[0], props.destination[1]]} icon={visitorIcon} autoClose={false}>
          <Popup>Fråga 1</Popup>
        </Marker>
    )
  }

  
  return (
    <MapContainer
      center={[props.destination[0], props.destination[1]]}
      zoom={14}
      scrollWheelZoom
      style={{ height: "50vh" }}      
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker />
      <QuestionMarker />      
    </MapContainer>
    
  );
};

export default Maps;

