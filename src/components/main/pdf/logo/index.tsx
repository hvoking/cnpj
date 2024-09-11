export const Logo = () => {
	return (
		<div className="logo-wrapper" style={{paddingBottom: "20px", paddingLeft: "5px", paddingTop: "10px"}}>
			<img 
				className="logo"
				src={process.env.PUBLIC_URL + "/static/logos/black.svg"} 
				alt="header-logo"
			/>
			<div className="logo-name" style={{paddingLeft: "8px", color: "rgba(0, 0, 0, 1)"}}>Spatial Fingers</div>
		</div>
	)
}

Logo.displayName="Logo";