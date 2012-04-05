/*
	Project 2
	Scalable Data Infrastructures
	Author: Michael Balogh
	Date: 04/04/2012
	Note: Continuation of Zombie story from 1st assignment
*/

// define namespace and protect undefined
(function(ns, undefined) {
	// private variables
	var debug = true,
		maxFamily = 4,
		maxZombiesPerPerson = 4;
	
	// private functions
	var debugLog = function (object, description) {
		if (debug) {
			this.description = description || object['name'];
			console.log("***", this.description.toUpperCase(), "***");
			for (var i in object) {
				if (object.hasOwnProperty(i) && (typeof(object[i]) !== 'function')) {
					console.log(i, ":", object[i]);
				}
			}	
		}
	};
		
	// public variables
	ns.letsKillZombies = true,
	ns.numZombies = Math.floor(Math.random() * (ns.totalFamily * Math.floor(Math.random() * (maxZombiesPerPerson)))) + 1;
	
	// public "enums"
	ns.WEAPON_TYPE = Object.freeze({
		cricketbat : {name : "cricket bat"},
		revolver : {name : "revolver", maxAmmo: 6}
	});
	
	ns.DAMAGE_LOCATION = Object.freeze({
		miss : 0,
		body : 1,
		head : 2
	});
	
	// public functions
	ns.player = function (name, numFamily) {
		this.name = name,
		this.numFamily = numFamily || Math.floor(Math.random() * maxFamily) +  1;
		
		debugLog(this, 'player');
	};
	
	ns.weapon = function (type, functional) {
		switch (type) {
			case ns.WEAPON_TYPE.cricketbat:
				this.name = ns.WEAPON_TYPE.cricketbat.name;
				break;
			case ns.WEAPON_TYPE.revolver:
				this.name = ns.WEAPON_TYPE.revolver.name;
				this.maxAmmo = ns.WEAPON_TYPE.revolver.maxAmmo;
				this.currentAmmo = Math.floor(Math.random() * this.maxAmmo) + 1;
				break;
			default:
				throw new Error("Undefined weapon is undefined!")
				break;
		}
		this.functional = functional || (Math.floor(Math.random() * Object.keys(ns.WEAPON_TYPE).length) === 1) ? true : false;
		
		debugLog(this, 'weapon');
	};

	ns.zombie = function() {
		this.killed = false;
	};
} (window.sdi = window.sdi || {})); // define namespace and protect undefined

try {
	var player = new sdi.player("Shawn"),
		revolver = new sdi.weapon(sdi.WEAPON_TYPE.revolver),
		cricketbat = new sdi.weapon(sdi.WEAPON_TYPE.cricketbat),
		zombies = [];
	
	for (var i = 0; i < sdi.numZombies; i++) {
		zombies.push(new sdi.zombie());
	}
	console.log("Number of Zombies:", zombies.length);
	console.log(Object.keys(sdi.WEAPON_TYPE).length);
} catch(e) {
	console.log(e.message, "in file:", e.fileName, "on line:", e.lineNumber);
}

