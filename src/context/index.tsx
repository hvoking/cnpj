// App imports
import { FiltersProvider } from './filters';
import { MapboxProvider } from './mapbox';
import { ApiProvider } from './api';
import { SizesProvider } from './sizes';

export const MainProvider = ({children}: any) => {
  return (
    <FiltersProvider>
    <ApiProvider>
    <SizesProvider>
    <MapboxProvider>
      {children}
    </MapboxProvider>
    </SizesProvider>
    </ApiProvider>
    </FiltersProvider>
  )
}

MainProvider.displayName="MainProvider";