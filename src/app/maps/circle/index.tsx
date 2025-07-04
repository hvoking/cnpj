// Context imports
import { useCircle } from 'context/circle';
import { useGeo } from 'context/geo';
import { useIsochrone } from 'context/api/isochrone';

// Third party imports
import { Source, Layer, LayerProps } from 'react-map-gl/mapbox';

import * as turf from "@turf/turf";

export const Circle = () => {
    const { createCircle } = useCircle();
    const { marker } = useGeo();
    const { longitude, latitude } = marker;
    const { isochroneData } = useIsochrone();

    const center = [ longitude, latitude ];

    const circleGeometry1 = createCircle(center, 1);

    // isochroneData.features[0].geometry

    const trim3: any = turf.circle(center, 3);
    const trim2: any = turf.circle(center, 2);
    const trim1: any = turf.circle(center, 1);

    const firstGeometry: any = turf.difference(turf.featureCollection([trim2, trim1]));
    const secondGeometry: any = turf.difference(turf.featureCollection([trim3, trim2]));

    const createLayer = (id: any, source: any, fillColor: any) => {
        const circleLayer: LayerProps = {
            id: id,
            type: 'fill',
            source: source,
            paint: {
                "fill-color": fillColor,
                "fill-opacity": 0.6
            }
        };
        return circleLayer;
    }

    const circleLayer1 = createLayer("layer-mask", "polygon-1", "rgb(201, 218, 174)");
    const circleLayer2 = createLayer("layer-mask-2", "polygon-2", "rgb(213, 173, 236)");
    const circleLayer3 = createLayer("layer-mask-3", "polygon-3", "rgb(178, 217, 235)");

    const trimWithIso: any = isochroneData && turf.intersect(turf.featureCollection([isochroneData.features[0], secondGeometry]))
    const firstTrimWithIso: any = isochroneData && turf.intersect(turf.featureCollection([isochroneData.features[0], firstGeometry]))
    const zeroTrimWithIso: any = isochroneData && turf.intersect(turf.featureCollection([isochroneData.features[0], circleGeometry1]))

    return (
        <>
            <Source 
                id="polygon-3" 
                type="geojson" 
                data={trimWithIso}
            >
                <Layer {...circleLayer3}/>
            </Source>
            <Source 
                id="polygon-2" 
                type="geojson" 
                data={firstTrimWithIso}
            >
                <Layer {...circleLayer2}/>
            </Source>
            <Source 
                id="polygon-1" 
                type="geojson" 
                data={zeroTrimWithIso}
            >
                <Layer {...circleLayer1}/>
            </Source>
            
        </>
    );
};

Circle.displayName = "Circle";