// App  imports
import './styles.scss';

export const Legend = ({ cnpjProperties, data }: any) => {
	if (!data) return <></>

	return (
		<div className="gauge-legend-wrapper">
			{Object.keys(data).map((item: any) => {
				const backgroundColor = cnpjProperties[item].color;
				const legend = cnpjProperties[item].legend;

				return (
					<div key={item} className="gauge-legend-item">
						<div>{legend}</div>
						<div className="legend-icon" style={{ backgroundColor: backgroundColor }}></div>
					</div>
				)
			})}
		</div>
	)
}

Legend.displayName="Legend";