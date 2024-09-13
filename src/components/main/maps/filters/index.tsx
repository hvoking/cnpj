// React imports
import { useState } from 'react';

// App imports
import { Button } from './button';
import './styles.scss';

export const Filters = () => {
	const [ activateFilters, setActivateFilters ] = useState(false);
	const [ hoverActivate, setHoverActivate ] = useState(false);

	const linesColor = activateFilters || hoverActivate ? "rgba(255, 52, 96, 1)" : "rgba(255, 255, 255, 1)";
	const circleColor = "rgba(32, 32, 43, 1)";

	return (
		<>
			{activateFilters && 
			<div className="map-filters-wrapper">
			</div>}
			<Button 
				linesColor={linesColor} 
				circleColor={circleColor}
				setActivateFilters={setActivateFilters}
				setHoverActivate={setHoverActivate}
			/>
		</>
	)
}


Filters.displayName="Filters";