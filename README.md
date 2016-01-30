# CodingBox.IO
Open-Source Full-Stack Solution For React/Redux Isomorphic Applications

## Introduction
I created CodingBox.IO as a boilerplate for quickly creating startup prototypes. It's based on popular [MEAN.JS](http://meanjs.org/) framework but instead of Angular's stack, it uses ReactJS's stack and written completely in ES6.

## Before You Begin
Before you begin we recommend you read about the basic building blocks that assemble a CodingBox.IO application:

* MongoDB - Go through [MongoDB Official Website](http://mongodb.org/) and proceed to their [Official Manual](http://docs.mongodb.org/manual/), which should help you understand NoSQL and MongoDB better.
* Express - The best way to understand express is through its [Official Website](http://expressjs.com/), which has a [Getting Started](http://expressjs.com/starter/installing.html) guide, as well as an [ExpressJS Guide](http://expressjs.com/guide/error-handling.html) guide for general express topics. You can also go through this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.
* ReactJS - ReactJS's [Official Website](http://facebook.github.io/react/) is a great starting point. You can also use [Pete Hunt's Guide](https://github.com/petehunt/react-howto), and the [Egghead Videos](https://egghead.io/).
* Redux - Go through [Official Documentation](http://redux.js.org/). Also, [Egghead Videos by Dan Abramov, creator of Redux](https://egghead.io/series/getting-started-with-redux) are really awesome to begin with.
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:

* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).

* Gulp - You may use Gulp for Live Reload, Linting, and SASS or LESS.

```bash
$ npm install gulp -g
```

## Downloading CodingBox.IO
There are several ways you can get the CodingBox.IO boilerplate:

### Cloning The GitHub Repository
The recommended way to get CodingBox.IO is to use git to directly clone the CodingBox.IO repository:

```bash
$ git clone https://github.com/viatsko/codingbox.git codingbox
```

This will clone the latest version of the CodingBox.IO repository to a **codingbox** folder.

### Downloading The Repository Zip File
Another way to use the CodingBox.IO boilerplate is to download a zip copy from the [master branch on GitHub](https://github.com/viatsko/codingbox/archive/master.zip). You can also do this using `wget` command:

```bash
$ wget https://github.com/viatsko/codingbox/archive/master.zip -O codingbox.zip; unzip codingbox.zip; rm codingbox.zip
```

Don't forget to rename **codingbox-master** after your project name.

## Quick Install
Once you've downloaded the boilerplate and installed all the prerequisites, you're just a few steps away from starting to develop your CodingBox.IO application.

The first thing you should do is install the Node.js dependencies. The boilerplate comes pre-bundled with a package.json file that contains the list of modules you need to start your application. To learn more about the modules installed visit the NPM & Package.json section.

To install Node.js dependencies you're going to use npm again. In the application folder run this in the command-line:

```bash
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* Finally, when the install process is over, npm will initiate a bower install command to install all the front-end modules needed for the application

## Running Your Application
After the install process is over, you'll be able to run your application using Gulp, just run grunt default task:

```
$ gulp
```

Your application should run on port 3000 with the *development* environment configuration, so in your browser just go to [http://localhost:3000](http://localhost:3000)

That's it! Your application should be running. To proceed with your development, check the other sections in this documentation.
If you encounter any problems, try the Troubleshooting section.

* explore `config/env/development.js` for development environment configuration options

### Running in Production mode
To run your application with *production* environment configuration, execute gulp as follows:

```bash
$ gulp prod
```

* explore `config/env/production.js` for production environment configuration options

### Running with User Seed
To have default account(s) seeded at runtime:

In Development:
```bash
MONGO_SEED=true gulp
```
It will try to seed the users 'user' and 'admin'. If one of the user already exists, it will display an error message on the console. Just grab the passwords from the console.

In Production:
```bash
MONGO_SEED=true gulp prod
```
This will seed the admin user one time if the user does not already exist. You have to copy the password from the console and save it.

### Running with TLS (SSL)
Application will start by default with secure configuration (SSL mode) turned on and listen on port 8443.
To run your application in a secure manner you'll need to use OpenSSL and generate a set of self-signed certificates. Unix-based users can use the following command:

```bash
$ sh ./scripts/generate-ssl-certs.sh
```

Windows users can follow instructions found [here](http://www.websense.com/support/article/kbarticle/How-to-use-OpenSSL-and-Microsoft-Certification-Authority).
After you've generated the key and certificate, place them in the *config/sslcerts* folder.

Finally, execute grunt's prod task `gulp prod`
* enable/disable SSL mode in production environment change the `secure` option in `config/env/production.js`
