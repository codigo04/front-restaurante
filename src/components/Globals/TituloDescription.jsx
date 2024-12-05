export const TituloDescription = ({ titulo, decripcion }) => {
	return (
		<div className="my-3">
			<h2 style={{ margin: "0" }}>{titulo}</h2>
			<span>{decripcion}</span>
		</div>
	);
};
