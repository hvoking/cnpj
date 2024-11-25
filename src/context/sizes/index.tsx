import { GaugeSizesProvider } from './gauge';
import { CircleSizesProvider } from './circle';
import { RadiusSizesProvider } from './radius';

export const SizesProvider = ({ children }: any) => {
	return (
		<GaugeSizesProvider>
		<CircleSizesProvider>
		<RadiusSizesProvider>
			{children}
		</RadiusSizesProvider>
		</CircleSizesProvider>
		</GaugeSizesProvider>
	)
}

SizesProvider.displayName="SizesProvider";