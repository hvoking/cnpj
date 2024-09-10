// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useIsoPolygonApi } from '../isoPolygon';

const HexagonsApiContext: React.Context<any> = createContext(null)

export const useHexagonsApi = () => {
	return (
		useContext(HexagonsApiContext)
	)
}

export const HexagonsApiProvider = ({children}: any) => {
	const { isoPolygonData } = useIsoPolygonApi();

	const [ hexagonsData, setHexagonsData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const tempUrl = `
				${process.env.REACT_APP_API_URL}/
				hexagons_api
			`;
			const url = tempUrl.replace(/\s/g, '');
			const res = await fetch(url);
			const receivedData = await res.json();
			setHexagonsData(receivedData[0]);
		}
		isoPolygonData && fetchData();
	}, [ isoPolygonData ]);

	return (
		<HexagonsApiContext.Provider value={{ hexagonsData }}>
			{children}
		</HexagonsApiContext.Provider>
	)
}

HexagonsApiContext.displayName = "HexagonsApiContext";