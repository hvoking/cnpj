import { useState } from 'react';

// App imports
import { Logo } from './logo';
import { Search } from './search';
import { SaveFile } from './saveFile';
import { BackArrow } from './arrow';
import './styles.scss';

export const Header = () => {
	const [ activeSearch, setActiveSearch ] = useState(false);

	return (
		<div className="main-header">
			<div className="normal-header">
				<Logo/>
			</div>
			<div className="small-header">
				{
					!activeSearch ? 
					<Logo/> : 
					<BackArrow setActiveSearch={setActiveSearch}/>
				}
			</div>
			<div></div>
			<Search 
				activeSearch={activeSearch} 
				setActiveSearch={setActiveSearch}
			/>
			<SaveFile/>
		</div>
	)
}

Header.displayName="Header"