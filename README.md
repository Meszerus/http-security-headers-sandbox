# HTTP Security Headers Sandbox

This app is a sandbox for demonstrating web security exploits, for which certain HTTP headers can help protect against.

## Installation

### Prerequisites

The following needs to be installed on your machine in order to run locally:

* **NodeJS**, version 14.
* **Yarn**.
* **Google Chrome**.

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

## Usage

The service can be ran with this command to experience the demonstrations of vulnerabilities/exploits:

`yarn start:naked`

Or, it can be ran with this command to experience the sites with the present security headers, but configured to be
the most permissive settings (and thus you will still see vulnerabilities):

`yarn start:permissive`

Or, it can be ran with this command to experience the demonstration of being protected against them:

`yarn start:secure`

### Content Security Policy

Information on this header can be found on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

#### Clickjacking



#### Cross-site scripting