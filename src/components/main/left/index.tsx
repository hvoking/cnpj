// App imports
import { Prices } from './prices';
import { Timeseries } from './timeseries';
import { SvgMap } from './svgMap';
import { UserMessage } from '../../utils/message';
import './styles.scss';

// Context imports
import { useIsoPolygonApi } from '../../context/api/isoPolygon';
import { useLinesApi } from '../../context/api/imoveis/lines';
import { usePricesApi } from '../../context/api/imoveis/prices';

export const Left = () => {
	const { initialMarker } = useIsoPolygonApi();
	const { linesData } = useLinesApi();
	const { pricesData } = usePricesApi();

	return (
		<div className="left">
			<div className="airbnb-message-wrapper">
				{!initialMarker && linesData && pricesData ?
					<div className="airbnb-sidebar-items">
						<SvgMap/>
						<Prices 
							linesData={linesData} 
							pricesData={pricesData}
						/>
						<Timeseries/>
					</div> :
					<UserMessage/>
				}
			</div>
		</div>
	)
}

Left.displayName="Left";