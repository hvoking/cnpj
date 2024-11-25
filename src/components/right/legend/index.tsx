// App imports
import './styles.scss';

export const Legend = ({ cnpjProperties, parcialCounts }: any) => {
	return (
	<div className="legend-wrapper">
		{Object.keys(parcialCounts).map((item: any, index: any) => {
			const backgroundColor = cnpjProperties[item].color;
			const legend = cnpjProperties[item].legend;
			const percentage = parcialCounts[item];

			return (
				<div key={index} className="legend">
					<div className="legend-item" style={{backgroundColor: backgroundColor}}/>
						<div>{legend}</div>
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
								x2={`${percentage}%`}
								y2="7"
								fill="rgba(255, 255, 255, 1)"
								stroke="rgba(255, 255, 255, 1)"
								strokeWidth="3.5"
								strokeDasharray="4 8"
							/>
						</svg>
						<div>{percentage}%</div>
					</div>
				)
			})}
		</div>
	)
}

Legend.displayName="Legend";