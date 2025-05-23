// React imports
import { useState, useContext, createContext } from 'react';

const CircleSizesContext: React.Context<any> = createContext(null)

export const useCircleSizes = () => {
	return (
		useContext(CircleSizesContext)
	)
}

export const CircleSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = {top: 0, bottom: 0, left: 0, right: 0}

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<CircleSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</CircleSizesContext.Provider>
	)
}

CircleSizesContext.displayName = "CircleSizesContext";