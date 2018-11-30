import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import Neuron from './neuron.png'

const Logo = () => {
  return(
    <Tilt className="Tilt ml4 shadow-4" options={{ max : 55 }}>
      <div className="Tilt-inner"><img src={Neuron} alt="Neuron_Logo" /></div>
    </Tilt>
  )
}

export default Logo;