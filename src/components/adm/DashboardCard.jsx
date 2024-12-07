const DashboardCard = ({ count, title, Icon }) => {
	return (
		<div className="basis-96 mx-auto mb-3 lg:basis-1/3">
			<div className="card-gradient">
				<div className="text-card">
					<p className="text-[28px] md:text-[35px] xl:text-[48px]">{count}</p>
					<h2 className="text-[18px] md:text-[20px] xl:text-[24px]">{title}</h2>
				</div>
				<div className="icon-card">
					<Icon
						style={{
							width: "50px",
							height: "50px",
							fill: "#EF8822",
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default DashboardCard;
