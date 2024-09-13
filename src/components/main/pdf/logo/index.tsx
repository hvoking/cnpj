// App imports
import './styles.scss';

export const Logo = () => {
	return (
		<div 
			className="pdf-logo-wrapper" 
		>
			<img 
				src={process.env.PUBLIC_URL + "/static/logos/airbnb.svg"} 
				alt="header-logo"
			/>
			<div className="pdf-logo-name">
				Airbnb Metrics
			</div>
		</div>
	)
}

Logo.displayName="Logo";