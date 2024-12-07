import React from "react";

export const Saludo = ({ nombre }) => {
	const today = new Date();
	const formattedDate = today.toLocaleDateString("es-ES", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<header className="flex flex-col justifu-center items-start md:flex-row md:justify-between md:items-center my-4" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
			<h2 className="text-3xl font-semibold">Hola, {nombre}</h2>
			<h2 className="text-xl font-medium sm:text-2xl lg:text-3xl">Chimbote, {formattedDate}</h2>
		</header>
	);
};
