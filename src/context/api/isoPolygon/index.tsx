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
	const [ routingProfile, setRoutingProfile ] = useState("cycling");
	const [ contoursType, setContoursType ] = useState("minutes");
	const [ contoursMinutes, setContoursMinutes ] = useState(15);
	const [ contoursMeters, setContoursMeters ] = useState(1000);
	const { placeCoordinates } = useGeo();

	const [ isoPolygonData, setIsoPolygonData ] = useState<any>(null);

	useEffect(() => {
	  const fetchData = async () => {
	  	const currentContoursType = contoursType === "minutes" ? contoursMinutes : contoursMeters;
	  	
	    const tempUrl = `
	    	https://api.mapbox.com/isochrone/v1/mapbox/
	    	${routingProfile}/
	    	${placeCoordinates.longitude}%2C
	    	${placeCoordinates.latitude}
	    	?contours_${contoursType}=${currentContoursType}
	    	&polygons=true
	    	&denoise=1
	    	&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}
	    `;
	    const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setIsoPolygonData(receivedData);
	  }
	  fetchData();
	}, [ placeCoordinates, routingProfile, contoursType, contoursMinutes, contoursMeters ]);

	return (
		<IsoPolygonApiContext.Provider value={{ 
			isoPolygonData,
			routingProfile, setRoutingProfile,
			contoursType, setContoursType,
			contoursMinutes, setContoursMinutes,
			contoursMeters, setContoursMeters,
		}}>
			{children}
		</IsoPolygonApiContext.Provider>
	)
}

IsoPolygonApiContext.displayName = "IsoPolygonApiContext";