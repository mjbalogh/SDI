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
	(function(ns, undefined) {
		// private
		
		// public
		ns.email_address = function (email) {
			// disregard RFC2822 and go with something simple.
			// would realistically perform final validations on server (by sending email)
			// note: disregards "word1 word2"@domain_name.foo (it's a stupid format anyway)
			var pattern = /^\S+@\S+\.\S+$/i;
			return pattern.test(email);
		};
		ns.phone_number = function (number) {
			// regular expressions FTW
			var pattern = /^\d{3}-\d{3}-\d{4}$/;
			return pattern.test(number)
		};
		ns.url = function (url) {
			var pattern = /^http?:\/\/\S+/i
			return pattern.test(url)
		};
	} (ns.validate = ns.validate || {}));
} (window.sdi = window.sdi || {}, JSON));

try {}
catch (e) {
	console.log(e.message, 'in file:', e.filename, 'on line', e.linenumber);
}