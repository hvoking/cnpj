// React imports
import { useState, useRef, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../filters/geo';

const MapboxContext: React.Context<any> = createContext(null)

export const useMapbox = () => {
	return (
		useContext(MapboxContext)
	)
}

export const MapboxProvider = ({children}: any) => {
	const mapRef = useRef<any>();
	
	const [ basemap, setBasemap ] = useState("mapbox://styles/generativa/clhqor7c101lh01pe52myfwik");
	const { viewport, setMarker } = useGeo();

	useEffect(() => {
		mapRef.current?.flyTo({
			center: [ viewport.longitude, viewport.latitude ],
			zoom: viewport.zoom,
			pitch: viewport.pitch,
			bearing: viewport.bearing,
			duration: 3000, 
			essential: true,
		});
		setMarker({
			longitude: viewport.longitude,
			latitude: viewport.latitude,
		});
	}, [ viewport ]);

	return (
		<MapboxContext.Provider value={{ mapRef, basemap, setBasemap }}>
			{children}
		</MapboxContext.Provider>
	)
}

MapboxContext.displayName = "MapboxContext";
