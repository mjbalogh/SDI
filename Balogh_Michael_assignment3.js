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
	var jsonData = $.parse(json);
	var getIndexByName = function (array, name) {
		var len = array.length;
		for (var i = 0; i < len; i++) {
			var obj = array[i];
			if (undefined !== obj.name && name.toUpperCase() === obj.name.toUpperCase()) return i;
		}
		return -1;
	};

	// public
	ns.company = function (name, recruiter, positions) {
		if (undefined === name || undefined === recruiter) return undefined;
		this.name = name;
		this.recruiter = recruiter;
		this.positions = positions || [];
		this.getName = function () { return this.name; };
		this.getRecruiter = function () { return this.recruiter; };
		this.getPositions = function () { return this.positions; };
		this.setRecruiter = function (recruiter) {
			this.recruiter = name;
		};
		this.addPosition = function (name, location, salary) {
			if (undefined === name || undefined === location) return -1;
			var temp = {
				name: name,
				location: location,
				salary: salary || undefined,
				have_applied = {},
				interview = []
			};
			this.positions.push(temp);
		};
		this.applyForPosition = function (position, cover_letter, resume, application_form) {
			var n = getIndexByName(this.positions, position),
				apply = {};
			if (undefined === position || position === '') return;
			if (-1 === n) return;
			
			apply = {
				cover_letter: cover_letter || false,
				resume: resume || false;
				application_form: application_form || false
			};
			this.positions[n].has_applied.push(apply);
		};
		this.addInterview = function (position, date, time, interviewer) {
			var n = getIndexByName(this.positions, position),
				interview = {};
			if (undefined === position || undefined === date || undefined === time || undefined === interviewer) return;
			interview = {
				date: date,
				time: time,
				interviewer: interviewer
			};
			this.positions[n].interviews.push(interview);
		};
		return {
			getName: this.getName,
			getRecruiter: this.getRecruiter,
			getPositions: this.getPositions,
			setRecruiter: this.setRecruiter,
			addPosition: this.addPosition,
			applyForPosition: this.applyForPosition,
			addInterview: this.addInterview
		};
	};
	ns.Person = function (name) {
		if (undefined === name || '' === name) return undefined;
		
	};
	
} (window.sdi = window.sdi || {}, JSON));