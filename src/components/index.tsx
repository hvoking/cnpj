// App imports
import { Maps } from './maps';
import { Right } from './right';
import './styles.scss';

export const Main = () => {
	return (
		<div className="main-wrapper">
			<Maps/>
			<Right/>
		</div>
	)
}

Main.displayName="Main";