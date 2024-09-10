// React imports
import { useCallback } from 'react';

// App imports
import { Pin } from './pin';
import { Clusters } from './clusters';
import { IsoPolygon } from './iso';
import { Points } from './points';

// Context imports
import { useMapbox } from '../../context/mapbox';
import { useGeo } from '../../context/filters/geo';

// Third-party imports
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const MapContainer = () => {
	const { viewport, setMarker, setPlaceCoordinates } = useGeo();
	const { mapRef, basemap } = useMapbox();

	const onDblClick = useCallback((e: any) => {
		const lng = e.lngLat.lng;
		const lat = e.lngLat.lat;
		
		setPlaceCoordinates({ longitude: lng, latitude: lat });
		setMarker({ longitude: lng, latitude: lat });
	}, []); 

	return (
		<Map
			ref={mapRef}
			initialViewState={viewport}
			mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
			mapStyle={basemap}
			onDblClick={onDblClick}
			doubleClickZoom={false}
			preserveDrawingBuffer={true}
		>
			<Pin/>
			<IsoPolygon/>
			<Clusters/>
			<Points/>
		</Map>
	)
}

MapContainer.displayName="Mapcontainer";