// App imports
import { Pictures } from './pictures';
import { BasemapsSelectors } from './basemaps';
import { MapContainer } from './map';
import { MapHeader } from './header';
import './styles.scss';

export const Maps = () => {
	return (
		<div className="map-wrapper">
			<MapHeader/>
			<MapContainer/>
			<BasemapsSelectors/>
			<Pictures/>
		</div>
	)
}

Maps.displayName="Maps";