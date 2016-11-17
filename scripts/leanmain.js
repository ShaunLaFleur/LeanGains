 // To do. Finish dropdowns, make sure their default values set at the top here match their default selected values, and replace numbers with proper variables within the calculation section.
// And of course, pretty up the HTML and CSS.
// This script was created after starting the "Odin Project" using only basic knowledge of Javascript, CSS and HTML5.

var mySett = document.getElementById("mysettings");
var myWorkdays = 3;
var workPerc = 1.20; // To be used in place of 1.20. Defines workout day percentage over or under calories. 1.20 = +20%
var restPerc = 0.80; // To be used in place of 0.80  Defines rest day percentage over or under calories. 0.80 = -20%
var myProtein = 40;
var myCarbs = 50;
var myFats = 10;
var myTDEE = 0;
var myHeight = 0;
var mySex = 1; // 1 = Male 2 = Female
var myWeight = 0;
var myMeasurement = 1;
var myBMR = 0;
var myActivity = 1.375;
var myResult = 0;
var myAge = 0;

window.onload = function() {
	setMacrosProtein();
	setMacrosFat();
	setMacrosCarb();
}

function setSex() {
	mySex = parseInt(document.getElementById("mysex").value);
	setCals();
}

function restdayperc() {
	restPerc = parseFloat(document.getElementById("restperc").value);
	setCals();
}

function workdayperc() {
	workPerc = parseFloat(document.getElementById("workperc").value);
	setCals();
}

function mySplit(){
	myWorkdays = parseInt(document.getElementById("split").value);
	setCals();
}

function setHeight() {
	myHeight = parseInt(document.getElementById("height").value);
	if(myMeasurement == 1) {
		myHeight = Math.round(myHeight*2.54);
	}
	setCals();
}

function setWeight() {
	myWeight = parseInt(document.getElementById("weight").value);
	if(myMeasurement == 1) {
		myWeight = Math.round(myWeight/2.2);
	}
	setCals();
}

function setActivity() {
	myActivity = parseFloat(document.getElementById("activity").value);
	setCals();
}

function setMeasurement() {
	myMeasurement = parseInt(document.getElementById("measurement").value);
/*	// Return Values Back to Default
	myProtein = 40;
	myCarbs = 50;
	myFats = 10;
	myHeight = 0;
	myWeight = 0;
	myResult = 0;
	myAge = 0;
	myActivity = 1.375;
	workPerc = 1.80;
	restPerc = 0.80;
	myWorkdays = 3;
	mySex = 1;
	myBMR = 0;
	myTDEE = 0;

	//Change Results back to default display:
	document.getElementById("myBMR").innerHTML = "0kcals";
	document.getElementById("myTDEE").innerHTML = "0kcals";
	document.getElementById("cutcals").innerHTML = "0kcals";
	document.getElementById("bulkcals").innerHTML = "0kcals";
	document.getElementById("proteinwork").innerHTML = "0grams";
	document.getElementById("proteinrest").innerHTML = "0grams";
	document.getElementById("carbswork").innerHTML = "0grams";
	document.getElementById("carbsrest").innerHTML = "0grams";
	document.getElementById("fatswork").innerHTML = "0grams";
	document.getElementById("fatsrest").innerHTML = "0grams"
	document.getElementById("weekly").innerHTML = "0" */
	if(myMeasurement == 2){
		document.getElementById("weight").value = Math.round(document.getElementById("weight").value/2.2);
		document.getElementById("height").value = Math.round(document.getElementById("height").value*2.54);

		document.getElementById("poundorkg").innerHTML = "kgs";
		document.getElementById("weightType").innerHTML = "kgs";
		document.getElementById("heightType").innerHTML = "cm";
	} else if(myMeasurement == 1) {
		document.getElementById("weight").value = Math.round(document.getElementById("weight").value*2.2);
		document.getElementById("height").value = Math.round(document.getElementById("height").value*0.39);

		document.getElementById("poundorkg").innerHTML = "lbs";
		document.getElementById("weightType").innerHTML = "lbs";
		document.getElementById("heightType").innerHTML = "inches";
	}

/*	//Reset Forms (Not the one this function is called from)
	document.getElementById("form1").reset();
	document.getElementById("form2").reset();
	document.getElementById("form3").reset();
	document.getElementById("form4").reset();
	document.getElementById("form6").reset(); */
	setCals();
}

function setAge() {
	myAge = parseInt(document.getElementById("myage").value);
	setCals();
}




function setCals() {
	if(myWeight !== 0 && myAge !== 0 && myHeight !== 0 && mySex !== 0) {
		if(mySex == 1) {
			myBMR = Math.round(66 + (13.7*myWeight) + (5*myHeight) - (6.8*myAge));
		} else if(mySex == 2) {
			myBMR = Math.round(655 + (9.6*myWeight) + (1.8*myHeight) - (4.7*myAge));
		}
		myTDEE = Math.round(myBMR*myActivity);
		document.getElementById("myBMR").innerHTML = myBMR + "kcals";
		document.getElementById("myTDEE").innerHTML = myTDEE + "kcals";
	}
	if(myTDEE !== 0){
		document.getElementById("myTDEE").innerHTML = myTDEE + "kcals";
		document.getElementById("cutcals").innerHTML = Math.round((myTDEE*restPerc)) + "kcals";
		document.getElementById("bulkcals").innerHTML = Math.round((myTDEE*workPerc)) + "kcals";
		document.getElementById("proteinwork").innerHTML = Math.round((myTDEE*workPerc)/100*myProtein/4) + "grams";
		document.getElementById("proteinrest").innerHTML = Math.round((myTDEE*restPerc)/100*myProtein/4) + "grams";
		document.getElementById("carbswork").innerHTML = Math.round((myTDEE*workPerc)/100*myCarbs/4) + "grams";
		document.getElementById("carbsrest").innerHTML = Math.round((myTDEE*restPerc)/100*myCarbs/4) + "grams";
		document.getElementById("fatswork").innerHTML = Math.round((myTDEE*workPerc)/100*myFats/9) + "grams";
		document.getElementById("fatsrest").innerHTML = Math.round((myTDEE*restPerc)/100*myFats/9) + "grams";

		var myRestdays = 7 - myWorkdays; // Will set amount of rest days to 7 minus workout days to be used below. Workout days set by dropdown.
		// Weekly's formula broken down into segments to make it slightly easier to read and comprehend.
		var myWeekly = ((myTDEE*workPerc)*myWorkdays) + ((myTDEE*restPerc)*myRestdays); // Calculates total calories eaten per week. Change 3 to myWorkDays and 4 to myRestdays. 1.20 to workPerc and 0.80 with restPerc.
		var myBase = myTDEE*7; // Calculates how many calories your body burns per week.
		if(myBase < myWeekly) {
			myRESULT = (myWeekly - myBase)/3500;
			if(myMeasurement == 2) {
				myRESULT = myRESULT/2.2;
			}
			document.getElementById("weekly").innerHTML = " +" + Math.round(myRESULT*100)/100;
		} else {
			myRESULT = (myBase - myWeekly)/3500;
			if(myMeasurement == 2) {
				myRESULT = myRESULT/2.2;
			}
			document.getElementById("weekly").innerHTML = " -" + Math.round(myRESULT*100)/100;
		}
	}
}

mySett.onclick = function() {
	alert("Java is good to go!");
}


//======================== Dropdown Functions Below ================================//
function setMacrosProtein() {
	myProtein = parseInt(document.getElementById("proteinperc").value);
	var removeValue = 101 - (myProtein+myFats+myCarbs);
	var x = document.getElementById("fatperc").options.length;
	for(i = 0; i < x; i++) {
		// Check fatperc
		if(parseInt(document.getElementById("fatperc").options[i].value)-myFats >= removeValue) { // Subtract because if you already have a value chosen, it is not a part of the max value.
			document.getElementById("fatperc").options[i].disabled = true;
		} else {
				document.getElementById("fatperc").options[i].disabled = false;
			}
		// Check carbperc
		if(parseInt(document.getElementById("carbperc").options[i].value)-myCarbs >= removeValue) {
			document.getElementById("carbperc").options[i].disabled = true;
		} else {
				document.getElementById("carbperc").options[i].disabled = false;
			}
	}
	setCals();
}

function setMacrosFat(){
	myFats = parseInt(document.getElementById("fatperc").value);
	var removeValue = 101 - (myProtein+myFats+myCarbs);
	var x = document.getElementById("fatperc").options.length;
	for(i = 0; i < x; i++) {
		// Check Protein
		if(parseInt(document.getElementById("proteinperc").options[i].value)-myProtein >= removeValue) {
			document.getElementById("proteinperc").options[i].disabled = true;
		} else {
				document.getElementById("proteinperc").options[i].disabled = false;
			}
		// Check carbperc
		if(parseInt(document.getElementById("carbperc").options[i].value)-myCarbs >= removeValue) {
			document.getElementById("carbperc").options[i].disabled = true;
		} else {
					document.getElementById("carbperc").options[i].disabled = false;
				}
	}
	setCals();
}

function setMacrosCarb(){
	myCarbs = parseInt(document.getElementById("carbperc").value);
	var removeValue = 101 - (myProtein+myFats+myCarbs);
	var x = document.getElementById("fatperc").options.length;
	for(i = 0; i < x; i++) {
		// Check Protein
		if(parseInt(document.getElementById("proteinperc").options[i].value)-myProtein >= removeValue) {
			document.getElementById("proteinperc").options[i].disabled = true;
		} else {
				document.getElementById("proteinperc").options[i].disabled = false;
			}
		// Check fatperc
		if(parseInt(document.getElementById("fatperc").options[i].value)-myFats >= removeValue) {
			document.getElementById("fatperc").options[i].disabled = true;
		} else {
				document.getElementById("fatperc").options[i].disabled = false;
			}
	}
	setCals();
}