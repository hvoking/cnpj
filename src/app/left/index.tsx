// App imports
import { SVGWrapper } from './svg';
import { Gauge } from './gauge';
import { Legend } from './legend';
import { IsoLegend } from './isoLegend';
import './styles.scss';

// Context imports
import { useCircleSizes } from 'context/sizes/circle';
import { cnpjProperties } from 'context/mask/properties';
import { useMask } from 'context/mask';

// Third-party imports
import * as d3 from 'd3';

export const Left = ({ polygonArea, polygon }: any) => {
	const { innerWidth, innerHeight } = useCircleSizes();
	const { sortedData } = useMask();

	const r: any = d3.min([innerWidth / 2, innerHeight / 2])

	const xScale = d3.scaleLinear()
		.domain([1, (5 * 2) * 1000])
		.range([1, r * 2])
	
	return (
		<div className="left-wrapper">
			<div className="left-item-wrapper">
				<Gauge 
					cnpjProperties={cnpjProperties}
					parcialCounts={sortedData}
				/>
				<Legend 
					cnpjProperties={cnpjProperties} 
					data={sortedData}
				/>
			</div>
			<div className="left-item-wrapper">
				<SVGWrapper>
					<circle
						cx={innerWidth / 2}
						cy={ innerHeight / 2}
						r={xScale(5 * 1000)}
						fill={"rgba(206, 171, 165, 0.8)"}
					/>
					<circle
						cx={innerWidth / 2}
						cy={ innerHeight / 2}
						r={xScale(3.5 * 1000)}
						fill={"rgba(178, 217, 235, 0.8)"}
					/>
					<circle
						cx={innerWidth / 2}
						cy={ innerHeight / 2}
						r={xScale(2 * 1000)}
						fill={"rgba(213, 173, 236, 0.8)"}
					/>
					<circle
						cx={innerWidth / 2}
						cy={ innerHeight / 2}
						r={xScale(1 * 1000)}
						fill={"rgba(201, 218, 174, 0.8)"}
					/>
				</SVGWrapper>
				<div style={{display: "flex", fontSize: "0.8em", gap: "10px", paddingLeft: "20px"}}>
					<div className="subtitle-style">Radius</div>
					<div className="subtitle-style">Walk time</div>
				</div>
				<IsoLegend/>
			</div>
		</div>
	)
}

Left.displayName="Left";