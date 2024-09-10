// Context imports
import { useCnpjApi } from '../../../context/api/cnpj';

// Third party imports
import { Source, Layer, LayerProps } from 'react-map-gl';

export const Points = () => {
	const { cnpjData, cnpjProperties } = useCnpjApi();

	const unclusteredPointLayer: LayerProps = {
	  id: 'unclustered-point',
	  type: 'circle',
	  source: 'cnpj-clusters',
	  filter: ['!', ['has', 'point_count']],
	  paint: {
	    'circle-color': ['get', 'color'],
	    'circle-radius': 5,
	  }
	};
	
	const getColor: any = (object: any, value: any) => {
		const currentKey: any = Object.keys(object).find(
			key => object[key].label === value
		)
		if (object[currentKey]) {
			return object[currentKey].color
		}
		return "rgba(255, 255, 255, 0)"
	}
	
	const geojsonPoints: any = cnpjData && cnpjData.reduce((total: any, item: any) => {
		total.push({
			type: "Feature",
			properties: {
				cluster: false,
		        color: getColor(cnpjProperties, item.cnae_divisao)
	    	},
		    geometry: { 
		    	type: "Point", 
		    	coordinates: [ 
		    		item.geometry.coordinates[0], 
		    		item.geometry.coordinates[1] 
		    	] 
		    }
		});
		return total
	}, []);

	const geojsonWrapper: any = geojsonPoints && {
		"type": "FeatureCollection",
		"features": geojsonPoints
	}

	return (
		<Source
		  id="cnpj-clusters"
		  type="geojson"
		  data={geojsonWrapper}
		  cluster={true}
		  clusterMaxZoom={14}
		  clusterRadius={100}
		  clusterProperties={{
		  	'color': ['get', 'color'],
		  	'label': ['get', 'label'],
		  }}
		>
		  <Layer {...unclusteredPointLayer}/>
		</Source>
	)
}

Points.displayName="Points";