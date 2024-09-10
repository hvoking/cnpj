// App imports
import { GeoProvider } from './geo';

export const FiltersProvider = ({children}: any) => {
  return (
    <GeoProvider>
      {children}
    </GeoProvider>
  )
}

FiltersProvider.displayName="FiltersProvider";