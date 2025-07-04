// App imports
import { Maps } from './maps';
import { Right } from './right';
import { Left } from './left';
import './styles.scss';

// Context imports
import { ContextProvider } from 'context';

export const App = () => {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.addEventListener('resize', () => {
	  let vh = window.innerHeight * 0.01;
	  document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

	return (
		<ContextProvider>
			<div className="App">
				<Left/>
				<Maps/>
				<Right/>
			</div>
		</ContextProvider>
	)
}

App.displayName="App";