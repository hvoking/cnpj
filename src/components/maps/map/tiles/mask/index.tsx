// Context imports
import { useMask } from 'context/mask';

// Third-party imports
import { Source, Layer } from 'react-map-gl';

export const Mask = () => {
  const { geoJsonData } = useMask();

  const unclusteredPointLayer: any = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'cnpj-clusters',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': ['get', 'color'],
      'circle-radius': 5,
    }
  };

  return (
    <Source
          id="cnpj-clusters"
          type="geojson"
          data={geoJsonData}
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
  );
};

Mask.displayName = 'Mask';