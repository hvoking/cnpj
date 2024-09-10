// React imports
import { useState, useEffect, useContext, createContext } from 'react';

const GoogleSearchApiContext: React.Context<any> = createContext(null)

export const useGoogleSearchApi = () => {
	return (
		useContext(GoogleSearchApiContext)
	)
}

export const GoogleSearchApiProvider = ({children}: any) => {
	const [ searchText, setSearchText ] = useState('');
	const [ searchData, setSearchData ] = useState(null);
	
	useEffect(() => {
	  const fetchData = async () => {
	  	const temporarySearchText = searchText.replace(" ", "__");
	    const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	search_api
	    	?query=${temporarySearchText}
	    	&language=pt_BR
	    `;
	    const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setSearchData(receivedData)
	  }
	  searchText && fetchData();
	}, [ searchText ]);

	return (
		<GoogleSearchApiContext.Provider value={{ 
			searchData, 
			searchText, setSearchText, 
		}}>
			{children}
		</GoogleSearchApiContext.Provider>
	)
}

GoogleSearchApiContext.displayName = "GoogleSearchApiContext";