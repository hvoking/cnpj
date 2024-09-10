// App imports
import { IsoSizesProvider } from './iso';

export const SizesProvider = ({children}: any) => {
  return (
    <IsoSizesProvider>
      {children}
    </IsoSizesProvider>
  )
}

SizesProvider.displayName="SizesProvider";