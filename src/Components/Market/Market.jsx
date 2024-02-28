import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate de React Router
import markets from '../.././assets/Markets/markets';
import './Market.css';

export default function Market() {
  const [selectedMarket, setSelectedMarket] = useState(null);
  const navigate = useNavigate(); // Obtiene la instancia de navigate de React Router

  const handleClick = (market) => {
    setSelectedMarket(market);
    navigate(`/market/${market.id}`); // Usa navigate para navegar a la página del mercado
  };

  return (
    <>
      {selectedMarket ? (
        <div className='card_market' key={selectedMarket.id}>
          <h2>{selectedMarket.name}</h2>
          <p>{selectedMarket.description}</p>
        </div>
      ) : (
        markets.map((market) => (
          <div className='card_market' key={market.id} onClick={() => handleClick(market)}>
            <img className='image_market' src={market.image} alt="#" />
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