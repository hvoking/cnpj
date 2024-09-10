// React imports
import { useState, useRef, useContext, createContext } from 'react';

// Third-party imports
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const PdfContext: React.Context<any> = createContext(null)

export const usePdf = () => {
	return (
		useContext(PdfContext)
	)
}

export const PdfProvider = ({children}: any) => {
	const [ activePdf, setActivePdf ] = useState(false);
	
	const page1Ref = useRef<any>(null);

	const printDocument = () => {
		const page1 = page1Ref.current;
		const pdf = new jsPDF('p', 'px','a4', true);
		
		html2canvas(page1, {scale: 2, useCORS: true}).then((canvasPage) => {
			const componentWidth = page1.offsetWidth;
			const componentHeight = page1.offsetHeight;

			const imgData = canvasPage.toDataURL('image/png');

			pdf.internal.pageSize.width = componentWidth;
			pdf.internal.pageSize.height = componentHeight;

			pdf.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
			pdf.save('download.pdf');
			
		})
	};

	return (
		<PdfContext.Provider value={{ 
			page1Ref,
			printDocument, 
			activePdf, setActivePdf 
		}}>
			{children}
		</PdfContext.Provider>
	)
}

PdfContext.displayName = "PdfContext";