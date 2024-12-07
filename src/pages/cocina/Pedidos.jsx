import React from 'react'
import { MainCocina } from "./MainCocina";
import './style-cocina.css'

export const Pedidos = () => {
	return (
		<div className="container-fluid alert alert-info  bg-white rounded-3 flex-grow-1 mb-3" role="alert">
			{/* <HeaderCocina fecha={date} title={area} /> */}
			<MainCocina />
		</div>
	);
};



