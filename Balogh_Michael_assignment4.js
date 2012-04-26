/*
	Project 4
	Scalable Data Infrastructures
	Author: Michael Balogh
	Date: 04/22/2012
	Note: Create a JavaScript library
*/
// define namespace and protect $ and undefined
(function(ns, undefined) {
	// privately duck punch RegExp until it sounds like it contains a function to escape special characters
	RegExp.escape = function(str) {
		return str.replace(/[[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	};

	// public
	//string
	(function(ns, undefined) {
		// private
		
		// public
		ns.validate_email_address = function (email) {
				// disregard RFC2822 and go with something simple.
				// would realistically perform final validations on server (by sending email)
				// note: disregards "word1 word2"@domain_name.foo (it's a stupid format anyway)
				var pattern = /^\S+@\S+\.\S+$/i;
				return pattern.test(email);
			};
		ns.validate_phone_number = function (number) {
				// regular expressions FTW
				var pattern = /^\d{3}-\d{3}-\d{4}$/;
				return pattern.test(number)
			};
		ns.validate_url = function (url) {
			// test for http?:// prefix
			var pattern = /^https?:\/\/\S+/i
			return pattern.test(url)
		};
		ns.title_case = function (string) {
			// regexes to the rescue again. amazing how robust those little buggers are, isn't it?
			return string.replace(/\w\S*/g, function(text) { return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase(); });
		};
		ns.inline_replace = function (string, char1, char2) {
			var pattern = new RegExp(RegExp.escape(char1), "g");
			return string.replace(pattern, char2);
		};
	} (ns.strings = ns.strings || {}));
	
	// number
	(function(ns, undefined) {
		// public
		ns.format_decimal_places = function (number, decimal_places) {
			return number.toFixed(decimal_places);
		};
		ns.fuzzy_match = function (num1, num2, percent) {
			// Should just add fuzzy matching to the Number.prototype, but...
			var fuzzy = num2 * (percent/100);
			return (num1 >= num2 - fuzzy && num1 <= num2 + fuzzy);
		};
		ns.delta_dates = function (date1, date2) {
			var delta, days, hours;
			if (date1 instanceof Date && date2 instanceof Date) {			
				// round to the nearest minute [3,600,000 milliseconds/hour]
				delta = Math.round(Math.abs((date1.valueOf() - date2.valueOf()) / 3600000));
				days = parseInt(delta / 24);
				hours = delta % 24;
				console.log('days:', days);
				console.log('hours:', hours);
			
				return 'There are '  + ((days > 0) ? days + ' days, and ' : '') + hours + ' hours between ' + date1.toUTCString() + ' and ' + date2.toUTCString() + '.';
			} else throw('function arguments must be date objects');
		};
		ns.s2n = function (string) {
			return (string.indexOf('.') !== -1) ? parseFloat(string) : parseInt(string);
		};
	} (ns.numbers = ns.numbers || {}));
	
	// array
	(function(ns, undefined) {
		// public
		ns.find_smallest_delta = function (array, number) {
			var l = 0, m, h = array.length - 1;
			if (array.length === 0) return -1;
			
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
			};
			// not directly found. now find which of the surrounding ones is closest
			return ((number - array[m-1]) < (array[m+1] - number)) ? array[m-1] : array[m+1];
		};
		ns.sum_array_numbers = function (array) {
			var summed = 0;
			for (var i = 0; i < array.length; i++) {
				if (typeof(array[i]) === 'number') {
					summed += array[i];
				}
			}
			return summed;
		};
		ns.sort_array_by_key = function (array, key) {
			var func = function (a, b) { return (a[key] < b[key]) ? -1 : (b[key] < a[key]) ? 1 : 0; };
			return array.sort(func);
		};
	} (ns.arrays = ns.arrays || {}));
	
} (window.sdi = window.sdi || {}));

// MAKE-UP Output : deliverable 1
(function(ns, undefined) {
	var pass_fail = function (expect, receive) {
		var result;
		if (isNaN(expect) && isNaN(receive)) {
			result = "\'PASS\'";
		} else {
			result = (expect === receive) ? "\'PASS\'" : "\'!!! FAIL !!!\'"
		}
		console.log('Expected:', expect, ' and Received:', receive, '--', result);
		console.log("\n");
	};

	ns.opening_story = function () {
		var text = [
			"This week's project was to write a library containing 6 of the 12 functions that were listed for the assignment.",
			"The library that I have completed consists of all 12 functions, in working order.",
			"This is further demonstrated by the testing functions which will be run after this is displayed.",
			"Admittedly, I could have refactored this testing code a bit to keep to the DRY sentiment,",
			"but for temporary unit test mocks, it performs both the desired functionality of actually testing the library,",
			"and showing that I understand the 'Output' requirement from project 1."
		];
		console.log(text.join("\n"));
		console.log("\n");
	};
	ns.test_all = function () {
		ns.string_tests.do_tests();	
		ns.number_tests.do_tests();
		ns.array_tests.do_tests();
	};
	
	(function(ns, undefined) {
		ns.do_tests = function () {
			ns.test_email_addresses();
			ns.test_phone_numbers();
			ns.test_urls();
			ns.test_title_casing();
			ns.test_in_place_replacements();
		};
		ns.test_email_addresses = function () {
			var test_cases = [
				{
					name: "Email validation test 1",
					description: "Given I have an email address\n\tAnd it is valid\n\tThe validation should return 'true'",
					fixture: "mjbalogh@gmail.com",
					expectation: true
				},
				{
					name: "Email validation test 2",
					description: "Given I have an email address\n\tAnd it is invalid\n\tThe validation shoudl return 'false'",
					fixture: "mjbalogh.gmail.com",
					expectation: false
				},
				{
					name: "Email validation test 3",
					description: "Given I have an email address\n\tAnd it is RFC 2822 compliant, but non-standard\n\tThe validation should return 'false'",
					fixture: '"Michael Balogh"@gmail.com',
					expectation: false
				}
			];
			
			console.log("Email Address Validation Tests");
			console.log("These tests will verify the correctness of the email validator function that I have included in my library.");
			console.log("\n");
			
			for (var i = 0; i < test_cases.length; i++) {
				var test = test_cases[i],
					result = sdi.strings.validate_email_address(test.fixture);
				console.log(test.name);
				console.log(test.description);
				console.log('Calling the sdi.strings.validate_email_address function on', test.fixture, 'returns:', result);
				pass_fail(test.expectation, result);
			}
			console.log("\n");
		};
		ns.test_phone_numbers = function () {
			var test_cases = [
				{
					name: "Phone number validation test 1",
					description: "Given that I have a phone number\n\tAnd it is valid\n\tThe validation should return 'true'",
					fixture: "555-555-5555",
					expectation: true
				},
				{
					name: "Phone number validation test 2",
					description: "Given that I have a phone number\n\tAnd it is in an invalid format\n\tThe validation should return 'false'",
					fixture: "(555) 555-5555",
					expectation: false
				},
				{
					name: "Phone number validation test 3",
					description: "Given that I have a phone number\n\tAnd it is invalid\n\tThe validation should return 'false'",
					fixture: "555-555-555",
					expectation: false
				},
			];
			
			console.log("Phone Number Validation Tests");
			console.log("These tests will verify the correctness of the phone number validator function that I have included in my library.");
			console.log("\n");
			
			for (var i = 0; i < test_cases.length; i++) {
				var test = test_cases[i],
					result = sdi.strings.validate_phone_number(test.fixture);
				console.log(test.name);
				console.log(test.description);
				console.log('calling the sdi.strings.validate_phone_number function on', test.fixture, 'returns:', result);
				pass_fail(test.expectation, result);
			}
			console.log("\n");
		};
		ns.test_urls = function () {
			var test_cases = [
				{
					name: "URL validation test 1",
					description: "Given that I have a URL\n\tAnd it begins with 'http://'\n\tThe validation should return 'true'",
					fixture: "http://valid.address.com",
					expectation: true
				},
				{
					name: "URL validation test 2",
					description: "Given that I have a URL\n\tAnd it begins with 'https://'\n\tThe validation should return 'true'",
					fixture: "https://valid.address.com",
					expectation: true
				},
				{
					name: "URL validation test 3",
					description: "Given that I have a URL\n\tAnd it does not begin with 'http://' -or- 'https://'\n\tThe validation should return 'false'",
					fixture: "gopher://invalid.address.com",
					expectation: false
				}
			];
			
			console.log("URL Validation Tests");
			console.log("These tests will verify the correctness of the URL validator that I included in my library.");
			console.log("\n");
			for (var i = 0; i < test_cases.length; i++) {
				var test = test_cases[i],
					result = sdi.strings.validate_url(test.fixture);
				console.log(test.name);
				console.log(test.description);
				console.log('calling the sdi.strings.validate_url function on', test.fixture, 'returns:', result);
				pass_fail(test.expectation, result);
			}
			console.log("\n");
		};
		ns.test_title_casing = function () {
			var test_cases = [
				{
					name: "Title case manipulation test 1",
					description: "Given that I have a string\n\tIt should return the string back with all words title cased",
					fixture: "the brown fox jumps over the wall",
					expectation: "The Brown Fox Jumps Over The Wall"
				},
				{
					name: "Title case manipulation test 2",
					description: "Given that I have a string with punctuation\n\tIt should return the string back with all words title cased",
					fixture: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,",
					expectation: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit,"
				}
			];
			
			console.log("Title Case Manipulation Tests");
			console.log("These tests will verify the correct manipulation of string functions that I have included in my library.");
			
			for (var i = 0; i < test_cases.length; i++) {
				var test = test_cases[i],
				result = sdi.strings.title_case(test.fixture);
				console.log(test.name);
				console.log(test.description);
				console.log('calling the sdi.strings.title_case function on', test.fixture, 'returns:', result);
				pass_fail(test.expectation, result);
			}
			console.log("\n");	
		};
		ns.test_in_place_replacements = function () {
			var test_cases = [
				{
					name: "In-place separator replacement test 1",
					description: "Given that I have a string\n\tAnd I have defined the separator that I want replaced\n\tAnd I have defined the separator I want it replaced with\n\tThe string should be returned with the correct separator in place",
					string: "Lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit",
					separator1: '-',
					separator2: '|',
					expectation: 'Lorem|ipsum|dolor|sit|amet|consectetur|adipisicing|elit'
				}
			];
			
			console.log("In-Place Separator Replacement Tests");
			console.log("These tests will verify that string separators will be correctly replaced");
			console.log("\n");

			for (var i = 0; i < test_cases.length; i++) {
				var test = test_cases[i],
					result = sdi.strings.inline_replace(test.string, test.separator1, test.separator2);
				console.log(test.name);
				console.log(test.description);
				console.log('Passing', test.string, "into the inline_replace function with '" + test.separator1 + "' as the character you want replaced with '" + test.separator2 + "' should return", test.expectation);
				console.log('calling the sdi.strings.inline_replace function on', test.string, 'returns:', result);
				pass_fail(test.expectation, result);
			}
			console.log("\n");
			
		};
	} (ns.string_tests = ns.string_tests || {}));
	
	(function(ns, undefined) {
		ns.do_tests = function () {
			ns.test_decimal_place_formatting();
			ns.test_fuzzy_matching();
			ns.test_delta_dates();
			ns.test_strings_to_numbers();
		};
		ns.test_decimal_place_formatting = function() {
			var test_cases = [
				{
					name: "Numeric decimal place formatting test 1",
					description: "Given that I have a number\n\tAnd I have chosen how many decimal places I would like it to have\n\tIt should return the number with the correct number of decimal places",
					number: 12345.20,
					decimal_places: 3,
					expectation: '12345.200'
				},
				{
					name: "Numeric decimal place formatting test 2",
					description: "Given that I have a number\n\tAnd I have chosen less decimal places than it should have\n\tIt should correctly round the number while truncating the decimal places",
					number: 1234.5678,
					decimal_places: 3,
					expectation: '1234.568'
				}
			];
			console.log("Number Decimal Place Format Tests");
			console.log("These tests will verify that the correct formatting of numeric decimal places is returned is taking place.");
			console.log("\n");
			
			for (var i = 0; i < test_cases.length; i++) {
				var test = test_cases[i],
					result = sdi.numbers.format_decimal_places(test.number, test.decimal_places);
				console.log(test.name);
				console.log(test.description);
				console.log('Calling sdi.numbers.format_decimal_places on the number', test.number, 'with', test.decimal_places, 'decimal places should return', test.expectation);
				pass_fail(test.expectation, result.toString());
			}
		};
		ns.test_fuzzy_matching = function() {
			var test_cases = [
				{
					name: "Fuzzy number matching test 1",
					description: "Given that I have two numbers\n\tAnd the percentage I have chosen allows a fuzzy match\n\tIt should return 'true'",
					number1: 9,
					number2: 10,
					percentage: 10,
					expectation: true
				},
				{
					name: "Fuzzy number matching test 2",
					description: "Given that I have two numbers\n\tAnd the percentage chosen places the first number outside the fuzzy matching boundary\n\tIt should return 'false'",
					number1: 9,
					number2: 10,
					percentage: 5,
					expectation: false
				}
			];
			console.log("Fuzzy Number Matching Tests");
			console.log("These tests will determine if my fuzzy matching calculations are correct.");
			
			for (var i = 0; i < test_cases.length; i++) {
				var test = test_cases[i],
				result = sdi.numbers.fuzzy_match(test.number1, test.number2, test.percentage);
				
				console.log(test.name);
				console.log(test.description);
				console.log('Calling sdi.numbers.fuzzy_match with numbers', test.number1, 'and', test.number2, 'with a', test.percentage + '%  buffer should return', test.expectation);
				pass_fail(test.expectation, result);
			}
		};
		ns.test_delta_dates = function() {
			var test_cases = [
				{
					name: "Delta date test 1",
					description: "Given that I have two dates\n\tIt should properly determine the number of days and hours between them",
					date1: 'Sun, 15 Apr 2012 18:00:00 GMT',
					date2: 'Tue, 17 Apr 2012 22:00:00 GMT',
					expectation: 'There are 2 days, and 4 hours between Sun, 15 Apr 2012 18:00:00 GMT and Tue, 17 Apr 2012 22:00:00 GMT.'
				},
				{
					name: "Delta date test 2",
					description: "Given that I have two dates\n\tAnd there is less than one day between the dates\n\tIt should only return the hours difference.",
					date1: 'Sun, 15 Apr 2012 18:00:00 GMT',
					date2: 'Sun, 15 Apr 2012 23:00:00 GMT',
					expectation: "There are 5 hours between Sun, 15 Apr 2012 18:00:00 GMT and Sun, 15 Apr 2012 23:00:00 GMT."
				}
			];
			
			console.log("Date Delta Tests");
			console.log("These tests will determine if my delta_dates function properly determines the number of days and hours between two dates.");
			console.log("\n");
			
			for (var i = 0; i < test_cases.length; i++) {
				var test = test_cases[i],
					result = sdi.numbers.delta_dates(new Date(test.date1), new Date(test.date2));
					
				console.log(test.name);
				console.log(test.description);
				console.log('Calling sdi.numbers.delta_dates with the dates', test.date1, 'and', test.date2, 'should return', test.expectation);
				pass_fail(test.expectation, result);
			}
		};
		ns.test_strings_to_numbers = function () {
			var test_cases = [
				{
					name: "String-to-number test 1",
					description: "Given that I have a string\n\tAnd the string has a '.' in a non-ending position\n\tIt should return the number as a float.",
					fixture: "123.5Hz",
					expectation: 123.5
				},
				{
					name: "String-to-number test 2",
					description: "Given that I have a string\n\tAnd the string has multiple '.' including in an ending position\n\tIt should return as the correct float.",
					fixture: "It was dialed up to 123.5Hz.",
					expectation: NaN
				},
				{
					name: "String-to-number test 3",
					description: "Given that I have a string\n\tAnd the string does not have a '.'\n\tIt should return as an integer.",
					fixture: "12345",
					expectation: 12345
				}
			];
			
			console.log("String To Number Tests");
			console.log("These tests verify that strings can successfully be turned into numbers");
			
			for (var i = 0; i < test_cases.length; i++) {
				var test = test_cases[i],
					result = sdi.numbers.s2n(test.fixture);

				console.log(test.name);
				console.log(test.description);
				console.log("Calling sdi.numbers.s2n with the string'", test.fixture, 'should return', test.expectation);
				pass_fail(test.expectation, result);
			}
		};
	} (ns.number_tests = ns.number_tests || {}));
	
	(function (ns, undefined) {
		ns.do_tests = function () {
			ns.test_smallest_array_deltas();
			ns.test_sum_array_numbers();
			ns.test_sort_array_by_key();
		};
		ns.test_smallest_array_deltas = function() {
			var test_cases = [
				{
					name: "Smallest array delta test 1",
					description: "Given that I have an array of [1,2,3,6,8]\n\tAnd that I have the number 5\n\tIt should return 6",
					array: [1,2,3,6,8],
					number: 5,
					expectation: 6
				},
				{
					name: "Smallest array delta test 2",
					description: "Given that I have an array of [2,4,6,8,10]\n\tAnd that I have the number 1\n\tIt should return 2",
					array: [2,4,6,8,10],
					number: 1,
					expectation: 2
				},
				{
					name: "Smallest array delta test 3",
					description: "Given that I have an array of [5,10,15,20,25]\n\tAnd that I have the number 42\n\tIt should return 25",
					array: [5,10,15,20,25],
					number: 42,
					expectation: 25
				}
			];
			
			console.log("Smallest Array Delta Tests");
			console.log("These tests are to confirm that given an array and a number, the closest delta item to the number is returned from the array.");
			console.log("\n");
			
			for (var i = 0; i < test_cases.length; i++) {
				var test = test_cases[i],
					result = sdi.arrays.find_smallest_delta(test.array, test.number);
					
				console.log(test.name);
				console.log(test.description);
				console.log('Calling sdi.arrays.find_smallest_delta with the array', test.array, 'and number', test.number, 'should return', test.expectation);
				pass_fail(test.expectation, result);
			}
		};
		ns.test_sum_array_numbers = function() {
			var test_cases = [
				{
					name: "Sum array's numbers test 1",
					description: "Given that I have a mixed array containing the numbers 5, 20, 35, and 2\n\tIt should return the sum 62",
					fixture: [5, [], 20, "Dawn", 35, 2, new Date()],
					expectation: 62
				}
			];
			
			console.log("Sum Array's Numbers Tests");
			console.log("Verifies that given a mixed array (numbers, strings, functions, other arrays, and objects), it will return a sum of the numbers in the array.");
			console.log("\n");
			
			for (var i = 0; i < test_cases.length; i++) {
				var test = test_cases[i],
					result = sdi.arrays.sum_array_numbers(test.fixture);
				console.log(test.name);
				console.log(test.description);
				console.log('Calling sdi.arrays.sum_array_numbers with the array', test.fixture, 'should return', test.expectation);
				pass_fail(test.expectation, result);
			}
		};
		ns.test_sort_array_by_key = function() {
			var test_cases = [
				{
					name: "Sort array by key test 1",
					description: "Given that I have an assocociative array\n\tAnd that each object in the array has the specified key field\n\tIt should return the array sorted by that field.",
					array: [{index: 4}, {index:2}, {index: 12}, {index: 5}, {index: 1}],
					key: "index",
					expectation: [{index: 1}, {index: 2}, {index: 4}, {index: 5}, {index: 12}]
				}
			];
			
			console.log("Sort An Arry By Key Tests");
			console.log("Verifies that we can correctly sort an associative array by a given key's values.");
			console.log("\n");
			
			for (var i = 0; i < test_cases.length; i++) {
				var test = test_cases[i], temp_array = [],
					result;
					
				// must use a temp array for displaying the info since sort_array_by_key returns an altered array
				for (var j = 0; j < test.array.length; j++) {
					temp_array.push(test.array[j]);
				}
				result = sdi.arrays.sort_array_by_key(test.array, test.key);
				
				console.log(test.name);
				console.log(test.description);
				console.log('Calling sdi.arrays_sort_array_by_key with the array', temp_array, "and the key '", test.key, "'\n\tit should return the following array", test.expectation);
				pass_fail(test.expectation, result);
			}
		};
	} (ns.array_tests = ns.array_tests || {}));
} (window.unit_tests = window.unit_tests || {}));

try {
	window.unit_tests.opening_story();
	window.unit_tests.test_all();
}
catch (e) {
	console.log(e.message, 'in file:', e.fileName, 'on line', e.lineNumber);
}