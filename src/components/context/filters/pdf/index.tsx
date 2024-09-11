// React imports
import { useState, useRef, useContext, createContext } from 'react';

const PdfContext: React.Context<any> = createContext(null)

export const usePdf = () => {
	return (
		useContext(PdfContext)
	)
}

export const PdfProvider = ({children}: any) => {
	const page1Ref = useRef<any>(null);
	const [ activePdf, setActivePdf ] = useState(false);

	return (
		<PdfContext.Provider value={{ 
			page1Ref,
			activePdf, setActivePdf 
		}}>
			{children}
		</PdfContext.Provider>
	)
}

PdfContext.displayName = "PdfContext";