export const TituloDescription = ({ titulo, decripcion }) => {
	return (
		<div className="my-3">
			<h2 className="m-0">{titulo}</h2>
			<span>{decripcion}</span>
		</div>
	);
};
