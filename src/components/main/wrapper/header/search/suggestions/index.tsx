// App imports
import './styles.scss';

export const Suggestions = ({ suggestions, 	handleClick }: any) => {
	return (
		<ul className="search-suggestions">
			{
				suggestions.slice(0, 5).map((suggestion: any, index: number) => {
					return (
						<li 
							key={index} 
							className="suggestions-item"
							onClick={(e: any) => handleClick(e, suggestion)} 
						>
							<div className="current-suggestion">
								<div style={{width: "20px"}}>
									<img 
										src={process.env.PUBLIC_URL + "/static/components/maps/marker.svg"}
										alt="pin" 
										width="15px" 
										style={{alignSelf: "center"}}
									/>
								</div>
								<div>{suggestion}</div>
							</div>
						</li>
					)
				})
			}
		</ul>
	)
};

Suggestions.displayName="Suggestions";