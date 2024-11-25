// App imports
import { Balls } from './balls';
import { Legend } from './legend';
import { Gauge } from './gauge';
import { Ranking } from './ranking';
import './styles.scss';

// Context imports
import { useMask } from 'context/mask';
import { cnpjProperties } from 'context/mask/properties';

// Third-party imports
import * as d3 from 'd3';

export const Right = () => {
	const { geoJsonData } = useMask();

	const filteredCounts = geoJsonData &&
        geoJsonData.features.reduce((total: any, item: any) => {
            const currentKey = item.properties.label;
            if (currentKey) {
                total[currentKey] = (total[currentKey] || 0) + 1;
            }
            return total;
        }, {});

	const totalCount = filteredCounts && d3.sum(Object.values(filteredCounts));
	const parcialCounts: any = {}
	
	if (totalCount) {
        const scaledCounts = Object.keys(filteredCounts).map((key: any) => ({
            key,
            count: filteredCounts[key],
            percentage: filteredCounts[key] / totalCount,
        }));

        let remaining = 100;
        scaledCounts.forEach((item, index) => {
            const isLast = index === scaledCounts.length - 1;
            const count = isLast
                ? remaining // Allocate remaining balls to the last category
                : Math.round(item.percentage * 100);
            parcialCounts[item.key] = count;
            remaining -= count;
        });
    }
	return (
		<div className="right-wrapper">
			<Balls 
				cnpjProperties={cnpjProperties} 
				parcialCounts={parcialCounts}
			/>
			<div className="legend-wrapper">
				<Gauge 
					cnpjProperties={cnpjProperties}
					parcialCounts={parcialCounts}
				/>
			</div>
			<Legend 
				cnpjProperties={cnpjProperties} 
				data={parcialCounts}
			/>
			<Ranking cnpjProperties={cnpjProperties} parcialCounts={parcialCounts}/>
		</div>
	)
}

Right.displayName="Right";