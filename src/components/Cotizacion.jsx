import React from 'react';
import PropTypes from 'prop-types';
import styled from "@emotion/styled";

const ResultadoDiv = styled.div`
	color: #fff;
    font-family: "Bebas Neue", cursive;
    text-align: center;

	p {
		span {
			font-weight: bold;
		}
	}
`;

const Info = styled.p`
    font-size: 18px;
`;

const Precio = styled.p`
    font-size: 30px;
    margin-bottom: 0;
`;

const GridFather = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const Cotizacion = ({resultado}) => {
    
    //no mostrar si el objet viene vacio (ejecucion inicial)
    if (Object.keys(resultado).length === 0) return null;

    return (
			<ResultadoDiv>
				<Precio>
					{resultado.FROMSYMBOL} : <span>{resultado.PRICE}</span>
				</Precio>
                <GridFather>
                    <div>
                        <Info>
                            Precio más alto/día: <br /> <span>{resultado.HIGHDAY}</span>
                        </Info>
                        <Info>
                            Precio más bajo/día: <br /> <span>{resultado.LOWDAY}</span>
                        </Info>
                    </div>
                    <div>
                        <Info>
                            Variación u/24h: <br /> <span>{resultado.CHANGEPCT24HOUR}</span>
                        </Info>
                        <Info>
                            Última Actualización: <br /> <span>{resultado.LASTUPDATE}</span>
                        </Info>
                    </div>
                </GridFather>
			</ResultadoDiv>
		);
}

Cotizacion.propTypes = {
    resultado: PropTypes.object.isRequired
}

export default Cotizacion
