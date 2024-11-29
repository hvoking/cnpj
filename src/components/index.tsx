// App imports
import { Maps } from './maps';
import { Right } from './right';
import { Left } from './left';
import './styles.scss';

export const Main = () => {
	return (
		<div className="main-wrapper">
			<Left/>
			<Maps/>
			<Right/>
		</div>
	)
}

Main.displayName="Main";