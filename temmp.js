var setStuff = function(a) {
	switch(a) {
		case "mySex":
			mySex = parseInt(document.getElementById("mysex").value);
			setCals();
			break;
		case "restday":
			restPerc = parseFloat(document.getElementById("restperc").value);
			setCals();
			break;
		case "workday":
			workPerc = parseFloat(document.getElementById("workperc").value);
			setCals();
			break;
		case "mysplit":
			myWorkdays = parseInt(document.getElementById("split").value);
			setCals();
			break;
		case "activity":
			myActivity = parseFloat(document.getElementById("activity").value);
			setCals();
			break;
		case "measure": 
			myMeasurement = parseInt(document.getElementById("measurement").value);
			break;
		default:
			break;
	}

}