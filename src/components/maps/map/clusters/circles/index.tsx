// Third party imports
import { Source, Layer } from 'react-map-gl';

// Context imports
import { useMask } from 'context/mask';

export const Circles = ({ label, clusterLayer, textLayer }: any) => {
	const { geoJsonData } = useMask();

	const geojsonPoints: any = geoJsonData && {
	  type: "FeatureCollection",
	  features: geoJsonData.features.filter(
	    (feature: any) => feature.properties.label === label
	  ),
	};

	return (
			<Source
			  id={`${label}-clusters`}
			  type="geojson"
			  data={geojsonPoints}
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