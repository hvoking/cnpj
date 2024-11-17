// App imports
import { GeoProvider } from './geo';
import { ApiProvider } from './api';
import { MaskProvider } from './mask';

export const MainProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <ApiProvider>
    <MaskProvider>
      {children}
    </MaskProvider>
    </ApiProvider>
    </GeoProvider>
  )
}

MainProvider.displayName="MainProvider";