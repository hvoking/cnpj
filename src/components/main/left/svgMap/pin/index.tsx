export const Pin = ({ pinCoordinates }: any) => {
	return (
		<image
		  x={pinCoordinates[0] - 4}
		  y={pinCoordinates[1] - 11.7}
		  width={8}
		  height={12}
		  href="static/components/maps/marker.svg"
		  className="pin-marker"
		/>
	)
}

Pin.displayName="Pin";