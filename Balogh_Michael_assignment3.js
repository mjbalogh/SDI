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
	
	ns.getRandomBool = function () {
		return ((Math.floor(Math.random() * 2) === 1) ? true : false);
	};
	
	// classes
	ns.Company = function (name, recruiter) {
		if (undefined === name || undefined === recruiter) return undefined;
		// private
		var name = name;
		var recruiter = recruiter;
		var last_contact = undefined;
		var positions = [];
		
		// public
		return {
			name: name,
			getRecruiter: function () { return recruiter; },
			getPositions: function () { return positions; },
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
				return positions.length - 1;
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
			setSalary: function (position, salary, pay_type) {
				var i = getIndexByName(positions, position),
					pos = positions[i];
				if (typeof(pay_type) !== typeof(ns.PAY_TYPE)) return;
				pos.salary = Math.floor(salary * pay_type);	
			},
			getLastContact: function () {
				return new Date(last_contact);
			},
			setLastContact: function(date) {
				last_contact = date;
			}
		};
	};
	ns.Person = function (name) {
		if (undefined === name || '' === name) return undefined;
		
		// private
		var name = name,
			companies = [];
		
		return {
			getName: function () { return name; },
			getCompanies: function () { return companies; },
			loadCompanies: function (data) {
				var jsond = $.parse(data), count = jsond.companies.length, comp;
				for (var i = 0; i < count; i++) {
					var jcomp = jsond.companies[i],
						comp = ns.Company(jcomp.company_name, jcomp.recruiter),
						jclen = jcomp.positions.length;
						comp.setLastContact(jcomp.last_contact);
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
					companies.push(comp);
				}
			},
			addCompany: function (company) {
				if (undefined === company) return;
				companies.push(company);
				console.log('You have added', company.name, 'to your job list.');
			},
			contactCompany: function (company_name) {
				var i = getIndexByName(companies, company_name), comp = companies[i];
				comp.setLastContact(new Date().toUTCString());
				console.log('Updated last contact for', company_name, 'to:', comp.getLastContact().toDateString());
			}
		};
	};
} (window.sdi = window.sdi || {}, JSON));

try {
	var person = sdi.Person("Michael Balogh"), today = new Date(), companies, njcount = 0;
	console.log('Welcome,', person.getName());
	
	console.log('We will start with reviewing your previously entered jobs.');
	person.loadCompanies(jsonc);
	companies = person.getCompanies();
	for (var i = 0; i < companies.length; i++) {
		console.log('Reviewing stored jobs now...');
		var comp = companies[i], date = comp.getLastContact();
		if ((date.getDate() + 6) <= today.getDate()) {
			var choice = sdi.getRandomBool();
			console.log('You have not contacted', comp.name, 'in about a week. Would you like to contact',
				comp.getRecruiter(), 'now?');
			console.log('Choice:', choice);
			if (choice) {
				console.log('Calling', comp.getRecruiter(), 'now...');
				person.contactCompany(comp.name);
			}
		} else {
			console.log('You have contacted', comp.name, 'on', comp.getLastContact().toDateString(), ".\n",
				'Would you like to contact them again?');
			if (sdi.getRandomBool()) {
				console.log('Choice:', true);
				console.log('Calling', comp.getRecruiter(), 'now...');
				person.contactCompany(comp.name);
			} else {
				console.log('Good idea. You do not want to seem needy.');
			}
		}
	}
	console.log('Are there any other jobs that you would like to apply for?');
	do {
		var info = { 
				name: 'Company' + njcount, 
				recruiter: 'Recruiter' + njcount,
				position: 'Position' + njcount,
				location: 'Location' + njcount
			},
			company = sdi.Company(info.name, info.recruiter), application = {};
		console.log('Yes. I would like to apply for more jobs.');
		
		company.addPosition(info.position, info.location, (sdi.getRandomBool()) ? Math.floor(Math.random() * 100000) : 0);
		
		if (sdi.getRandomBool()) {
			application = {
				cover_letter: true,
				resume: true,
				application_form: false
			};
		} else {
			application = {
				cover_letter: false,
				resume: false,
				application_form: true
			};
		}
		company.applyForPosition(info.position, application.cover_letter, application.resume, application.application_form);
		person.addCompany(company);
		person.contactCompany(company.name);

		njcount++;
		console.log('Are there any other jobs that you would like to apply for?');
	} while (sdi.getRandomBool());
	console.log('No. I am done for the day.');
}
catch (e) {
	console.log(e.message, "in file:", e.fileName, "on line:", e.lineNumber);
}