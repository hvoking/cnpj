// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import * as Locations from './locations';

const GeoContext: React.Context<any> = createContext(null)

export const useGeo = () => {
	return (
		useContext(GeoContext)
	)
}

export const GeoProvider = ({children}: any) => {
	const [ cityName, setCityName ] = useState<any>("blumenau");
	const [ parcelId, setParcelId ] = useState(41351);
	const [ placeId, setPlaceId ] = useState<any>(null);

	const [ viewport, setViewport ] = useState(Locations.blumenau);
	
	const [ placeCoordinates, setPlaceCoordinates ] = useState({ 
		latitude: viewport.latitude, 
		longitude: viewport.longitude 
	});

	const [ marker, setMarker ] = useState({ 
		latitude: viewport.latitude, 
		longitude: viewport.longitude 
	});

	useEffect(() => {
	  setViewport({...viewport, ...placeCoordinates});
	}, [ placeCoordinates ]);

	return (
		<GeoContext.Provider value={{
			cityName, setCityName, 
			viewport, setViewport, 
			placeCoordinates, setPlaceCoordinates,
			marker, setMarker,
			parcelId, setParcelId,
			placeId, setPlaceId,
		}}>
			{children}
		</GeoContext.Provider>
	)
}

GeoContext.displayName = "GeoContext";