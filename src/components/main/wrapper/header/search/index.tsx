// React imports
import { useState, useRef } from 'react';

// App imports
import { Suggestions } from './suggestions';
import './styles.scss';

// Context imports
import { useGoogleSearchApi } from '../../../../context/api/google/search';
import { useGeo } from '../../../../context/filters/geo';

export const Search = ({ activeSearch, setActiveSearch }: any) => {
	const { setPlaceId } = useGeo();
	const { googleSearchData, searchText, setSearchText } = useGoogleSearchApi();

	const [ suggestionIndex, setSuggestionIndex ] = useState(0);
	const [ suggestionsActive, setSuggestionsActive ]= useState(false);
	const inputRef = useRef<any>(null);

	const suggestions = googleSearchData && googleSearchData.predictions.reduce((total: any, item: any) => {
		const placeName = item.description.toLowerCase()
		total.push(placeName)
		return total
	}, []);

	const handleChange = (e: any) => {
		const query = e.target.value;
		setSearchText(query);

		if (query.length > 0) {
			setSuggestionsActive(true);
		}
		else {
			setSuggestionsActive(false)
		}
	};

	const handleClick = (e: any) => {
		const currentSearchValue = e.target.innerText.trim();

		googleSearchData && googleSearchData.predictions.forEach((item: any) => {
			const placeName = item.description.toLowerCase().trim();
			if (placeName === currentSearchValue) {
				setPlaceId(item.place_id);
			}
		})

		setSearchText(currentSearchValue);
		setSuggestionsActive(false);
	};

	const handleKeyDown = (e: any) => {
		// up arrow
		if (e.keyCode === 38) {
			if (suggestionIndex === 0) {
				return;
			}
			setSuggestionIndex(suggestionIndex - 1);
		}
		// down arrow
		else if (e.keyCode === 40) {
			if (suggestionIndex - 1 === suggestions.length) {
				return
			}
			setSuggestionIndex(suggestionIndex + 1);
		}
		// enter
		else if (e.keyCode === 13) {
			const currentSearchValue: any = suggestions && suggestions[suggestionIndex]

			googleSearchData && googleSearchData.predictions.forEach((item: any) => {
				const placeName = item.description.toLowerCase().trim();
				if (placeName === currentSearchValue) {
					setPlaceId(item.place_id);
				}
			})

			currentSearchValue && setSearchText(currentSearchValue);
			setSuggestionIndex(0);
			setSuggestionsActive(false);
		}

		// scape
		else if (e.keyCode === 27) {
			setSearchText("");
			setSuggestionIndex(0);
			setSuggestionsActive(false);
		}
	};

	const cleanSuggestions = () => {
		setSearchText("");
		setSuggestionIndex(0);
		setSuggestionsActive(false);
	}

	return (
		<div className="map-search-wrapper">
			<img 
				className="airbnb-search-icon"
				src="static/components/search/search_icon.svg" 
				alt="search-icon"
				onClick={() => setActiveSearch((prev: boolean) => !prev)}
			/>
			{activeSearch && 
				<>
					<input 
						className="maps-input"
						type="text" 
						placeholder="search for a place..."
						value={searchText}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						spellCheck={false}
						ref={inputRef}
					/>
					<div className="cancel-cross-wrapper">
						<img
							className="cancel-cross"
							src="static/components/search/cancel_search.svg" 
							alt="search-icon"
							onClick={cleanSuggestions}
						/>
					</div>
					{suggestionsActive && suggestions &&
						<Suggestions 
							suggestions={suggestions} 
							suggestionIndex={suggestionIndex} 
							handleClick={handleClick}
						/>
					}
				</>
			}
		</div>
	)
}

Search.displayName="Search";