// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../../../context/filters/geo';
import { useIsoPolygonApi } from '../../../../context/api/isoPolygon';

const GoogleDetailsApiContext: React.Context<any> = createContext(null)

export const useGoogleDetailsApi = () => {
	return (
		useContext(GoogleDetailsApiContext)
	)
}

export const GoogleDetailsApiProvider = ({children}: any) => {
	const { placeId, setPlaceCoordinates } = useGeo();
	const { setInitialMarker } = useIsoPolygonApi();
	const [ googleDetailsData, setGoogleDetailsData ] = useState<any>(null);
	
	useEffect(() => {
	  const fetchData = async () => {
	    const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	details_api
	    	?place_id=${placeId}
	    `;
	    const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setGoogleDetailsData(receivedData)
	  }
	  placeId && fetchData();
	}, [ placeId ]);

	useEffect(() => {
		if (googleDetailsData) {
			const addressComponents = googleDetailsData.result.address_components;

			const longitude = googleDetailsData.result.geometry.location.lng;
			const latitude = googleDetailsData.result.geometry.location.lat;
			const coordinates = {longitude: longitude, latitude: latitude};
			setPlaceCoordinates(coordinates);
			setInitialMarker(false);
		}
	}, [ googleDetailsData ])

	return (
		<GoogleDetailsApiContext.Provider value={{ googleDetailsData }}>
			{children}
		</GoogleDetailsApiContext.Provider>
	)
}

GoogleDetailsApiContext.displayName = "GoogleDetailsApiContext";