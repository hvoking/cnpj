// App imports
import { Balls } from './balls';
import { Legend } from './legend';
import './styles.scss';

export const Right = () => {
	return (
		<div className="right-wrapper">
			<Balls/>
			<Legend/>
		</div>
	)
}

Right.displayName="Right";