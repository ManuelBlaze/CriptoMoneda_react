import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from "./components/Formulario";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-size:50px;
  font-weight:700;
  margin-bottom:50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [moneda, setMoneda] = useState('');
  const [cripto, setCripto] = useState('');
  const [resultado, setResultado] = useState({});

  //UseFfect para consultar la api
  useEffect(() => {
    const cotizarCriptoMoneda = async () => {
      //Evitar ejecucion inicial
      if (moneda === '') return;
      
      //Consultar API
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      setResultado(resultado.data.DISPLAY[cripto][moneda]);
    }
    cotizarCriptoMoneda();
  }, [moneda, cripto])

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="Criptomonedas"
        />
      </div>
      <div>
        <Heading>
          Cotiza Criptomonedas al Instante
        </Heading>
        <Formulario 
          setMoneda = {setMoneda}
          setCripto = {setCripto}
        />
      </div>
    </Contenedor>
  );
}

export default App;
