// App imports
import { Left } from './left';
import { Maps } from './maps';
import { Right } from './right';
import { Wrapper } from './wrapper';
import './styles.scss';

// Context imports
import { MainProvider } from './context';

export const Main = () => {
	return (
		<MainProvider>
			<Wrapper>
				<div className="business-main-wrapper">
					<Left/>
					<Maps/>
					<Right/>
				</div>
			</Wrapper>
		</MainProvider>
	)
}

Main.displayName="Main";