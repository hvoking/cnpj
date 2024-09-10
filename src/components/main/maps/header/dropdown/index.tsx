// App imports
import { IsoDropdown } from './iso';
import { FiltersDropdown } from './type';
import './styles.scss';

// Context imports
import { useIsoPolygonApi } from '../../../context/api/isoPolygon';

export const Dropdown = () => {
	const { 
		routingProfile, setRoutingProfile, 
		contoursType, setContoursType, 
		contoursMinutes, contoursMeters, 
		setContoursMinutes, setContoursMeters 
	} = useIsoPolygonApi();

	const transportListOfValues: any = {
		"walking": "static/components/maps/header/walking-active.svg",
		"cycling": "static/components/maps/header/cycling-active.svg",
		"driving": "static/components/maps/header/driving-active.svg"
	}

	const timeListOfValues: any = {
		"minutes": "static/components/maps/header/minutes-active.svg",
		"meters": "static/components/maps/header/meters-active.svg",
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