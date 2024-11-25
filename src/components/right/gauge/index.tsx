// App imports
import { SVGWrapper } from './svg';
import { Circle } from './circle';

// Context imports
import { useGaugeSizes } from 'context/sizes/gauge';

// Third party imports
import * as d3 from "d3";

export const Gauge = ({ cnpjProperties, parcialCounts }: any) => {
	const { innerWidth, innerHeight } = useGaugeSizes();
	const radius = d3.min([innerWidth, innerHeight]) / 2;

	let totalCircunference = 0;
	
	const strokeWidth = radius * 0.27;
	const innerRadius = radius - ( strokeWidth / 2 );

	const circumference = innerRadius * 2 * Math.PI;

	const sumOfValues: any = d3.sum(Object.values(parcialCounts));

	const percentages = Object.keys(parcialCounts).reduce((total: any, item: any) => {
		total[item] = parcialCounts[item] / sumOfValues;
		return total
	}, {});

	return (
		<SVGWrapper>
			{Object.keys(percentages).map((item: any) => {
				const backgroundColor = cnpjProperties[item].color;
				const currentPercent = percentages[item] ? percentages[item] : 0;
				const currentCircunference = Math.round(circumference * currentPercent);

				if (currentCircunference) {totalCircunference += currentCircunference}

				return (
					<g key={item}>
						{currentCircunference && 
							<Circle
								innerWidth={innerWidth}
								innerHeight={innerHeight}
								innerRadius={innerRadius}
								strokeWidth={strokeWidth}
								currentCircunference={currentCircunference}
								circumference={circumference}
								totalCircunference={totalCircunference}
								currentPercent={currentPercent}
								fillColor={backgroundColor}
							/>
						 }
					</g>
				)
			})}
		</SVGWrapper>
	)
}

Gauge.displayName="Gauge";