// Context imports
import { useIsoPolygonApi } from '../../../context/api/isoPolygon';

// Third party imports
import { Source, Layer } from 'react-map-gl';

export const IsoPolygon = () => {
	const { isoPolygonData } = useIsoPolygonApi();

	const isoLayer: any = {
	    id: 'isolayer',
	    type: 'fill',
	    source: 'isoSource',
	    paint: {
	      'fill-color': 'rgb(222, 112, 112)',
	      'fill-opacity': 0.2,
	    },
	  };

	const isoSource: any = {
	    type: 'geojson',
	    data: {
	      type: 'FeatureCollection',
	      features: [
	        {
	          type: 'Feature',
	          geometry: {
	            type: 'Polygon',
	            coordinates: isoPolygonData ? 
	            isoPolygonData.features[0].geometry.coordinates
	            : [],
	          },
	        },
	      ],
	    },
	  };
	
	return (
		<Source id="isoSource" {...isoSource}>
			<Layer {...isoLayer}/>
		</Source>
	)
}