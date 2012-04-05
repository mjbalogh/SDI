/*
	Project 2
	Scalable Data Infrastructures
	Author: Michael Balogh
	Date: 04/04/2012
	Note: Continuation of Zombie story from 1st assignment
*/
var debug = false,
	maxFamily = 4,
	maxAmmo = 50,
	maxZombiesPerPerson = 4,
	numZombies = Math.floor(Math.random() * (maxFamily * Math.floor(Math.random() * maxZombiesPerPerson))) + 1,
	introText = [],
	zombies = [];
	
var debugObjectProperties = function (object, description) {
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
var debugLog = function (object, description) {
	if (debug) {
		console.log(object, ':', description)
	}
};
var getRandomBool = function (range, limit) {
	limit = limit || range / 2;
	return ((Math.floor(Math.random() * range) >= limit) ? true : false);
};
var createZombies = function () {
	for (var i = 0; i < numZombies; i++) {
		zombies.push('zombie');
	}
};
	
var weapon = function (name, functional) {
	this.name = name;
	if (name.toUpperCase() === 'REVOLVER') {
		this.maxAmmo = 6;
		this.currentAmmo = Math.floor(Math.random() * this.maxAmmo) + 1;
		this.fireRound = function () {
			if (this.currentAmmo < 1) {
				return false;
			} else {
				this.currentAmmo--;
				return true;
			}
		};
		this.reload = function () {
			var requiredAmmo = this.maxAmmo - this.currentAmmo;
			if (player.numAmmo < 1) {
				debugLog(player.numAmmo, "weapon.reload, player ammo")
				console.log(player.name, "asks, \"What, no more ammo?\"");
				return 0;
			} else {
				if (requiredAmmo > player.numAmmo && player.numAmmo > 0) {
					requiredAmmo = player.numAmmo;
				}
			}
			//console.log(player.name, "loads", requiredAmmo, "rounds into his", this.name + ".");
			player.numAmmo -= requiredAmmo;
			this.currentAmmo += requiredAmmo;
			return requiredAmmo;
		};
	}
	this.functional = functional || getRandomBool();
		
	debugObjectProperties(this, "weapon");
};
	
var player = function (name, numFamily) {
	this.name = name;
	this.numFamily = numFamily || Math.floor(Math.random() * maxFamily) +  1;
	this.numAmmo = Math.floor(Math.random() * maxAmmo) + 1;
	this.rangedWeapon = new weapon('revolver', true);
	this.meleeWeapon = new weapon('cricket bat', true);
		
	this.chooseWeapon = function() {
		if (this.rangedWeapon.functional) {
			return this.rangedWeapon;
		} else if (this.meleeWeapon.functional) {
			return this.meleeWeapon;
		} else {
			console.log(this.name, "looks around for something that can be used as a weapon.");
			return undefined;
		}
	};
	this.loadWeapon = function (quiet) {
		if (!this.rangedWeapon.functional) {
			if (!quiet){
				console.log(this.name, "says, \"All this ammo, and nothing to use it in.\"");
				return 0;
			}
		}
		if (!quiet) {
			console.log(this.name, "says, \"Reloading.\"");
		}
		return this.rangedWeapon.reload();
	};
	this.attack = function (weapon, zombie) {
		var success = getRandomBool(50),
			headshot = getRandomBool(50),
			weaponBroken = !getRandomBool(100, 5);
		if (undefined === weapon || undefined === zombie) return false;
		debugLog(player.rangedWeapon === weapon, "use player's ranged weapon")
		if (player.rangedWeapon === weapon) {
			var fired = weapon.fireRound();
			if (!fired) {
				this.loadWeapon();
				return false;
			}
		}
		debugLog(success, "success");
		if (success) {
			debugLog(headshot, "headshot")
			if (headshot) {
				console.log(this.name, "shouts, \"Boom, headshot!\"");
				zombies.shift();
			} else {
				console.log(this.name, "repeats, \"Need to hit them in the head\" to themself.");
			}
		} else {
			console.log(this.name, "says \"Why don't you die... again\" when they misses.")
		}
		debugLog(weaponBroken, "weaponBroken");
		if (weaponBroken) {
			weapon.functional = false;
			console.log(this.name, "shouts, \"Oh, c'mon!!!\" as their", weapon.name, "breaks.");
		}
		return success;
	}
	debugObjectProperties(this, "player");
};

var sayIntro = function (text) {
	console.log(text.join(" "));
};

var multiples = function(number, strSingular) {
	return (Math.floor(number === 1)) ? strSingular : strSingular + "s";
};
var attackZombies = function (zombies) {
	while (zombies.length > 0) {
		var weapon = player.chooseWeapon();
		if (undefined === weapon) break;
		console.log (player.name, "attacks a zombie with their", weapon.name + ".");
		player.attack(weapon, zombies[0]);
	}
	if (zombies.length > 0) {
		console.log(player.name, "needs to locate more weapons before he can save their family!!!");
	} else {
		console.log(player.name, "has just saved their family, and there was much rejoicing (for the moment)!");		
	}
};

try {
	var player = new player("Shawn"),
		oldRounds = player.rangedWeapon.currentAmmo;
		roundsLoaded = player.loadWeapon(true);
	createZombies();
	debugLog(zombies.length, "zombies created out of " + numZombies);
	
	introText = ["The zombie apocalypse has just broken out.", player.name + "just arrived home from work.",  player.name,
				"rummages through their car\nand locates a revolver, and a cricket bat that they can use to defend their family.",
				"The revolver has", oldRounds, multiples(oldRounds, "round"), "in it,\nand you load another", roundsLoaded,
				multiples(roundsLoaded, "round"), "you had in a box in the glove compartment ( leaving you with",
				player.numAmmo, multiples(player.numAmmo, "round"), ").You see", numZombies, multiples(numZombies, "zombie"),
				"\nattempting to break in and eat your family's brains.", player.name, "must kill the zombies before they can harm the", player.numFamily,
				"family", (player.numFamily - 1 >= 2) ? "members" : "member", "\ninside your home.", player.name,
				"grabs their weapons and begins the assault."];
	sayIntro(introText);
	attackZombies(zombies);
		
} catch(e) {
	console.log(e.message, "in file:", e.fileName, "on line:", e.lineNumber);
}