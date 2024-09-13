// Third-party imports
import { Source, Layer } from 'react-map-gl';

export const Clustered = ({ id, currentPoints, color }: any) => {
	const pointsSource: any = {
		id: `${id}Source`,
		type: 'geojson',
	    data: {
		    type: 'FeatureCollection',
		    features: currentPoints.map((d: any) => ({
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: d.geometry.coordinates,
				},
				properties: {
					cluster: false
				},
			})),
		}
	}

	const pointsLayer: any = {
	    id: id,
	    type: 'circle',
	    source: `${id}Source`,
	    paint: {
		'circle-radius': [
			'step', ['get', 'point_count'], 
			10, 20, 
			13, 40, 
			17, 60, 
			20
		],
	      'circle-color': color,
	    },
	  };

	const textLayer: any = {
		id: `${id}Source`,
		type: 'symbol',
		source: `${id}-clusters`,
		filter: ['has', 'point_count'],
		layout: {
			'text-field': '{point_count_abbreviated}',
			'text-size': 12,
			'text-font': ['Open Sans Bold']
		},
		paint: {
			'text-color': 'rgba(255, 255, 255, 1)'
		}
	};

	return (
		<Source 
			{...pointsSource}
			cluster={true}
			clusterMaxZoom={14}
			clusterRadius={100}
		>
			<Layer {...pointsLayer}/>
			<Layer {...textLayer}/>
		</Source>
	)
}