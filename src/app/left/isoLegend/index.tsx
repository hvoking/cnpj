export const IsoLegend = () => {
	const data: any = {
		"rgba(201, 218, 174, 0.8)": {r: "1", w: "12"},
		"rgba(213, 173, 236, 0.8)": {r: "2", w: "24"},
		"rgba(178, 217, 235, 0.8)": {r: "3", w: "36"},
		"rgba(206, 171, 165, 0.8)": {r: "5", w: "60"},
	}
		
	return (
		<div className="gauge-legend-wrapper">
			{Object.keys(data).map((item: any) => {
				const radius = data[item].r;
				const walk = data[item].w;

				return (
					<div key={item} className="gauge-legend-item">
						<div className="distance-info">
							<div>
								{radius}
								<span style={{fontSize: "0.8em"}}> km</span>
							</div>
							<div>
								{walk}
								<span style={{fontSize: "0.8em"}}> min</span>
							</div>
						</div>
						<div className="legend-icon" style={{ backgroundColor: item }}></div>
					</div>
				)
			})}
		</div>
	)
}

IsoLegend.displayName="IsoLegend";