// App imports
import { GoogleDetailsApiProvider } from './details';
import { GoogleSearchApiProvider } from './search';

export const GoogleApiProvider = ({children}: any) => {
  return (
    <GoogleSearchApiProvider>
    <GoogleDetailsApiProvider>
      {children}
    </GoogleDetailsApiProvider>
    </GoogleSearchApiProvider>
  )
}

GoogleApiProvider.displayName="GoogleApiProvider";