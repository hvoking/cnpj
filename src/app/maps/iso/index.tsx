// Context imports
import { useIsochrone } from 'context/api/isochrone';

// Third party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Isochrone = () => {
	const { isochroneData } = useIsochrone();

	const isoLayer: any = {
	    id: 'isolayer',
	    type: 'fill',
	    source: 'isoSource',
	    paint: {
	      'fill-color': 'rgb(206, 171, 165)',
	      'fill-opacity': 0.4,
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
	            coordinates: isochroneData ? 
	            isochroneData.features[0].geometry.coordinates
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

Isochrone.displayName="Isochrone";