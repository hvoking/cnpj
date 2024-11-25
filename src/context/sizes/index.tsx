import { GaugeSizesProvider } from './gauge';

export const SizesProvider = ({ children }: any) => {
	return (
		<GaugeSizesProvider>
			{children}
		</GaugeSizesProvider>
	)
}

SizesProvider.displayName="SizesProvider";