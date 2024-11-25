// App  imports
import './styles.scss';

// Third-party imports
import * as d3 from "d3";

export const Legend = ({ cnpjProperties, data }: any) => {
	if (!data) return <></>
		
	const sumOfValues = d3.sum(Object.values(data));

	return (
		<div className="gauge-legend-wrapper">
			{Object.keys(data).map((item: any) => {
				const backgroundColor = cnpjProperties[item].color;
				const legend = cnpjProperties[item].legend;

				return (
					<div key={item} className="gauge-legend-item">
						<div className="legend-icon" style={{ backgroundColor: backgroundColor }}></div>
						<div style={{fontSize: "0.6em"}}>{legend}</div>
					</div>
				)
			})}
		</div>
	)
}

Legend.displayName="Legend";