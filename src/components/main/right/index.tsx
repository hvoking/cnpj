// App imports
import { Graphics } from './graphics';
import { Legend } from './legend';
import './styles.scss';

export const Right = () => {
	return (
		<div className="business-right-wrapper">
			<Graphics/>
			<Legend/>
		</div>
	)
}

Right.displayName="Right";