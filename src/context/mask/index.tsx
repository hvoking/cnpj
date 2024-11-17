// React imports
import { useState, useEffect, useMemo, useContext, createContext } from 'react';

// App imports
import { getLabel, getColor } from './utils';
import { cnpjProperties } from './properties';

// Context imports
import { useGeo } from 'context/geo';
import { useIsochrone } from 'context/api/isochrone';

// Third-party imports
import * as turf from '@turf/turf';

const MaskContext: React.Context<any> = createContext(null)

export const useMask = () => {
	return (
		useContext(MaskContext)
	)
}

export const MaskProvider = ({children}: any) => {
	const { mapRef } = useGeo();
	const { isochroneData } = useIsochrone();

	const [ maskProperties, setMaskProperties ] = useState([]);
	const [ activeFeatures, setActiveFeatures ] = useState(false);

	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;
		const onData = (e: any) => e.tile && setActiveFeatures((prev) => !prev);
	    map.on('data', onData);
	    return () => {map.off('data', onData)};
	}, [ mapRef.current ]);

	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;
		const features = map.queryRenderedFeatures();
		const maskFeatures = features.filter((item: any) => {
			const featureGeometry = isochroneData.features[0].geometry;
			if (item.source === 'sc-business') {
			    return turf.booleanPointInPolygon(item.geometry, featureGeometry);
			}
		});	
		setMaskProperties(maskFeatures);
	}, [ activeFeatures ]);

	const geoJsonData: any = useMemo(() => {
	  if (!maskProperties || maskProperties.length === 0) return null;

	  const features = maskProperties.flatMap((maskProp: any) => {
	    const { geometry, properties } = maskProp;
	    const { cnae_divisao } = properties;

	    return [{
	      type: 'Feature',
	      geometry: {
	        type: 'Point',
	        coordinates: geometry.coordinates,
	      },
	      properties: {
	        ...properties,
	        color: getColor(cnpjProperties, cnae_divisao),
	        label: getLabel(cnpjProperties, cnae_divisao)
	      }
	    }];
	  });

	  return features.length > 0 ? { type: 'FeatureCollection', features } : null;
	}, [maskProperties]);

	return (
		<MaskContext.Provider value={{ geoJsonData }}>
			{children}
		</MaskContext.Provider>
	)
}

MaskContext.displayName = "MaskContext";