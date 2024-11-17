// App imports
import { IsochroneProvider } from './isochrone';
import { StylesProvider } from './styles';

export const ApiProvider = ({children}: any) => {
  return (
    <IsochroneProvider>
    <StylesProvider>
      {children}
    </StylesProvider>
    </IsochroneProvider>
  )
}

ApiProvider.displayName="ApiProvider";