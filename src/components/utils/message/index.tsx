// App imports
import './styles.scss';

export const UserMessage = () => {
	return (
		<div className="sidebar-item-wrapper">
			<div style={{display: "grid", gridTemplateRows: "min-content auto"}}>
				<div className="starting-title">
					Drag the pin
				</div>
				<img 
					className="starting-gif" 
					src="static/components/gif/marker_move.gif" 
					alt="marker_move"
				/>
			</div>
		</div>
	)
}

UserMessage.displayName="UserMessage";