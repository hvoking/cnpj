// App imports
import './styles.scss';

export const Header = () => {
	return (
		<div className="m2b-header">
			<img 
				className="logo"
				src={process.env.PUBLIC_URL + "/static/logos/logo.svg"} 
				alt="header-logo"
			/>
		</div>
	)
}

Header.displayName="Header";