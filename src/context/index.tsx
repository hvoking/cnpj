// App imports
import { GeoProvider } from './geo';
import { ApiProvider } from './api';
import { MaskProvider } from './mask';
import { SizesProvider } from './sizes';
import { CircleProvider } from './circle';
import { MapsProvider } from './maps';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <ApiProvider>
    <MaskProvider>
    <SizesProvider>
    <CircleProvider>
    <MapsProvider>
      {children}
    </MapsProvider>
    </CircleProvider>
    </SizesProvider>
    </MaskProvider>
    </ApiProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";