# Project 12-15: Around The U.S. Back End
## William Schutte
## September 2020
Practicum by Yandex
-----

### Overview
This project represents work from the 12th, 13th, and 14th projects for the web-dev course. These
projects build upon each other, first setting up a server with Node.js and Express.js, then 
integrating with a MongoDB database. The server has a custom RESTful API connecting it to my
previous front-end React project (transcompiled w/ Create-React-App, Web-Pack, Babel).

  **Project 15:** Backend user login/creation, middleware auth., Azure cloud deployment
  **Project 14:** Frontend features on React-Around-Auth repo, login/register pages, user auth.
  **Project 13:** RESTful API desing, MongoDB setup, Basic authorization  
  **Project 12:** Initial setup of Express.js, file structure, and routing  

### Techniques
This server uses Express.js, launching on Local Port 3000.  
Mongoose used for models and MongoDB interactions.

### Technologies
* Mongoose
* MongoDB
* Express.js
* Node.js
* Git/GitHub

## Running the Project
`npm run start` — to launch the server.  
`npm run dev` — to launch the server with the hot reload feature.

## My best friends:
1. [Mongoose Documentation](https://mongoosejs.com/docs/guides.html)
1. [Express.JS Documentation](https://expressjs.com/en/5x/api.html)
1. [Node.JS Documentation](https://nodejs.org/api/)

# Revisions:

## Project 15: First Review: 11/2/20
* Altered centralized error handler to catch and properly label Celebrate errors
* Added Celebrate prescreening to createCard route

## Project 13: First Review: 9/21/20
* Added period to middle of URL regex to catch more invalid URLs
* Explicitly defined error handling in createCard and createUser functions
* Modified getUserById() function to return error if findById() returns null data
  * Note: When using Mongoose's findById() method, if the given ID param is of the 
    expected length, it will return null instead of an error

## Project 12: Fourth Review: 9/13/20
* Changed error response codes to 500 for file read errors in cards.js and users.js

## Project 12: Third Review: 9/11/20
* Addressed error handling for server-side file reading by changing promises in both cards.js and users.js, errors now print to user

## Project 12: Second Review: 9/10/20
* Fixed route files:
  * Removed extra null route handlers
  * Used fs promises for data reading
  * Added status 200 to all successful responses
  * Rewrote file paths using path.join correctly
  * Added error handling to promises that notifies users
  
## Project 12: First Review: 9/9/20
* Added "Resource not found" message to app.js to catch all errant urls
* Instead of importing JSON data with require(), used Node's fs module and readFile() method
