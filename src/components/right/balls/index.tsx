// App imports
import './styles.scss';

// Context imports
import { useMask } from 'context/mask';
import { cnpjProperties } from 'context/mask/properties';

// Third-party imports
import * as d3 from 'd3';

export const Balls = () => {
	const { geoJsonData } = useMask();

	const filteredCounts = geoJsonData && 
		geoJsonData.features.reduce((total: any, item: any) => {
			const currentKey = item.properties.label;
			if (currentKey && !total[currentKey]) {
				total[currentKey] = 1;
			}
			else if (currentKey) {
				total[currentKey] += 1
			}
			return total
		}, {});

	const totalCount = filteredCounts && d3.sum(Object.values(filteredCounts));
	const parcialCounts: any = {}
	
	const linearScale = totalCount && d3.scaleLinear()
		.domain([0, totalCount])
		.range([0, 100]);

	totalCount && Object.keys(filteredCounts).forEach((item: any) => {
		const currentCount = filteredCounts[item];
		parcialCounts[item] = Math.round(linearScale(currentCount))
	});

	return (
		<div className="business-graphics-wrapper">
			<div className="business-circles">
				{totalCount && Object.keys(parcialCounts).map((item: any) => {
					const countsArray: any = Array.from({length: parcialCounts[item]}, (_, i) => (i + 1));
					return countsArray.map((currentItem: any, index: number) => (
						<div 
							key={`${item}-${index}`} 
							style={{
								backgroundColor: cnpjProperties[item].color, 
								borderRadius: "50%"
							}}
						/>
					))
				})}
			</div>
		</div>
	)
}

Balls.displayName="Balls";