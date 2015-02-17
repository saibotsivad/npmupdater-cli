#!/usr/bin/env node

var Promise = require('promise')
var path = require('path')
var npm = require('npm')
var npmupdater = require('npmupdater')
var ownedModules = require('npm-owned-modules')

var arg1 = process.argv[2]
var arg2 = process.argv[3]

var module
var json

if (isJson(arg1)) {
	json = require(path.resolve(arg1))
} else if (isJson(arg2)) {
	json = require(path.resolve(arg2))
}

function isJson(string) {
	return string && string.toLowerCase().indexOf('.json') === string.length - 5
}

var username = new Promise(function(resolve, reject) {
	console.log('Checking updates for user:')
	npm.load({}, function(err) {
		if (err) {
			reject(err)
		} else {
			// the `whoami` method prints out the username, no matter what you try >:-|
			npm.whoami(function(err, username) {
				if (err) {
					reject(err)
				} else {
					resolve(username)
				}
			})
		}
	})
})

var modulesPromise = new Promise(function(resolve, reject) {
	if (arg1 === '--all' || arg2 === '--all') {
		username.then(ownedModules).then(function(modules) {
			resolve(modules)
		})
	} else if (arg1 && !isJson(arg1)) {
		resolve([ arg1 ])
	} else if (arg2 && !isJson(arg2)) {
		resolve([ arg2 ])
	}
})

modulesPromise.then(function(modules) {
	modules.forEach(function(module) {
		npmupdater({
			module: module,
			auth: json
		}, function(err, success) {
			if (err) {
				console.log('Error checking/updating ' + module, err)
			} else {
				if (success.push) {
					console.log('Pushed to npm: ' + module + '@' + success.version)
				} else {
					console.log('No update required: ' + module + '@' + success.version)
				}
			}
		})
	})
}, function(err) {
	console.log('Error getting modules:', err)
})
