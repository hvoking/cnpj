// App imports
import { SVGWrapper } from './svg';

// Context imports
import { useIsoPolygonApi } from '../../context/api/isoPolygon';
import { usePolygonApi } from '../../context/api/polygon';
import { useIsoSizes } from '../../context/sizes/iso';

// Third-party imports
import * as d3 from 'd3';

export const IsoPolygonSVG = () => {
	const { polygonData } = usePolygonApi();
	const { isoPolygonData } = useIsoPolygonApi();
	const { innerWidth, innerHeight } = useIsoSizes();

	if (!isoPolygonData) return (<></>)

	const projection = d3.geoIdentity()
		.reflectY(true)
		.fitSize([ innerWidth, innerHeight ], polygonData[0].city_geom[0])

	const path = d3.geoPath(projection);

	return (
		<SVGWrapper>
			<g>
				<path
					fill="rgba(126, 126, 132, 0.4)"
					stroke="rgba(255, 255, 255, 1)" 
					strokeWidth={0.5}
					className="feature" 
					d={`${path(polygonData[0].city_geom[0])}`}
				/>
				<path
					fill="rgba(222, 112, 112, 0.8)"
					stroke="rgba(255, 0, 0, 1)"
					strokeWidth={0.3}
					className="feature" 
					d={`${path(isoPolygonData.features[0].geometry)}`}
				/>
			</g>
		</SVGWrapper>
	)
}

IsoPolygonSVG.displayName="IsoPolygonSVG";