// App imports
import { Balls } from './balls';
import { Ranking } from './ranking';
import './styles.scss';

// Context imports
import { useMask } from 'context/mask';
import { cnpjProperties } from 'context/mask/properties';

export const Right = () => {
	const { sortedData } = useMask();
	
	return (
		<div className="right-wrapper">
			<Balls 
				cnpjProperties={cnpjProperties} 
				parcialCounts={sortedData}
			/>
			<Ranking 
				cnpjProperties={cnpjProperties} 
				parcialCounts={sortedData}
			/>
		</div>
	)
}

Right.displayName="Right";