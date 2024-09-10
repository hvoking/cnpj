// App imports
import './styles.scss';

// Context imports
import { useCnpjApi } from '../../context/api/cnpj';

// Third-party imports
import * as d3 from 'd3';
	
export const Legend = () => {
	const { filteredCounts, cnpjProperties } = useCnpjApi();

	const totalCount = filteredCounts && d3.sum(Object.values(filteredCounts));
	
	const linearScale = totalCount && d3.scaleLinear()
		.domain([0, totalCount])
		.range([0, 100]);

	const parcialCounts: any = {}

	totalCount && Object.keys(filteredCounts).filter((item: any) => {
		const currentCount = filteredCounts[item];
		parcialCounts[item] = Math.round(linearScale(currentCount))
	});

	return (
		<>
		{totalCount && <div className="business-legend">
			{Object.keys(parcialCounts).map((item: any, index: any) => {
				return (
					<div key={index} className="business-legend-item">
						<div style={{
							borderRadius: "50%",
							width: "15px",
							height: "15px",
							backgroundColor: cnpjProperties[item].color
						}}/>
						<div>{cnpjProperties[item].legend}</div>
						<svg width="100%" height="12px">
							<line
								x1="0"
								y1="7"
								x2="100%"
								y2="7"
								fill="rgba(126, 126, 132, 0.6)"
								stroke="rgba(126, 126, 132, 0.6)"
								strokeWidth="3.5"
								strokeDasharray="4 8"
							/>
							<line
								x1="0"
								y1="7"
								x2={`${parcialCounts[item]}%`}
								y2="7"
								fill="rgba(255, 255, 255, 1)"
								stroke="rgba(255, 255, 255, 1)"
								strokeWidth="3.5"
								strokeDasharray="4 8"
							/>
						</svg>
						<div>{parcialCounts[item]}%</div>
					</div>
				)
			})}
		</div>}
		</>
	)
}

Legend.displayName="Legend";