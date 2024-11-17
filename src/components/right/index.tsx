// App imports
import { Balls } from './balls';
import { Legend } from './legend';
import './styles.scss';

// Context imports
import { useMask } from 'context/mask';
import { cnpjProperties } from 'context/mask/properties';

// Third-party imports
import * as d3 from 'd3';

export const Right = () => {
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
		<div className="right-wrapper">
			<Balls cnpjProperties={cnpjProperties} parcialCounts={parcialCounts}/>
			<Legend cnpjProperties={cnpjProperties} parcialCounts={parcialCounts}/>
		</div>
	)
}

Right.displayName="Right";