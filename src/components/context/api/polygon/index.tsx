// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../filters/geo';
import { useIsoPolygonApi } from '../isoPolygon';

const PolygonApiContext: React.Context<any> = createContext(null)

export const usePolygonApi = () => {
	return (
		useContext(PolygonApiContext)
	)
}

export const PolygonApiProvider = ({children}: any) => {
	const { placeCoordinates } = useGeo();
	const { isoPolygonData } = useIsoPolygonApi();

	const [ polygonData, setPolygonData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/polygon_api`, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ 
					"polygon": JSON.stringify(isoPolygonData.features[0].geometry),
					"longitude": JSON.stringify(placeCoordinates.longitude),
					"latitude": JSON.stringify(placeCoordinates.latitude),
					"schema": "limits",
					"table": "london",
				}),
			});
			const receivedData = await res.json();
			setPolygonData(receivedData[0]);
		}
		isoPolygonData && fetchData();
	}, [ isoPolygonData ]);

	return (
		<PolygonApiContext.Provider value={{ polygonData }}>
			{children}
		</PolygonApiContext.Provider>
	)
}

PolygonApiContext.displayName = "PolygonApiContext";