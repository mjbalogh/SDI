/*
	Project 4
	Scalable Data Infrastructures
	Author: Michael Balogh
	Date: 04/22/2012
	Note: Create a JavaScript library
*/
// define namespace and protect $ and undefined
(function(ns, $, undefined) {
	// private
	
	// public
	//string
	(function(ns, undefined) {
		// private
		
		// public
		ns.validate = {
			this.email_address = function (email) {
				// disregard RFC2822 and go with something simple.
				// would realistically perform final validations on server (by sending email)
				// note: disregards "word1 word2"@domain_name.foo (it's a stupid format anyway)
				var pattern = /^\S+@\S+\.\S+$/i;
				return pattern.test(email);
			};
			this.phone_number = function (number) {
				// regular expressions FTW
				var pattern = /^\d{3}-\d{3}-\d{4}$/;
				return pattern.test(number)
			};
			this.url = function (url) {
				// test for http?:// prefix
				var pattern = /^http?:\/\/\S+/i
				return pattern.test(url)
			};
		};
		
		ns.title_case = function (string) {
			// regexes to the rescue again. amazing how robust those little buggers are, isn't it?
			return string.replace(/\w\S*/g, function(text) { return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase(); });
		};
		ns.inline_replace = function (string, char1, char2) {
			return string.replace(/char1/g, char2);
		};
	} (ns.string = ns.validate || {}));
	
	// number
	(function(ns, undefined) {
		// private
		
		// public
		ns.format_decimal_places = function (number, decimal_places) {
			return number.toFixed(decimal_places);
		};
		ns.fuzzy_match = function (num1, num2, percent) {
			// Should just add fuzzy matching to the Number.prototype, but...
			var fuzzy = num2 * (percent/100);
			return (num1 >= num2 - fuzzy || num1 <= num2 + fuzzy);
		};
		ns.delta_dates = function () {
			
		};
		ns.s2n = function (string) {
			var pattern = /^\S+\.\S+$/gi;
			return (pattern.test(string)) ? parseFloat(string) : parseInt(string);
		};
	} (ns.number = ns.number || {}));
	
	// array
	(function(ns, undefined) {
		// private
		
		// public
		ns.find_smallest_delta = function (array, number) {
			var l = 0, m, h = array.length;
			if (array.length = 0) return -1;
			
			// edge cases:
			if (number <= array[l]) return array[l];
			if (number >= array[h]) return array[h];
			
			// do a binary search for it
			while (l <= h) {
				m = parseInt((l + h) / 2);
				if (array[m] > number) {
					h = --m;
				} else if (array[m] < number) {
					l = ++m;
				} else {
					return array[m];
				}
			}
			return -1;
		};
		ns.sum_array_numbers = function (array) {
			var summed = 0;
			for (var i in array) {
				if (typeof(i) === 'number') {
					summed += i;
				}
			}
			return summed;
		};
		ns.sort_array_by_key = function (array, key) {
			var func = function (a, b) { return (a[key] < b[key]) ? -1 : (b[key] < a[key]) ? 1 : 0; };
			return array.sort(func);
		};
	} (ns.array = ns.array || {}));
	
	// MAKE-UP Output : deliverable 1
	(function(ns, undefined) {
		ns.opening_story = function () {};
		
		// strings
		ns.validate_email_addresses = function () {};
		ns.validate_phone_number = function () {};
		ns.validate_url = function () {};
		ns.title_case_string = function () {};
		ns.inline_replace_string = function () {};
		
		// numbers
		ns.format_decimal_places = function () {};
		ns.fuzzy_match_number = function () {};
		ns.delta_dates = function () {};
		ns.string_to_number = function () {};
		
		// arrays
		ns.smallest_array_delta = function () {};
		ns.sum_array_numbers = function () {};
		ns.sort_array_by_key = function () {};
	} (ns.test = ns.test || {}));
} (window.sdi = window.sdi || {}, JSON));

try {}
catch (e) {
	console.log(e.message, 'in file:', e.filename, 'on line', e.linenumber);
}