// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../filters/geo';

const IsoPolygonApiContext: React.Context<any> = createContext(null)

export const useIsoPolygonApi = () => {
	return (
		useContext(IsoPolygonApiContext)
	)
}

export const IsoPolygonApiProvider = ({children}: any) => {
	const { placeCoordinates } = useGeo();

	const [ routingProfile, setRoutingProfile ] = useState("walking");
	const [ contoursMinutes, setContoursMinutes ] = useState(30);
	const [ initialMarker, setInitialMarker ] = useState(true);
	const [ isoPolygonData, setIsoPolygonData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
		    const tempUrl = `
		    	https://api.mapbox.com/isochrone/v1/mapbox/
		    	${routingProfile}/
		    	${placeCoordinates.longitude}%2C
		    	${placeCoordinates.latitude}
		    	?contours_minutes=${contoursMinutes}
		    	&polygons=true
		    	&denoise=1
		    	&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}
		    `;
		    const url = tempUrl.replace(/\s/g, '');
		    const res = await fetch(url);
		    const receivedData = await res.json();
		    setIsoPolygonData(receivedData);
		}
		!initialMarker && fetchData();
	}, [ initialMarker, placeCoordinates, routingProfile, contoursMinutes ]);

	return (
		<IsoPolygonApiContext.Provider value={{ 
			initialMarker, setInitialMarker,
			isoPolygonData,
			routingProfile, setRoutingProfile,
			contoursMinutes, setContoursMinutes,
		}}>
			{children}
		</IsoPolygonApiContext.Provider>
	)
}

IsoPolygonApiContext.displayName = "IsoPolygonApiContext";