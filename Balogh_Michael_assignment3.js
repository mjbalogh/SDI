/*
	Project 3
	Scalable Data Infrastructures
	Author: Michael Balogh
	Date: 04/18/2012
	Note: New story about job search
*/

// define namespace, $, and protect undefined
(function(ns, $, undefined){
	// private
	// var jsonData = $.parse(json);
	var getIndexByName = function (array, name) {
		var len = array.length;
		for (var i = 0; i < len; i++) {
			var obj = array[i];
			if (undefined !== obj.name && name.toUpperCase() === obj.name.toUpperCase()) return i;
		}
		return -1;
	};

	// public
	
	// ENUMS
	ns.PAY_TYPE = Object.freeze({
		hourly: 2080,
		weekly: 52,
		monthly: 12,
		annual: 1
	});
	
	ns.Company = function (name, recruiter) {
		if (undefined === name || undefined === recruiter) return undefined;
		// private
		var name = name;
		var recruiter = recruiter;
		var positions = [];
		
		// public
		return {
			getName: function () { return this.name; },
			getRecruiter: function () { return this.recruiter; },
			getPositions: function () { return this.positions; },
			setRecruiter: function (recruiter) { this.recruiter = recruiter; },
			addPosition: function (position, location, salary) {
				if (undefined === name || undefined === location) return -1;
				var temp = {
					name: position,
					location: location,
					salary: salary || undefined,
					have_applied: {},
					interview: []
				};
				positions.push(temp);
			},
			applyForPosition: function (position, cover_letter, resume, application_form) {
				var n = getIndexByName(positions, position), applied = positions[n].have_applied;
				if (undefined === position || position === '' || -1 === n) return false;
				
				positions[n].have_applied.cover_letter = cover_letter || false;
				positions[n].have_applied.resume = resume || false;
				positions[n].have_applied.application_form = application_form || false;
				return (positions[n].have_applied !== {});
			},
			addInterview: function (position, date, time, interviewer) {
				var n = getIndexByName(this.positions, position),
					interview;
				if (undefined === position || undefined === date || undefined === time || undefined === interviewer) return;
				interview = {
					date: date,
					time: time,
					interviewer: interviewer
				};
				positions[n].interviews.push(interview);
			},
			setSalary: function (position, salary, is_hourly) {
				var i = getIndexByName(positions, position),
					pos = positions[i];
					if (!is_hourly) {
						
					}
			}
		};
	};
	ns.Person = function (name) {
		if (undefined === name || '' === name) return undefined;
		
		// private
		var name = name;
		var companies = [];
		
		return {
			getName: function () { return name; },
			getCompanies: function () { return this.companies; },
			loadCompanies: function (data) {
				var jsond = $.parse(data), count = jsond.companies.length;
				for (var i = 0; i < count; i++) {
					var jcomp = jsond.companies[i],
						comp = ns.Company(jcomp.company_name, jcomp.recruiter),
						jclen = jcomp.positions.length;
					if (jclen > 0) {
						for (var j = 0; j < jclen; j++) {
							var position = jcomp.positions[j], ilen = position.interviews.length;
							comp.addPosition(position.name, position.location, position.salary);
							if (position.have_applied !== {}) {
								comp.applyForPosition(position.name, position.have_applied.cover_letter,
									position.have_applied.resume, position.have_applied.application_form);
							}
							
							if (ilen > 0) {
								for (var k = 0; k < ilen; k++) {
									var int = position.interviews[k];
									comp.addInterview(position.name, int.date, int.time, int.interviewer);
								}
							}
						}
					}
				}
			},
		};
	};
} (window.sdi = window.sdi || {}, JSON));

try {
	var person = sdi.Person("Michael Balogh");
	person.loadCompanies(jsonc);
}
catch (e) {
	console.log(e.message, "in file:", e.fileName, "on line:", e.lineNumber);
}