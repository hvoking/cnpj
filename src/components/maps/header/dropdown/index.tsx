// App imports
import { IsoDropdown } from './iso';
import { FiltersDropdown } from './type';
import './styles.scss';

// Context imports
import { useIsochrone } from 'context/api/isochrone';

const baseUrl = `${process.env.PUBLIC_URL}/static/components/maps/header`

export const Dropdown = () => {
	const { 
		routingProfile, setRoutingProfile, 
		contoursType, setContoursType, 
		contoursMinutes, contoursMeters, 
		setContoursMinutes, setContoursMeters 
	} = useIsochrone();

	const transportListOfValues: any = {
		"walking": `${baseUrl}/walking-active.svg`,
		"cycling": `${baseUrl}/cycling-active.svg`,
		"driving": `${baseUrl}/driving-active.svg`
	}

	const timeListOfValues: any = {
		"minutes": `${baseUrl}/minutes-active.svg`,
		"meters": `${baseUrl}/meters-active.svg`,
	}

	const minutesDict: any = {
		"5": "5 min",
		"15": "15 min",
		"30": "30 min",
		"45": "45 min",
		"60": "60 min",
	}
	const metersDict: any = {
		1000: "1 km",
		2000: "2 km",
		5000: "5 km",
	}

	return (
		<>
			<IsoDropdown
				listOfValues = {transportListOfValues}
				currentState={routingProfile}
				setState={setRoutingProfile}
			/>
			<IsoDropdown
				listOfValues = {timeListOfValues}
				currentState={contoursType}
				setState={setContoursType}
			/>
			<FiltersDropdown
				imoveisDict={contoursType === "minutes" ? minutesDict : metersDict}
				propertyName={contoursType === "minutes" ? `${contoursMinutes} min` : `${contoursMeters / 1000} km`}
				setPropertyTypeId={contoursType === "minutes" ? setContoursMinutes : setContoursMeters}
			/>
		</>
	)
}

Dropdown.displayName="Dropdown";