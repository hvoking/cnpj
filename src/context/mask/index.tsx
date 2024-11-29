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
import * as d3 from 'd3';

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

	    const coord = geometry.coordinates;
	    const color = getColor(cnpjProperties, cnae_divisao);
	    const label = getLabel(cnpjProperties, cnae_divisao);

	    return [{
	      type: 'Feature',
	      geometry: {
	        type: 'Point',
	        coordinates: coord,
	      },
	      properties: {
	        ...properties,
	        color: color,
	        label: label
	      }
	    }];
	  });

	  return features.length > 0 ? { type: 'FeatureCollection', features } : null;
	}, [ maskProperties ]);

	const filteredCounts = geoJsonData &&
        geoJsonData.features.reduce((total: any, item: any) => {
            const currentKey = item.properties.label;
            if (currentKey) {
                total[currentKey] = (total[currentKey] || 0) + 1;
            }
            return total;
        }, {});

	const totalCount = filteredCounts && d3.sum(Object.values(filteredCounts));
	const parcialCounts: any = {}
	
	if (totalCount) {
        const scaledCounts = Object.keys(filteredCounts).map((key: any) => ({
            key,
            count: filteredCounts[key],
            percentage: filteredCounts[key] / totalCount,
        }));

        let remaining = 100;
        scaledCounts.forEach((item, index) => {
            const isLast = index === scaledCounts.length - 1;
            const count = isLast
                ? remaining // Allocate remaining balls to the last category
                : Math.round(item.percentage * 100);
            parcialCounts[item.key] = count;
            remaining -= count;
        });
    }

    const sortedData: any = Object.fromEntries(
      Object.entries(parcialCounts).sort(([, a]: any, [, b]: any) => b - a)

    );

	return (
		<MaskContext.Provider value={{ geoJsonData, parcialCounts, sortedData }}>
			{children}
		</MaskContext.Provider>
	)
}

MaskContext.displayName = "MaskContext";