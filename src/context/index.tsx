// App imports
import { FiltersProvider } from './filters';
import { MapboxProvider } from './mapbox';
import { ApiProvider } from './api';
import { SizesProvider } from './sizes';
import { MaskProvider } from './mask';

export const MainProvider = ({children}: any) => {
  return (
    <FiltersProvider>
    <ApiProvider>
    <SizesProvider>
    <MapboxProvider>
    <MaskProvider>
      {children}
    </MaskProvider>
    </MapboxProvider>
    </SizesProvider>
    </ApiProvider>
    </FiltersProvider>
  )
}

MainProvider.displayName="MainProvider";