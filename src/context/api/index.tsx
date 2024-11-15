// App imports
import { GoogleApiProvider } from './google';
import { PolygonApiProvider } from './polygon';
import { CnpjApiProvider } from './cnpj';
import { IsoPolygonApiProvider } from './isoPolygon';
import { StylesApiProvider } from './styles';

export const ApiProvider = ({children}: any) => {
  return (
    <IsoPolygonApiProvider>
    <PolygonApiProvider>
    <GoogleApiProvider>
    <CnpjApiProvider>
    <StylesApiProvider>
      {children}
    </StylesApiProvider>
    </CnpjApiProvider>
    </GoogleApiProvider>
    </PolygonApiProvider>
    </IsoPolygonApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";