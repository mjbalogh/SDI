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
	var _debug = true,
		maxFamily = 4,
		maxZombiesPerPerson = 4;
	
	// private functions
	// var funcname = function (parameters) {};
	Object.log = function (object) {
		for (var i in object) {
			if (object.hasOwnProperty(i) && (typeof(object[i]) !== 'function')) {
				console.log(i, ":", object[i]);
			}
		}
	};
	
	// public variables
	ns.letsKillZombies = true,
	ns.numZombies = Math.floor(Math.random() * (ns.totalFamily * Math.floor(Math.random() * (maxZombiesPerPerson /* max per (4) - min per (1) + 1 */)))) + 1;
	
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
		this.numFamily = numFamily || Math.floor(Math.random() * maxFamily /* maxFamily - player + 1 */);
		
		if (_debug) {
			console.log("*** PLAYER ***");
			Object.log(this);
		}
	};
	
	ns.weapon = function (type, functional) {
		switch (type) {
			case ns.WEAPON_TYPE.cricketbat:
				this.name = ns.WEAPON_TYPE.cricketbat.name;
				break;
			case ns.WEAPON_TYPE.revolver:
				this.name = ns.WEAPON_TYPE.revolver.name;
				this.maxAmmo = ns.WEAPON_TYPE.revolver.maxAmmo;
				this.currentAmmo = Math.floor(Math.random() * this.maxAmmo /* maxAmmo - 1 min + 1 */) + 1;
				break;
			default:
				throw new Error("Undefined weapon is undefined!")
				break;
		}
		this.functional = functional;
		
		this.log = function() {
			for (var i in this) {
				if (this.hasOwnProperty(i) && typeof(this[i]) !== 'function') {
					console.log(i, ":", this[i]);
				}
			}
		};
		if (_debug) {
			console.log("*** WEAPON ***");
			Object.log(this);
		}
	};

	ns.zombie = function() {
		this.killed = false;
	};
} (window.sdi = window.sdi || {})); // define namespace and protect undefined

try {
	var player = new sdi.player("Shawn"),
	var revolver = new sdi.weapon(sdi.WEAPON_TYPE.revolver, true),
		cricketbat = new sdi.weapon(sdi.WEAPON_TYPE.cricketbat, true),
		zombies = [];
	
	for (var i = 0; i < sdi.numZombies; i++) {
		zombies.push(new sdi.zombie());
	}
	console.log("Number of Zombies:", zombies.length);
} catch(e) {
	console.log(e.message, "in file:", e.fileName, "on line:", e.lineNumber);
}

