// App imports
import { GeoProvider } from './geo';
import { ApiProvider } from './api';
import { MaskProvider } from './mask';
import { SizesProvider } from './sizes';

export const MainProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <ApiProvider>
    <MaskProvider>
    <SizesProvider>
      {children}
    </SizesProvider>
    </MaskProvider>
    </ApiProvider>
    </GeoProvider>
  )
}

MainProvider.displayName="MainProvider";