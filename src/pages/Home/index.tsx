import React, { useContext, useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useNavigate } from 'react-router-dom';

import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

import AuthContext from '../../contexts/auth';
import { ErrorResponse } from '../../interfaces/responses/ErrorResponse';
import { LocationsResponse } from '../../interfaces/responses/LocationsResponse';
import { getLocations } from '../../services/api';
import {INITIAL_COORDINATES} from "../../consts/LeafletConsts";
import {LOCATION_UPDATE_RATE} from "../../consts/LocationConsts";
import Moment from 'moment';

import './styles.css';
import L from 'leaflet';

export default function HomePage() {
  const { signOut } = useContext(AuthContext);
  const [coords, setCoords] = useState<LocationsResponse>();
  const navigate = useNavigate();

  let interval: number | undefined = undefined;

  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const blueIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  useEffect(() => {
    (async () => {
      await getLocationsInterval();
    })();
    interval = setInterval(getLocationsInterval, LOCATION_UPDATE_RATE);
    return () => {
      if(interval !== undefined)
        clearInterval(interval);
    };
  }, []);

  const getLocationsInterval = async () =>  {
    const res = await getLocations();
    if (!('locations' in res)){
      const error = res as ErrorResponse;
      if(interval !== undefined)
        clearInterval(interval);
      alert(error.errorMsgs);
      await signOut();
      return;
    }
    setCoords(res);
  }

  const markersComponent = () =>
    coords?.locations.filter(x => x.latitude !== null && x.longitude !== null).map((location, index) =>
      <Marker position={[parseFloat(location.latitude), parseFloat(location.longitude)]} key={index} icon={(Date.now() - Moment(location.lastPutDate, 'DD/MM/YYYY HH:mm:ss').toDate().getTime()) > 60000 ? redIcon : blueIcon}>
        <Popup>
          {location.login} - {Moment(location.lastPutDate, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY, HH:mm:ss')}
        </Popup>
      </Marker>
    );

  async function logOutOnClick(){
    await signOut();
  }

  function novoUsuarioOnClick(){
    navigate('/usuario/criar');
  }

  return (
    <MapContainer center={INITIAL_COORDINATES} zoom={12} scrollWheelZoom={true}>
      <ButtonToolbar style={{zIndex: 10000, position: "absolute", margin: "5px", right: 0}}>
          <Button variant="primary" className="mx-2" onClick={novoUsuarioOnClick}>Cadastrar Novo Usuário</Button>
          <Button variant="danger" onClick={logOutOnClick}>Log Out</Button>
      </ButtonToolbar>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      { markersComponent() === undefined ?
        <></> :
        markersComponent()}
    </MapContainer>

  )
}