# Robinhood.JS

Robinhood API for Node.JS - Documentation coming soon

Node.JS Framework to view portfolio information with the private [Robinhood](https://www.robinhood.com/) API. Using this API is not encouraged, since it's not officially available and it has been reverse engineered.
See @Sanko's [Unofficial Documentation](https://github.com/sanko/Robinhood) for more information.

This is a synchronous version of [aurbano/robinhood-node](https://github.com/aurbano/robinhood-node). Most methods besides the initial login method are extension methods.

<!-- toc -->
  * [Features](#features)
  * [Installation](#installation)
  * [Usage](#usage)
  * [API](#api)


## Features
* Quote data
* Daily Fundamentals
* Daily, Weekly, Monthly Historicals

> Tested on the latest version of Node.

## Installation
```bash
$ npm install robinhood.js --save
```
## Usage

To authenticate, you must use a previously authenticated Robinhood api token:

### Robinhood API Auth Token
```js
//A previously authenticated Robinhood API auth token

var credentials = 'authToken'
```

```js
var robinhood = Robinhood.Login(credentials);
```

## API

Before using these methods, make sure you have initialized Robinhood using the snippet above.
