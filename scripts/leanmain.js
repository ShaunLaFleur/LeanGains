// This script was created after starting the "Odin Project" using only basic knowledge of Javascript(+jQuery), CSS and HTML5.

var mySett = document.getElementById("mysettings");
var myWorkdays = 3;
var workPerc = 1.20;
var restPerc = 0.80;
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



$(document).ready(function(){
	$("#proteinperc, #fatperc, #carbperc").trigger("change");
	$("#advanced-option-div").css("border", "2px solid orange");
});

// Highlighting on hover
$("#calbreak, #macrobreak, #inputinfo").mouseenter(function(){
	$(this).css("border", "5px solid orange");
});
$("#calbreak, #macrobreak, #inputinfo").mouseleave(function(){
	$(this).css("border", "5px solid white");
});

// Calculator Options
$("#advanced-option").click(function(){
	$("#macrobreak, #workday-drop, #protein-drop, #carbs-drop, #fats-drop, #split-drop, #restday-drop, #workday-display, #restday-display").show();
	$("#daily-intake-list, #calintake-display").hide();
	$("#inputinfo, #calbreak").css("min-height", "270px");
	$("#advanced-option-div").css("border", "2px solid orange");
	$("#basic-option-div").css("border", "2px solid white");
	workPerc = $("#workperc").val();
	restPerc = $("#restperc").val();
	setCals();
});

$("#basic-option").click(function(){
	$("#macrobreak, #workday-drop, #protein-drop, #carbs-drop, #fats-drop, #split-drop, #restday-drop, #workday-display, #restday-display").hide();
	$("#daily-intake-list, #calintake-display").show();
	$("#inputinfo, #calbreak").css("min-height", "220px");
	$("#basic-option-div").css("border", "2px solid orange");
	$("#advanced-option-div").css("border", "2px solid white");
	workPerc = $("#dayintake-drop").val();
	restPerc = $("#dayintake-drop").val();
	setCals();
});

$("#dayintake-drop").change(function(){
	workPerc = $(this).val();
	restPerc = $(this).val();
	setCals();
});

// Definition Popups
// BMR Popup
$("#bmr-quest").hover(function(){
	$("#bmr-def").toggle();
});

// TDEE Popup
$("#tdee-quest").hover(function(){
	$("#tdee-def").toggle();
});

// Weekly Popup
$("#weekly-quest").hover(function(){
	$("#weekly-def").toggle();
});

// Activity Level Popup
$("#activity-quest").hover(function(){
	$("#activity-def").toggle();
});

// Workout Split Popup
$("#split-quest").hover(function(){
	$("#split-def").toggle();
});

// Workout Day Popup
$("#workday-quest").hover(function(){
	$("#workday-def").toggle();
});

// Rest Day Popup
$("#restday-quest").hover(function(){
	$("#restday-def").toggle();
});

// Protein Percentage Popup
$("#protein-quest").hover(function(){
	$("#protein-def").toggle();
});

// Carbs Percentage Popup
$("#carbs-quest").hover(function(){
	$("#carbs-def").toggle();
});

// Fats Percentage Popup
$("#fats-quest").hover(function(){
	$("#fats-def").toggle();
});

// Daily Calorie Intake Popup
$("#dayintake-quest").hover(function(){
	$("#dayintake-def").toggle();
});


function setStuff(a) {
	switch(a) {
		case "mysex":
			mySex = parseInt($("#mysex").val());
			setCals();
			break;
		case "restday":
			restPerc = parseFloat($("#restperc").val());
			setCals();
			break;
		case "workday":
			workPerc = parseFloat($("#workperc").val());
			setCals();
			break;
		case "mysplit":
			myWorkdays = parseInt($("#split").val());
			setCals();
			break;
		case "activity":
			myActivity = parseFloat($("#activity").val());
			setCals();
			break;
		default:
			break;
	}

}

$("#height").on("change keyup paste", function(){
	myHeight = parseInt($(this).val());
	if(isNaN(myHeight)) {
		myHeight = 0;
		setDefaults();
	} else if(myMeasurement == 1) {
		myHeight = Math.round(myHeight*2.54);
	}
	setCals();
});

$("#weight").on("change keyup paste", function(){
	myWeight = parseInt($("#weight").val());
	if(isNaN(myWeight)) {
		myWeight = 0;
		setDefaults();
			} else if(myMeasurement == 1) {
		myWeight = Math.round(myWeight/2.2);
	}
	setCals();
});

$("#measurement").change(function(){
	myMeasurement = parseInt($("#measurement").val());
	if(myMeasurement == 2) {
		//document.getElementById("weight").value = Math.round(document.getElementById("weight").value/2.2);
		$("#weight").val(Math.round($("#weight").val()/2.2));
		//document.getElementById("height").value = Math.round(document.getElementById("height").value*2.54);
		$("#height").val(Math.round($("#height").val()*2.54));

		$("#poundorkg, #weightType").html("kgs");
		$("#heightType").html("cm");
	} else if(myMeasurement == 1) {
		//document.getElementById("weight").value = Math.round(document.getElementById("weight").value*2.2);
		$("#weight").val(Math.round($("#weight").val()*2.2));
		//document.getElementById("height").value = Math.round(document.getElementById("height").value*0.39);
		$("#height").val(Math.round($("#height").val()*0.39));

		$("#poundorkg, #weightType").html("lbs");
		$("#heightType").html("inches");
	}
	setCals();
});


$("#myage").on("change keyup paste", function(){
	myAge = parseInt($(this).val());
	if(isNaN(myAge)) {
		myAge = 0;
		setDefaults();
	} else {
		setCals();
	}
});

function setDefaults() {
	//Change Results back to default display:
	$("#myBMR, #myTDEE, #cutcals, #bulkcals").html("0kcals");
	$("#proteinwork, #proteinrest, #carbswork, #carbsrest, #fatswork, #fatsrest").html("0grams");
	$("#weekly").html("0");
}


function setCals() {
	if(myWeight !== 0 && myAge !== 0 && myHeight !== 0) {
		if(mySex == 1) {
			myBMR = Math.round(66 + (13.7*myWeight) + (5*myHeight) - (6.8*myAge));
		} else if(mySex == 2) {
			myBMR = Math.round(655 + (9.6*myWeight) + (1.8*myHeight) - (4.7*myAge));
		}
		myTDEE = Math.round(myBMR*myActivity);
		$("#myBMR").html(myBMR + "kcals");
		$("#myTDEE").html(myTDEE + "kcals");

		$("#myTDEE").html(myTDEE + "kcals")
		$("#cutcals").html(Math.round(myTDEE*restPerc) + "kcals");
		$("#bulkcals, #calintake").html(Math.round(myTDEE*workPerc) + "kcals");
		$("#proteinwork").html(Math.round((myTDEE*workPerc)/100*myProtein/4) + "grams");
		$("#proteinrest").html(Math.round((myTDEE*restPerc)/100*myProtein/4) + "grams");
		$("#carbswork").html(Math.round((myTDEE*workPerc)/100*myCarbs/4) + "grams");
		$("#carbsrest").html(Math.round((myTDEE*restPerc)/100*myCarbs/4) + "grams");
		$("#fatswork").html(Math.round((myTDEE*workPerc)/100*myFats/9) + "grams");
		$("#fatsrest").html(Math.round((myTDEE*restPerc)/100*myFats/9) + "grams");

		var myRestdays = 7 - myWorkdays; // Will set amount of rest days to 7 minus workout days to be used below. Workout days set by dropdown.
		// Weekly's formula broken down into segments to make it slightly easier to read and comprehend.
		var myWeekly = ((myTDEE*workPerc)*myWorkdays) + ((myTDEE*restPerc)*myRestdays); // Calculates total calories eaten per week. Change 3 to myWorkDays and 4 to myRestdays. 1.20 to workPerc and 0.80 with restPerc.
		var myBase = myTDEE*7; // Calculates how many calories your body burns per week.
		if(myBase < myWeekly) {
			myRESULT = (myWeekly - myBase)/3500;
			if(myMeasurement == 2) {
				myRESULT = myRESULT/2.2;
			}
			$("#weekly").html(" +" + Math.round(myRESULT*100)/100);
		} else {
			myRESULT = (myBase - myWeekly)/3500;
			if(myMeasurement == 2) {
				myRESULT = myRESULT/2.2;
			}
			$("#weekly").html(" -" + Math.round(myRESULT*100)/100);
		}
	}
}



	
$("#fatperc, #proteinperc, #carbperc").change(function(){
	if($(this).data("name") === "protein") {
		myProtein = parseInt($("#proteinperc").val());
		var checkOneName = "#fatperc";
		var checkTwoName = "#carbperc";
		var checkOneVal = myFats;
		var checkTwoVal = myCarbs;
	} else if($(this).data("name") === "fats") {
		myFats = parseInt($("#fatperc").val());
		var checkOneName = "#proteinperc";
		var checkTwoName = "#carbperc";
		var checkOneVal = myProtein;
		var checkTwoVal = myCarbs;
	} else if($(this).data("name") === "carbs") {
		myCarbs = parseInt($("#carbperc").val());
		var checkOneName = "#fatperc";
		var checkTwoName = "#proteinperc";
		var checkOneVal = myFats;
		var checkTwoVal = myProtein;
	}
	var removeValue = 101 - (myProtein+myFats+myCarbs);
	var x = $("#fatperc").children().length;
	for(i = 0; i < x; i++) {
		// Check first OTHER(not THIS option) options
		if(parseInt($(checkOneName).children().eq(i).val())-checkOneVal >= removeValue) { // Subtract because if you already have a value chosen, it is not a part of the total value.
			//document.getElementById(checkOneName).options[i].disabled = true;
			$(checkOneName).children().eq(i).prop("disabled", true);
		} else {
				//document.getElementById(checkOneName).options[i].disabled = false;
				$(checkOneName).children().eq(i).prop("disabled", false);
			}
		// Check second OTHER(not THIS option) options
		if(parseInt($(checkTwoName).children().eq(i).val())-checkTwoVal >= removeValue) {
			//document.getElementById(checkTwoName).options[i].disabled = true;
			$(checkTwoName).children().eq(i).prop("disabled", true);
		} else {
				//document.getElementById(checkTwoName).options[i].disabled = false;
				$(checkTwoName).children().eq(i).prop("disabled", false);
			}
	}
	setCals();
});
