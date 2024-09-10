// App imports
import { PolygonApiProvider } from './polygon';
import { GoogleApiProvider } from './google';
import { ImoveisApiProvider } from './imoveis';
import { IsoPolygonApiProvider } from './isoPolygon';
import { HexagonsApiProvider } from './hexagons';

export const ApiProvider = ({children}: any) => {
  return (
    <IsoPolygonApiProvider>
    <PolygonApiProvider>
    <HexagonsApiProvider>
    <GoogleApiProvider>
    <ImoveisApiProvider>
      {children}
    </ImoveisApiProvider>
    </GoogleApiProvider>
    </HexagonsApiProvider>
    </PolygonApiProvider>
    </IsoPolygonApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";

export * from './polygon';
export * from './google';
export * from './imoveis';
export * from './isoPolygon';
export * from './hexagons';