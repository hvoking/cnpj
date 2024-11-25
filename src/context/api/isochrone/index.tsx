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
	const [ routingProfile, setRoutingProfile ] = useState("walking");
	const [ contoursType, setContoursType ] = useState("meters");
	const [ contoursMeters, setContoursMeters ] = useState(5000);
	const { marker } = useGeo();

	const { latitude, longitude } = marker;

	const [ isochroneData, setIsochroneData ] = useState<any>(null);

	useEffect(() => {
	  const fetchData = async () => {
	  	const currentContoursType = contoursMeters;
	  	
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
	}, [ marker, routingProfile, contoursType, contoursMeters ]);

	return (
		<IsochroneApiContext.Provider value={{ 
			isochroneData,
			contoursType, setContoursType,
			contoursMeters, setContoursMeters,
		}}>
			{children}
		</IsochroneApiContext.Provider>
	)
}

IsochroneApiContext.displayName = "IsochroneApiContext";