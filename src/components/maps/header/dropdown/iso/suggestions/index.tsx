export const Suggestions = ({ suggestions, onClick }: any) => {
	return (
		<ul className="suggestions">
			{
				Object.keys(suggestions).map((suggestion: any, index: number) => {
					return (
						<li key={index} onClick={() => onClick(suggestion)}>
							<img 
								style={{height: "20px", width: "100%"}} 
								src={suggestions[suggestion].replace("-active", "")} 
								alt={suggestion}
							/>
						</li>
					)
				})
			}
		</ul>
	)
};

Suggestions.displayName="Suggestions";