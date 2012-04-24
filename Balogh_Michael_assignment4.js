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
		
		ns.title_case = function (string) {};
		ns.inline_replace = function (string, char) {};
	} (ns.string = ns.validate || {}));
	
	// number
	(function(ns, undefined) {
		// private
		
		// public
		ns.format_decimal_places = function () {};
		ns.fuzzy_match = function () {};
		ns.delta_dates = function () {};
		ns.s2n = function () {};
	} (ns.number = ns.number || {}));
	
	// array
	(function(ns, undefined) {
		// private
		
		// public
		ns.find_smallest_delta = function (array, number) {};
		ns.sum_array_numbers = function (array) {};
		ns.sort_array_by_key = function (array, key) {};
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