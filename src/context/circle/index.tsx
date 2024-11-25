// React imports
import { useState, useContext, createContext } from 'react';

// Context imports
import { useGeo } from 'context/geo';

// Third-party libraries
import * as turf from '@turf/turf';

const CircleContext: React.Context<any> = createContext(null);

export const useCircle = () => {
	return (
		useContext(CircleContext)
	)
}

export const CircleProvider = ({children}: any) => {
	const { marker } = useGeo();
	
	const [ radiusPosition, setRadiusPosition ] = useState(1);
	const [ circleRadius, setCircleRadius ] = useState(1);
	
	const minBound = 0.1;
	const maxBound = 3;

	const circleGeometry: any = turf.circle([marker.longitude, marker.latitude], circleRadius);

	return (
		<CircleContext.Provider value={{ 
			circleGeometry,
			circleRadius, setCircleRadius,
			radiusPosition, setRadiusPosition,
			maxBound, minBound
		}}>
			{children}
		</CircleContext.Provider>
	)
}

CircleContext.displayName = "CircleContext";