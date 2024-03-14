import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className='cont_notFound'>
      <div className='notFound'>
        <h2>404 - Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no se pudo encontrar.</p>
        <Link to="/" className="btn-link">Volver al inicio</Link>
      </div>
    </div>
  );
}
