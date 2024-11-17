// App imports
import './styles.scss';

// Context imports
import { useMask } from 'context/mask';
import { cnpjProperties } from 'context/mask/properties';

// Third-party imports
import * as d3 from 'd3';
	
export const Legend = ({cnpjProperties, parcialCounts}: any) => {
	return (
	<div className="legend-wrapper">
		{Object.keys(parcialCounts).map((item: any, index: any) => {
			return (
				<div key={index} className="legend">
					<div className="legend-item" style={{backgroundColor: cnpjProperties[item].color}}/>
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
	</div>
	)
}

Legend.displayName="Legend";