import React from 'react'
import Header from '../Header/Header'
import { Footer } from '../Footer/Footer';
import './Events.css'

export const Events = () => {
  return (
    <>
      <Header />

      <section className='title_eventos'>
        <div className='title_productsc'>
          <h2>¡Descubre nuestros próximos eventos!</h2>
          <p>¡Esperamos verte pronto en uno de nuestros eventos y compartir juntos momentos inolvidables!</p>
        </div>

        <div className='event_title'>
          <h2 >Eventos</h2>
        </div>

        <div className='hojas'>
          <img className='hojasIzquierda' src="/images/hojasizqDesc.png" alt="" width={200} height={255} />
          <img className='hojasDerecha' src="/images/hojasderDesc.png" alt="" width={140} height={240} />
        </div>

        <section className='cont_eventos'>
          <div className='cont_img_event'>
            <img src="/images/evento1.jpg" alt="" />
          </div>

          <div className='info_evento'>
            <h3>Acerca del evento</h3>
            <p>VIERNES 26 DE ABRIL / 7:00 A.M a 5:00 P.M / Entrada libre</p>
          </div>

          <div className='ubicacion_evento'>
            <h3>Ubicación:</h3>
            <p>Plaza de Bolivar(Calarcá)</p>
          </div>

          <p className='descrip_eventos'>Desde talleres y conferencias hasta eventos comunitarios y lanzamientos especiales, tenemos una variedad de oportunidades para que te involucres, aprendas y te diviertas.</p>
        </section>
        <div className='hojas'>
          <img className='hojasIzquierda' src="/images/hojasizqDesc.png" alt="" width={200} height={255} />
          <img className='hojasDerecha' src="/images/hojasderDesc.png" alt="" width={140} height={240} />
        </div>

        <section className='cont_eventos'>
          <div className='cont_img_event'>
            <img src="/images/evento2.jpg" alt="" />
          </div>

          <div className='info_evento'>
            <h3>Acerca del evento</h3>
            <p>SABADO 20 DE ABRIL / 7:00 A.M a 2:00 P.M / Entrada libre</p>
          </div>

          <div className='ubicacion_evento'>
            <h3>Ubicación:</h3>
            <p>Plaza de Bolivar(Armenia)</p>
          </div>

          <p className='descrip_eventos'>Ventas y exhibiciones de productos agricolas y agroindutriales.</p>
        </section>

        <div className='hojas'>
          <img className='hojasIzquierda' src="/images/hojasizqDesc.png" alt="" width={200} height={255} />
          <img className='hojasDerecha' src="/images/hojasderDesc.png" alt="" width={140} height={240} />
        </div>

        <section className='cont_eventos'>
          <div className='cont_img_event'>
            <img src="/images/evento3.jpg" alt="" />
          </div>

          <div className='info_evento'>
            <h3>Acerca del evento</h3>
            <p>MIERCOLES 19 DE JUNIO / 7:30 A.M a 2:00 P.M / Entrada libre</p>
          </div>

          <div className='ubicacion_evento'>
            <h3>Ubicación:</h3>
            <p>Plaza de Bolivar(Armenia)</p>
          </div>

          <p className='descrip_eventos'>Desde ferias y exposiciones hasta seminarios y talleres prácticos, nuestros eventos agrícolas ofrecen una oportunidad única para aprender, conectarte y compartir experiencias con colegas de la industria.</p>
        </section>
      </section>
      
      <Footer />
    </>
  )
}
