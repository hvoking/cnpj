// App imports
import { PropertyTypeProvider } from './property';
import { EquipmentProvider } from './equipment';
import { DatesProvider } from './dates';
import { PricesProvider } from './prices';
import { GeoProvider } from './geo';
import { PdfProvider } from './pdf';

export const FiltersProvider = ({children}: any) => {
  return (
    <PropertyTypeProvider>
    <EquipmentProvider>
    <GeoProvider>
    <DatesProvider>
    <PricesProvider>
    <PdfProvider>
      {children}
    </PdfProvider>
    </PricesProvider>
    </DatesProvider>
    </GeoProvider>
    </EquipmentProvider>
    </PropertyTypeProvider>
  )
}

FiltersProvider.displayName="FiltersProvider";