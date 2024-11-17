// React imports
import { useCallback } from 'react';

// App imports
import './styles.scss';

// Context imports
import { useGeo } from 'context/geo';

// Third-party imports
import { Marker } from 'react-map-gl';

export const Pin = () => {
	const { marker, setMarker, setViewport } = useGeo();

	const { longitude, latitude } = marker;

	const onMarkerDrag = useCallback((event: any) => {
		setMarker({
			longitude: event.lngLat.lng,
			latitude: event.lngLat.lat
		});
	}, []);

	const onMarkerDragEnd = useCallback((event: any) => {
		const { lat, lng } = event.lngLat;
		setViewport((prev: any) => ({...prev, longitude: lng, latitude: lat }));
	}, []);

	return (
		<>
			<Marker
		      longitude={longitude}
		      latitude={latitude}
		      anchor="bottom"
		      draggable
		      onDrag={onMarkerDrag}
		      onDragEnd={onMarkerDragEnd}
		    >
		      <img 
			      style={{width: "25px"}} 
			      src={process.env.PUBLIC_URL + "/static/components/maps/marker.svg"}
			      alt="marker"
		     />
		    </Marker>
		</>
	)
}

Pin.displayName="Pin";