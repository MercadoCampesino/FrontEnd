import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate de React Router
import markets from '../.././assets/Markets/markets';
import './Market.css';
import { useSelector } from 'react-redux';


export default function Market() {
  
    const navigates = useNavigate()
    
    const user = useSelector((state) => {
        const profile = state.user?.user
        console.log(profile)
        if (profile) return profile; else navigates('/login')
    });

  const [selectedMarket, setSelectedMarket] = useState(null);
  const navigate = useNavigate(); // Obtiene la instancia de navigate de React Router
  const [fotoPerfil, setFotoPerfil] = useState(user?.imagen);

  const handleClick = (market) => {
    setSelectedMarket(market);
    navigate(`/market`); // Usa navigate para navegar a la página del mercado
  };


  const handlePerfilChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setFotoPerfil(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>

      {selectedMarket ? (
        <div id='card_market' className='card_market' key={selectedMarket.id}>
          <h2>{selectedMarket.name}</h2>
          <p>{selectedMarket.description}</p>
        </div>
      ) : (
        markets.map((market) => (
          <div className='card_market' key={market.id} onClick={() => handleClick(market)}>
            {/* <img className='image_market' src={market.image} alt="#" /> */}
            <img  className="perfil-img" src={fotoPerfil ?? "x"} alt="Foto de perfil" />
            <p className='name_market'>{market.name}</p>
          </div>
        ))
      )}
    </>
  );
}





// import React from 'react'
// import markets from '../.././assets/Markets/markets';
// import './Market.css'

// export default function Market() {
//     return (
//         <>
//             {markets.map((market) => (
//                 <div className='card_market' key={market.id}>
//                     <img className='image_market' src={market.image} alt="#" />
//                     <p className='name_market'>{market.name}</p>
//                 </div>
//             ))}
//         </>
//     )
// }

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import markets from '../.././assets/Markets/markets';
// import './Market.css';

// export default function Market() {
//   const [selectedMarket, setSelectedMarket] = useState(null);

//   const handleClick = (market) => {
//     setSelectedMarket(market);
//   };





// import React from 'react';
// import { Link } from 'react-router-dom';
// import markets from '../.././assets/Markets/markets';
// import './Market.css';

// export default function Market() {
//   return (
//     <>
//       {markets.map((market) => (
//         <div className='card_market' key={market.id}>
//           <Link to={`/market/${market.id}`}>
//             <img className='image_market' src={market.image} alt="#" />
//           </Link>
//           <p className='name_market'>{market.name}</p>
//         </div>
//       ))}
//     </>
//   );
// }