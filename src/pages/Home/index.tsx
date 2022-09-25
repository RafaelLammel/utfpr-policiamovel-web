import React, { useContext, useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import AuthContext from '../../contexts/auth';
import { LocationsResponse } from '../../interfaces/responses/LocationsResponse';
import { LoginErrorResponse } from '../../interfaces/responses/LoginErrorResponse';
import { getLocations } from '../../services/api';

export default function HomePage() {
  const { signOut } = useContext(AuthContext);
  const [coords, setcoords] = useState<LocationsResponse>();

  useEffect(() => {
    getLocationsInterval()
  }, [])
  
  useEffect(() => {
    const interval = setInterval(() => {
      getLocationsInterval();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [coords]);

  const getLocationsInterval = async () =>  {
    const res = await getLocations();
    if (!('locations' in res)){
      const error = res as LoginErrorResponse
      if(error.errorMsgs.length != 0){//melhorar isso aqui, verificar se o erro eh 401
        await signOut();
      }
    }
    else{
      console.log(res)
      setcoords(res)
    }
  }

  function MarkersComponent(){
    return coords?.locations.map((location) => {
      if(location.latitude !== null && location.longitude !== null){
        return (      
          <Marker position={[parseFloat(location.latitude), parseFloat(location.longitude)]}>
            <Popup>
              {location.userId}
            </Popup>
          </Marker>
        )
      }
    })
  }
  return (
    <MapContainer center={[-25.5478553, -49.3416572]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkersComponent/>
    </MapContainer>
  )
}