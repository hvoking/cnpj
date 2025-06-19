// React imports
import { useCallback } from 'react';

// App imports
import { Isochrone } from './iso';
import { Tiles } from './tiles';
import { Clusters } from './clusters';
import { Circle } from './circle';
import { Avatar } from './avatar';
import './styles.scss';

// Context imports
import { useGeo } from 'context/geo';
import { useEvents } from 'context/maps/events';

// Third-party imports
import { Map } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export const Maps = () => {
	const { viewport, setMarker, setViewport, mapRef, basemap } = useGeo();
	const { isDragging, onDragStart, onMouseMove, onDragEnd } = useEvents();

	const onDblClick = useCallback((event: any) => {
		const { lat, lng } = event.lngLat;
		setViewport((prev: any) => ({...prev, longitude: lng, latitude: lat }));
		setMarker({ longitude: lng, latitude: lat });
	}, []); 

	return (
		<div className="map-wrapper">
			<Map
				ref={mapRef}
				initialViewState={viewport}
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
				mapStyle={basemap}
				onDblClick={onDblClick}
				doubleClickZoom={false}
				preserveDrawingBuffer={true}
				onMouseDown={onDragStart}
		        onMouseMove={onMouseMove}
		        onMouseUp={onDragEnd}
		        onTouchStart={onDragStart}
		        onTouchMove={onMouseMove}
		        onTouchEnd={onDragEnd}
		        dragPan={!isDragging}
			>
				<Isochrone/>
				<Circle/>
				<Clusters/>
				<Tiles/>
				<Avatar/>
			</Map>
		</div>
	)
}

Maps.displayName="Maps";