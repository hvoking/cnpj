// App imports
import { Dropdown } from './dropdown';
import './styles.scss';

export const Header = () => {
	return (
		<div className="map-header-wrapper">
			<div></div>
				<div className="business-map-header">
					<Dropdown/>
				</div>
			<div></div>
		</div>
	)
}

Header.displayName="Header";