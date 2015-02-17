# npmupdater-cli

![logo thingy](logo.png)

The command line version of the [npmupdater](https://www.npmjs.com/package/npmupdater) module.

## install

Install the normal way (probably need to use `sudo`):

	npm install -g npmupdater-cli

## using

You'll need to be logged in to npm from the command line. (Do this by running the command
`npm login`.)

## update one module

To update a single module, run `npmupdater MODULE`, e.g. for `my-sweet-module`, run the following:

	npmupdater my-sweet-module

## update all modules

To update all modules owned by your logged in user:

	npmupdater --all

## github rate limits

Because the updater checks with Github, and [Github rate-limits](https://developer.github.com/v3/#rate-limiting)
to 60 requests per hour for unauthenticated requests, you might find it handy to use authentication to
remove the rate limit.

The npmupdater uses the [github](https://www.npmjs.com/package/github) module, which uses one of the
following three auth objects:

	// basic login
	{
		type: "basic",
		username: username,
		password: password
	}
	// oauth2
	{
		type: "oauth",
		token: token
	}
	// oauth2 key/secret
	{
		type: "oauth",
		key: "clientID",
		secret: "clientSecret"
	}

To use one of these, pass in a JSON filename as one of the parameters when you use npmupdater. E.g., either
one of these will work:

	npmupdater --all file.json
	npmupdater my-module file.json
	npmupdater file.json my-module

(Remember that if the path to the JSON file has spaces, it needs to be escaped or quoted.)

The JSON object needs to be one of the above three objects.

## license

All documents and code in this repository are released under the [VOL](http://veryopenlicense.com).

<3
