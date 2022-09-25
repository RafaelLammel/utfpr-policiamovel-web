import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

export default function HomePage() {
  var arrCordinates = [[-25.5478553, -49.3416572], [-25.5678553, -49.3616572], [-25.5878553, -49.3816572]]
  const [coords, setcoords] = useState(arrCordinates);

  useEffect(() => {
    const interval = setInterval(() => {
      myFunc();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [coords]);

  const myFunc = () =>  {
    setcoords([[coords[0][0] + 0.01, coords[0][1] + 0.01], [coords[1][0] + 0.01, coords[1][1] + 0.01], [coords[2][0] + 0.01, coords[2][1] + 0.01]]);
    console.log("opa");
  }
  function Teste(){

    return coords.map(coordenada => {
      return (      
        <Marker position={coordenada}>
        </Marker>
      )
    })
  }
  return (
    // <div>
    //     <h1>Hello World</h1>
    // </div>
    <MapContainer center={[-25.5478553, -49.3416572]} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Teste/>
  </MapContainer>
  )
}