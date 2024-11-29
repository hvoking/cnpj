// React imports
import { useContext, createContext } from 'react';

// Third-party libraries
import * as turf from '@turf/turf';

const CircleContext: React.Context<any> = createContext(null);

export const useCircle = () => {
	return (
		useContext(CircleContext)
	)
}

export const CircleProvider = ({children}: any) => {
	const createCircle = (center: any, circleRadius: any) => {
		const circleGeometry: any = turf.circle(center, circleRadius);	
		// const difference = turf.difference(turf.featureCollection([wrapperGeometry, circleGeometry]));
		return circleGeometry
	}

	return (
		<CircleContext.Provider value={{ 
			createCircle
		}}>
			{children}
		</CircleContext.Provider>
	)
}

CircleContext.displayName = "CircleContext";