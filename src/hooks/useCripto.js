import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
	font-family: "Bebas Neue", cursive;
	color: #fff;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 2.4rem;
	margin-top: 2rem;
	display: block;
`;

const Select = styled.select`
	-webkit-appearance: none;
	width: 100%;
	display: block;
	padding: 0.7rem;
	border: none;
	border-radius: 10px;
	font-size: 1.2rem;
`;

const useCripto = (label, stateInicial, opciones) => {
	//state cstom Hook
	const [state, setState] = useState(stateInicial);

	const SelectCripto = () => (
		<Fragment>
			<Label>{label}</Label>
			<Select onChange={(e) => setState(e.target.value)} value={state}>
				<option value="">-- Seleccione --</option>
				{opciones.map((opcion) => (
					<option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>
						{opcion.CoinInfo.FullName}
					</option>
				))}
			</Select>
		</Fragment>
	);

	//Retornar state, interfaz, fn que modifica el state
	return [state, SelectCripto, setState];
};

export default useCripto;
