// Context imports
import { useStyles } from 'context/api/styles';

// Third party imports
import { Source, Layer } from 'react-map-gl';

export const Points = () => {
	const { getTilesUrl } = useStyles();

	const tableSchema = "cnpj_sc";
	const tableName = "mv_main_columns";

	const url = getTilesUrl(tableSchema, tableName)

	const layerStyle: any = {
	    id: "point-layer",
	    type: "circle",
	    source: "sc-business",
	    'source-layer': "default",
	    paint: {
			'circle-radius': 3,
			'circle-color': 'rgba(222, 222, 0, 0)',
	    }
	};

	return (
		<Source 
			id="sc-business" 
			type="vector" 
			tiles={[ url ]}
		>
			<Layer {...layerStyle} />
		</Source>
	)
}

Points.displayName="Points"