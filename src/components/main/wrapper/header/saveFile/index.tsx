// App imports
import './styles.scss';

// Context imports
import { usePdf } from '../../../../context/filters/pdf';
 
export const SaveFile = ({ inputRef }: any) => {
	const { printDocument, activePdf, setActivePdf } = usePdf();

	return (
		<>
		{!activePdf ? 
			<svg 
				className="download-arrow"
				width="24"
				height="24"
				onClick={ setActivePdf }
			>
				<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="rgba(255, 56, 92, 1)"/>
			</svg>
			 : 
			<svg 
				className="download-arrow"
				width="24"
				height="24"
				onClick={printDocument}
			>
				<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
			</svg>}
		</>
	)
}

SaveFile.displayName="SaveFile"