// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from 'context/geo';

const IsochroneApiContext: React.Context<any> = createContext(null)

export const useIsochrone = () => {
	return (
		useContext(IsochroneApiContext)
	)
}

export const IsochroneProvider = ({children}: any) => {
	const [ routingProfile, setRoutingProfile ] = useState("cycling");
	const [ contoursType, setContoursType ] = useState("minutes");
	const [ contoursMinutes, setContoursMinutes ] = useState(15);
	const [ contoursMeters, setContoursMeters ] = useState(1000);
	const { viewport } = useGeo();

	const { latitude, longitude } = viewport;

	const [ isochroneData, setIsochroneData ] = useState<any>(null);

	useEffect(() => {
	  const fetchData = async () => {
	  	const currentContoursType = contoursType === "minutes" ? contoursMinutes : contoursMeters;
	  	
	    const tempUrl = `
	    	https://api.mapbox.com/isochrone/v1/mapbox/
	    	${routingProfile}/
	    	${longitude}%2C
	    	${latitude}
	    	?contours_${contoursType}=${currentContoursType}
	    	&polygons=true
	    	&denoise=1
	    	&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}
	    `;
	    const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setIsochroneData(receivedData);
	  }
	  fetchData();
	}, [ viewport, routingProfile, contoursType, contoursMinutes, contoursMeters ]);

	return (
		<IsochroneApiContext.Provider value={{ 
			isochroneData,
			routingProfile, setRoutingProfile,
			contoursType, setContoursType,
			contoursMinutes, setContoursMinutes,
			contoursMeters, setContoursMeters,
		}}>
			{children}
		</IsochroneApiContext.Provider>
	)
}

IsochroneApiContext.displayName = "IsochroneApiContext";