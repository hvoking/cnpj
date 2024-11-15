// App imports
import { MapHeader } from './header';
import { MapContainer } from './map';
import './styles.scss';

export const Maps = () => {
	return (
		<div className="business-map">
			<MapHeader/>
			<MapContainer/>
		</div>
	)
}

Maps.displayName="Maps";