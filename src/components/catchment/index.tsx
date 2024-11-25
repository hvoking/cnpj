// App imports
import { SVGWrapper } from './svg';
import { Title } from './title';
import './styles.scss';

// Context imports
import { useCircleSizes } from 'context/sizes/circle';

// Third-party imports
import * as d3 from 'd3';

export const Catchment = ({ polygonArea, polygon }: any) => {
	const { innerWidth, innerHeight } = useCircleSizes();

	const r: any = d3.min([innerWidth / 2, innerHeight / 2])

	const xScale = d3.scaleLinear()
		.domain([1, (1 * 2) * 1000])
		.range([1, r * 2])
	
	return (
		<div className="circle-wrapper">
			<SVGWrapper>
				<circle
					cx={innerWidth / 2}
					cy={ innerHeight / 2}
					r={xScale(1 * 1000)}
					fill={"rgba(66, 135, 245, 0.3)"}
				/>
			</SVGWrapper>
			<div className="distance-info">
				<div>
					<div>
						{(Math.round(1* 10) / 10).toFixed(1)}
						<span style={{fontSize: "0.8em"}}> km</span>
					</div>

					<div className="subtitle-style">radius</div>
				</div>
				<div>
					<div>
						{Math.round(1 * 12)}
						<span style={{fontSize: "0.8em"}}> min</span>
					</div>
					<div className="subtitle-style">walk time</div>
				</div>
			</div>
		</div>
	)
}

Catchment.displayName="Catchment";