// App imports
import { Pictures } from './pictures';
import { BasemapsSelectors } from './basemaps';
import { MapContainer } from './map';
import { Filters } from './filters';
import './styles.scss';

export const Maps = () => {
	return (
		<div className="map-wrapper">
			<Filters/>
			<MapContainer/>
			<BasemapsSelectors/>
			<Pictures/>
		</div>
	)
}

Maps.displayName="Maps";