// App imports
import { Dropdown } from './dropdown';
import './styles.scss';

export const MapHeader = () => {
	return (
		<div className="business-map-header-wrapper">
			<div></div>
				<div className="business-map-header">
					<Dropdown/>
				</div>
			<div></div>
		</div>
	)
}

MapHeader.displayName="MapHeader";