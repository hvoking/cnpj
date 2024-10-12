// App imports
import './styles.scss';

export const Logo = () => {
	return (
		<div className="logo-wrapper">
			<img 
				className="logo"
				src={process.env.PUBLIC_URL + "/static/logos/logo.svg"} 
				alt="header-logo"
			/>
		</div>
	)
}

Logo.displayName="Logo";