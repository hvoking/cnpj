// Third party imports
import { Source, Layer } from 'react-map-gl';

// Context imports
import { useCnpjApi } from '../../../../context/api/cnpj';

export const Circles = ({ label, clusterLayer, textLayer }: any) => {
	const { cnpjData, cnpjProperties } = useCnpjApi();

	const getLabel: any = (object: any, value: any) => {
		const currentKey: any = Object.keys(object).find(
			key => object[key].label === value
		)
		if (object[currentKey]) {
			return currentKey
		}
		return false
	}

	const geojsonPoints: any = cnpjData && cnpjData.reduce((total: any, item: any) => {
		if (getLabel(cnpjProperties, item.cnae_divisao) === label) {
			total.push({
				type: "Feature",
				properties: {
					cluster: false,
		    	},
			    geometry: { 
			    	type: "Point", 
			    	coordinates: [ 
			    		item.geometry.coordinates[0], 
			    		item.geometry.coordinates[1] 
			    	] 
			    }
			});
		}
		return total
	}, []);

	const geojsonWrapper: any = geojsonPoints && {
		"type": "FeatureCollection",
		"features": geojsonPoints
	}

	return (
			<Source
			  id={`${label}-clusters`}
			  type="geojson"
			  data={geojsonWrapper}
			  cluster={true}
			  clusterMaxZoom={14}
			  clusterRadius={100}
			>
				<Layer {...clusterLayer}/>
				<Layer {...textLayer}/>
			</Source>
	)
}

Circles.displayName="Circles";