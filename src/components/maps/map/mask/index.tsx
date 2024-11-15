// React imports
import { useEffect, useMemo } from 'react';

// Context imports
import { useMask } from 'context/mask';
import { useMapbox } from 'context/mapbox';
import { useCnpjApi } from 'context/api/cnpj';

// Third-party imports
import { Source, Layer } from 'react-map-gl';

export const Mask = () => {
  const { maskProperties } = useMask();
  const { mapRef } = useMapbox();
  const { cnpjData, cnpjProperties } = useCnpjApi();

  const map = mapRef.current;

  const getColor: any = (object: any, value: any) => {
    const currentKey: any = Object.keys(object).find(
      key => object[key].label === value
    )
    if (object[currentKey]) {
      return object[currentKey].color
    }
    return "rgba(255, 255, 255, 0)"
  }

  const geoJsonData: any = useMemo(() => {
    if (!maskProperties || maskProperties.length === 0) return null;

    const features = maskProperties.flatMap((maskProp: any) => {
      const { geometry, properties } = maskProp;

      return [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: geometry.coordinates,
        },
        properties: {
          ...properties,
          color: getColor(cnpjProperties, properties.cnae_divisao)
        }
      }];
    });

    return features.length > 0 ? { type: 'FeatureCollection', features } : null;
  }, [maskProperties]);

  if (!geoJsonData) return null;

  const layerStyle: any = {
    id: "point-mask",
    type: "circle",
    source: "mask-points",
    paint: {
      "circle-radius": 3,
      "circle-color": ['get', 'color'],
      "circle-stroke-width": 1,
      "circle-stroke-color": ['get', 'color']
    }
  };

  return (
    <Source 
      id="mask-points" 
      type="geojson" 
      data={geoJsonData}
    >
      <Layer {...layerStyle} />
    </Source>
  );
};

Mask.displayName = 'Mask';