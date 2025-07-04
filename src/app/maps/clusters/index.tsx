// Context imports
import { createLayer } from './layers';
import { createText } from './text';

// App imports
import { Circles } from './circles';

export const Clusters = () => {
	const researchClusterLayer = createLayer('research', 'rgba(51, 106, 239, ');
	const researchClusterText = createText('research');

	const foodClusterLayer = createLayer('food', 'rgba(255, 173, 158, ');
	const foodClusterText = createText('food');

	const educationClusterLayer = createLayer('education', 'rgba(255, 0, 0, ');
	const educationClusterText = createText('education');

	const servicesClusterLayer = createLayer('services', 'rgba(0, 201, 126, ');
	const servicesClusterText = createText('services');

	const retailClusterLayer = createLayer('retail', 'rgba(253, 188, 85, ');
	const retailClusterText = createText('retail');

	return (
		<>
			<Circles
				label="pesquisa"
				clusterLayer={researchClusterLayer}
				textLayer={researchClusterText}
			/>
			<Circles 
				label="alimentacao"
				clusterLayer={foodClusterLayer}
				textLayer={foodClusterText}
			/>
			<Circles
				label="educacao"
				clusterLayer={educationClusterLayer}
				textLayer={educationClusterText}
			/>
			<Circles
				label="servicos"
				clusterLayer={servicesClusterLayer}
				textLayer={servicesClusterText}
			/>
			<Circles
				label="varejo"
				clusterLayer={retailClusterLayer}
				textLayer={retailClusterText}
			/>
		</>
	)
}

Clusters.displayName="Clusters";