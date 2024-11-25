import { EventsProvider } from './events';

export const MapsProvider = ({ children }: any) => {
	return (
		<EventsProvider>
			{children}
		</EventsProvider>
	)
}