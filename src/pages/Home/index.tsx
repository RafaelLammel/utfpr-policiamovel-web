import { useContext, useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import { ErrorResponse } from '../../interfaces/responses/ErrorResponse';
import { LocationsResponse } from '../../interfaces/responses/LocationsResponse';
import { getLocations } from '../../services/api';
import './styles.css';

export default function HomePage() {
  const { signOut } = useContext(AuthContext);
  const [coords, setcoords] = useState<LocationsResponse>();
  const navigate = useNavigate();
  
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
      const error = res as ErrorResponse
      if(error.cod === 401){//melhorar isso aqui, verificar se o erro eh 401
        await signOut();
      }
      else{
        alert(error.errorMsgs);
      }
    }
    else{
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

  async function logOutOnClick(){
    await signOut();
  }

  function novoUsuarioOnClick(){
    navigate('/usuario/criar');
  }

  return (
    <MapContainer center={[-25.5478553, -49.3416572]} zoom={13} scrollWheelZoom={true}>
      <div className='button-group'>
          <button className='button-map' onClick={logOutOnClick}>Log out</button>
          <button className='button-map' onClick={novoUsuarioOnClick}>Cadastrar novo usuário</button>
      </div>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkersComponent/>
    </MapContainer>

  )
}