// React imports
import { useState, useEffect, useRef, useContext, createContext } from 'react';

// App imports
import * as Locations from './locations';

const GeoContext: React.Context<any> = createContext(null)

export const useGeo = () => {
	return (
		useContext(GeoContext)
	)
}

export const GeoProvider = ({children}: any) => {
	const mapRef = useRef<any>();
	const [ viewport, setViewport ] = useState(Locations.blumenau);
	const [ basemap, setBasemap ] = useState("mapbox://styles/hvoking/cm16kxow500ez01pc3psqc4pv");

	const [ initialState, setInitialState ] = useState(false);

	const { latitude, longitude } = viewport;
	
	const [ marker, setMarker ] = useState({ latitude: latitude, longitude: longitude });

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
		<GeoContext.Provider value={{
			viewport, setViewport, 
			marker, setMarker,
			mapRef, basemap, setBasemap,
			initialState, setInitialState
		}}>
			{children}
		</GeoContext.Provider>
	)
}

GeoContext.displayName = "GeoContext";