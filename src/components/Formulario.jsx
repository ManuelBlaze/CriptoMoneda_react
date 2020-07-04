import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import useMoneda from '../hooks/useMoneda';
import useCripto from '../hooks/useCripto';
import Error from './Error';

const Boton = styled.input`
    margin-top:20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: all .3s ease;

    :hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = () => {

    //State dle listado desde la API
    const [listCripto, setListCripto] = useState([]);
    //Error
    const [error, setError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar USA'},
        {codigo: 'COP', nombre: 'Peso Colombiano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'MXN', nombre: 'Peso Méxicano'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]

    //Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda', '', MONEDAS);

    //Utilizar useCripto
    const [cripto, SelectCripto] = useCripto('Elige tu Criptomoneda', '', listCripto);

    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url =	"https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            
            const resultado = await axios.get(url);

            setListCripto((resultado.data.Data));
        }
        consultarAPI();
    }, []);

    //cuando el usuario hace Submit
    const cotizarMoneda = (e) => {
        e.preventDefault();

        //Validar si los campos estan llenos
        if (moneda.trim() === '' || cripto.trim() === '') {
            setError(true);
            return;
        }

        //pasar los datos al componente principal
        setError(false);
    }
    

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Selecciona ambos campos" /> : null}

            <SelectMonedas />

            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    )
}

export default Formulario
