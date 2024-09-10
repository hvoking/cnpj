// App imports
import './styles.scss';

// Context imports
import { useCnpjApi } from '../../context/api/cnpj';

// Third-party imports
import * as d3 from 'd3';

export const Graphics = () => {
	const { filteredCounts, cnpjProperties } = useCnpjApi(); 

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

Graphics.displayName="Graphics";