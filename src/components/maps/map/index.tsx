// React imports
import { useCallback } from 'react';

// App imports
import { Pin } from './pin';
import { Isochrone } from './iso';
import { Tiles } from './tiles';
import { Clusters } from './clusters';

// Context imports
import { useGeo } from 'context/geo';

// Third-party imports
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const MapContainer = () => {
	const { viewport, setMarker, setViewport, mapRef, basemap } = useGeo();

	const onDblClick = useCallback((event: any) => {
		const { lat, lng } = event.lngLat;
		setViewport((prev: any) => ({...prev, longitude: lng, latitude: lat }));
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
			<Isochrone/>
			<Clusters/>
			<Tiles/>
		</Map>
	)
}

MapContainer.displayName="Mapcontainer";