/*
	Project 2
	Scalable Data Infrastructures
	Author: Michael Balogh
	Date: 04/04/2012
	Note: Continuation of Zombie story from 1st assignment
*/
var debug = false,
	maxFamily = 4,
	maxAmmo = 99,
	maxZombiesPerPerson = 4,
	numZombies = Math.floor(Math.random() * (maxFamily * Math.floor(Math.random() * maxZombiesPerPerson))) + 1
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
	var getRandomBool = function (range, limit) {
		var cutoff = limit || range / 2;
		return (Math.floor(Math.random() * 100) >= cutoff ? true : false);
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
					console.log(player.name, "asks, \"What, no more ammo?\"");
					return -1;
				} else {
					if (requiredAmmo > player.numAmmo && player.numAmmo > 0) {
						requiredAmmo = player.numAmmo;
					}
				}
				console.log(player.name, "loads", requiredAmmo, "into his", this.name + ".");
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
				console.log(this.name, "look around for another weapon.");
				return undefined;
			}
		};
		this.loadWeapon = function (speak) {
			if (undefined === this.rangedWeapon) {
				if (speak){
					console.log(this.name, "says, \"All this ammo, and nothing to use it in.\"");
				}
			}
			if (speak) {
				console.log(this.name, "says, \"Reloading.\"");
			}
		};
		this.attack = function (weapon, zombie) {
			var success = getRandomBool(),
				headshot = getRandomBool(),
				weaponBroken = !getRandomBool(20);
			if (undefined === weapon || undefined === zombie) return false;
			if (player.rangedWeapon === weapon) {
				if (!weapon.fireRound()) {
					this.loadWeapon();
					return false;
				}
			}
			if (success) {
				if (headshot) {
					console.log(this.name, "shouts, \"Boom, headshot!\"");
					zombies.shift();
				} else {
					console.log(this.name, "moans, \"Awwww... not again.\"");
				}
			}
			if (weaponBroken) {
				weapon.functional = false;
				console.log(this.name, "shouts, \"Oh, c'mon!!!\" as his weapon breaks.");
			}
			return success;
		}
		debugObjectProperties(this, "player");
	};

try {
	var player = new player("Shawn");
	if (player.rangedWeapon.currentAmmo < player.rangedWeapon.maxAmmo) {
		player.loadWeapon(false);
	}
	createZombies();
	for (var z in zombies) {
		var weapon = player.chooseWeapon();
		if (undefined === weapon) break;		
		console.log(player.name, "attacks a zombie with his", weapon.name + ".");
		player.attack(weapon, z);
	}
	if (zombies.length > 0) {
		console.log(player.name, "needs to locate more weapons before he can save his family!!!")
	}
} catch(e) {
	console.log(e.message, "in file:", e.fileName, "on line:", e.lineNumber);
}