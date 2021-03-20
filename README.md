# HTTP Security Headers Sandbox

This ExpressJS app is a sandbox for demonstrating web security exploits, for which certain HTTP headers can help protect against.

## Installation

### Prerequisites

The following needs to be installed on your machine in order to run locally:

* **NodeJS**, version 14.
* **Yarn**.
* **Google Chrome**, minimum version 88.

You must modify your hosts file (on Windows) or use a hosts switcher such as Gas Mask (on Mac) to
include the following entries:

```text
127.0.0.1		www.innocent.com
127.0.0.1		www.evil.com
```

### Installation

Before continuing, you must use the following command to install all dependencies:

`yarn install`

## Testing

Before using this app, ensure that all tests pass on your machine first, using the following command:

`yarn test`

This will run Jest unit tests and Nightwatch journey tests to verify the protections against exploit scenarios.

## General Usage

The service can be ran with this command to experience the demonstrations of vulnerabilities/exploits:

`yarn start:naked`

Or, it can be ran with this command to experience the sites with the present security headers, but configured to be
the most permissive settings (and thus you will still see vulnerabilities):

`yarn start:permissive`

Or, it can be ran with this command to experience the demonstration of being protected against them:

`yarn start:secure`

## Specific Usage: Content Security Policy

More information on this header can be found on:
* [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).
* [Scott Helme's blog](https://scotthelme.co.uk/tag/csp/).

### Clickjacking

### Cross-site scripting

## Specific Usage: Referrer Policy

More information on this header can be found on:
* [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy).

## Specific Usage: Powered By

Some frameworks (in this case, ExpressJS) will automatically set a value into the response header "x-powered-by" that
identify themselves. However, this exposure of which tech/framework you are using better clues in a malicious actor on
what kind of potential vulnerabilities to attempt exploiting.

Accessing `http://www.innocent.com/home` in Insecure/Permissive mode, you can see in your browser's Network tab that a
`x-powered-by` response header is present with the value `Express`.

Accessing `http://www.innocent.com/home` in Secure mode, you can see that the `x-powered-by` response header has been
unset entirely.