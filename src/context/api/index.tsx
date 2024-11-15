// App imports
import { GoogleApiProvider } from './google';
import { PolygonApiProvider } from './polygon';
import { CnpjApiProvider } from './cnpj';
import { IsoPolygonApiProvider } from './isoPolygon';

export const ApiProvider = ({children}: any) => {
  return (
    <IsoPolygonApiProvider>
    <PolygonApiProvider>
    <GoogleApiProvider>
    <CnpjApiProvider>
      {children}
    </CnpjApiProvider>
    </GoogleApiProvider>
    </PolygonApiProvider>
    </IsoPolygonApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";