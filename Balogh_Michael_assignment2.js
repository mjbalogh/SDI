// setup namespace
(function(ns, undefined) {
	// private variables
	// var varname = value;
	
	// private functions
	// var funcname = function(arguments) {};
	
	// public variables
	// ns.varname = value;
	
	// public functions
	// ns.funcname = function(arguments) {};
} (window.sdi = window.sdi || {})); // define namespace and protect undefined (by not passing it a value)

// global workings. Call our stuff by namespace
try {
	
} catch(e) {
	console.log(e.message);
}

/*
var tankNames = ["Shark Tank", "Sting Ray Tank", "Dolphin Tank", "Fish Tank"],
	minutesPerTank = [20, 15, 25, 30],
	kidNames = ["Braden", "Rhys", "Zoe"];

var visitTank = function(whatTank) {
    var tankName = tankNames[whatTank],
    minutesThisTank = minutesPerTank[tankNumber];
    console.log(kidNames[0] + " wanted us to visit the " + tankName + " for " + minutesThisTank + " minutes. So I set the timer on my watch!");
    for (var minutes = 0; minutes < minutesThisTank; minutes += 5) {
            var minutesRemain = minutesThisTank - minutes;
            console.log("We have " + minutesRemain + " minutes left. " + minutes + " minutes have past.");
    }
    console.log("We finished with the " + tankName + ".");
};

for (var tankNumber = 0; tankNumber < tankNames.length; tankNumber++) {
    visitTank(tankNumber); 
};
*/