// App imports
import './styles.scss';

export const Balls = ({ cnpjProperties, parcialCounts }: any) => {
	return (
		<div className="balls-wrapper">
			<div className="balls">
				{Object.keys(parcialCounts).map((item: any) => {
					const backgroundColor = cnpjProperties[item].color;
					const countsArray: any = Array.from({length: parcialCounts[item]}, (_, i) => (i + 1));
					
					return countsArray.map((currentItem: any, index: number) => (
						<div 
							key={`${item}-${index}`} 
							style={{
								backgroundColor: backgroundColor, 
								borderRadius: "50%"
							}}
						/>
					))
				})}
			</div>
		</div>
	)
}

Balls.displayName="Balls";