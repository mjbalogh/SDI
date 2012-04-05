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
		maxAmmo = 50;
		maxZombiesPerPerson = 4;
	
	// private functions
	var debugLogObjectProperties = function (object, description) {
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
	var getIndexByName = function (array, name) {
		var len = array.length;
		for (var i = 0; i < len; i++) {
			var obj = array[i];
			if (undefined !== obj.name && name.toUpperCase() === obj.name.toUpperCase()) return i;
		}
		return -1;
	};
		
	// public variables
	ns.letsKillZombies = true,
	ns.numZombies = Math.floor(Math.random() * (maxFamily * Math.floor(Math.random() * maxZombiesPerPerson))) + 1;
	
	// public "enums"
	ns.WEAPON_TYPE = Object.freeze({
		cricketbat : {name : "cricket bat", type : 'melee'},
		revolver : {name : "revolver", type : 'ranged', maxAmmo : 6}
	});
	ns.DAMAGE_LOCATION = Object.freeze({
		body : 0,
		head : 1
	});
	
	// public functions
	// *** WEAPON ***
	ns.weapon = function (type, functional) {
		switch (type) {
			case ns.WEAPON_TYPE.cricketbat:
				this.name = type.name;
				this.range = type.type;
				break;
			case ns.WEAPON_TYPE.revolver:
				this.name = type.name;
				this.range = type.type;
				this.maxAmmo = type.maxAmmo;
				this.currentAmmo = Math.floor(Math.random() * this.maxAmmo) + 1;
				break;
			default:
				throw new Error("Undefined weapon is undefined!")
				break;
		}
		this.functional = functional || (Math.floor(Math.random() * Object.keys(ns.WEAPON_TYPE).length) === 1) ? true : false;
	
		var isBroken = function () {return this.functional;};
		debugLogObjectProperties(this, 'weapon');
	};
	
	// *** PLAYER ***
	ns.player = function (name, numFamily) {
		this.name = name,
		this.numFamily = numFamily || Math.floor(Math.random() * maxFamily) +  1,
		this.ammo = Math.floor(Math.random() * maxAmmo) + 1;
		this.weapons = [];
		
		// functions
		this.hasWeapon = function (weaponName) {
			return (getIndexByName(weaponName) !== -1);
		}
		this.loadWeapon = function (weaponName) {
			var requiredAmmo,
				index = getIndexByName(this.weapons, weaponName),
				weapon = this.weapons[index];
			if (undefined === weapon || weapon.maxAmmo === undefined) return;

			console.log(this.name, "says \"Reloading.\"");
			requiredAmmo = weapon.maxAmmo - weapon.currentAmmo;
			this.ammo -= requiredAmmo;
			weapon.currentAmmo += requiredAmmo;
		};
		this.addWeapon = function (weaponType, functional) {
			var index = getIndexByName(this.weapons, weaponType.name);
			if (-1 === index) {
				this.weapons.push(new ns.weapon(weaponType, functional));
			} else {
				if (!this.weapons[index].functional) {
					this.ammo += this.weapons[index].currentAmmo;
					this.weapons[index] = new ns.weapon(weaponType, functional);
				} else {
					this.weapons.push(new ns.weapon(weaponType, functional));
				}
			}
			if ('ranged' === weaponType.type) {
				this.loadWeapon(weaponType.name);
			}
		};
		this.dropWeapon = function (weaponName) {
			var index = getIndexByName(weaponName);
			console.log(this.name, "dropped their broken", weaponName);
			this.weapons.splice(index, 1);
		};
		this.attack = function (weaponName, zombie) {
			var weapon = this.weapons[getIndexByName(weaponName)],
				// TODO: Implement a more robust method of attack
				success = (Math.floor(Math.random() * 2) === 1) ? true : false;
			if (zombie.killed) { // should never get this
				console.log("The zombie that you are attacking is already dead");
				return false;
			} else {
				if (weapon.isBroken()) {
					console.log("The ", weapon.name, "is broken. You cannot attack with it.");
					return false;
				}
			} else {
				if (weapon.type === 'ranged' && weapon.currentAmmo < 1) {
					this.loadWeapon(weaponName);
					return false;
				}
			}
			if (success) {
				if (Math.floor(Math.random() * Object.keys(ns.DAMAGE_LOCATION).length) === 1) {
					zombie.killed = true;
					zombies.unshift;
					if (weapon.type === 'ranged') weapon.currentAmmo--;
				}
			}
			// did the weapon break during the attack?
			if (Math.floor(Math.random() * 100) <= 20) weapon.functional = false;
			return success;
		};
		
		debugLogObjectProperties(this, 'player');
	};
	
	ns.zombie = function() {
		this.killed = false;
	};
} (window.sdi = window.sdi || {})); // define namespace and protect undefined

try {
	var player = new sdi.player("Shawn"),
		zombies = [];
	player.addWeapon(sdi.WEAPON_TYPE.revolver, true);
	player.addWeapon(sdi.WEAPON_TYPE.cricketbat, true);
	
	for (var i = 0; i < sdi.numZombies; i++) {
		zombies.push(new sdi.zombie());
	}
	console.log("Number of Zombies:", zombies.length);
	for (var i = 0; i < zombies.length; i++) {
		if
	}
} catch(e) {
	console.log(e.message, "in file:", e.fileName, "on line:", e.lineNumber);
}

