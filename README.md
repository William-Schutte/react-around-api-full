# Project 15: Around The U.S. Full-Stack
## William Schutte
## November 2020
Practicum by Yandex
-----

<a href="https://ws.p15.students.nomoreparties.site/" target="_blank">See this project here!</a>
(Server IP: 13.92.255.17)

Create a new user with the signup button or use a default login for convenience:  
**User:** test@mail.com  
**Pass:** 1234  

### Functionality
Add some cool pictures using the "+" button and customize your name and subtitle with the edit button! You can change your 
avatar by clicking on it and providing an image link. Like/unlike images with the heart icon. Click on any card to pull
up the full sized image. You may delete cards, but only those that you've added!

### Overview
This project represents work from the 12th through 15th projects for the web-dev course. These
projects build upon each other: first (12) setting up a server with Node.js, Express.js, and MongoDB, 
then (13) fleshing out the backend API to authorize requests, before (14) going back to touch up the 
frontend code by adding authentication and login/register pages, and finally (15) putting it all
together and deploying on a Microsoft Azure cloud server.

  **Project 15:** Backend user login/creation, middleware auth., remote Azure deployment
  **Project 14:** Frontend features on React-Around-Auth repo, login/register pages, user auth.
  **Project 13:** RESTful API desing, MongoDB setup, Basic authorization  
  **Project 12:** Initial setup of Express.js, file structure, and routing  

### Techniques
This server uses Express.js, a framework for Node.js, for routing and handling requests. 
Celebrate/Joi are used to screen request data before being sent to controllers.
Mongoose is used for models and MongoDB integration, creating and finding database docs.
Winston was incorporated for request and error logging. 
The front end is built with Create-React app.

### Technologies
* Express.js
* React.js
* Mongoose
* MongoDB
* Microsoft Azure
* Node.js
* Git/GitHub

# Revisions:
## Review 1, 11/2/2020
* App was not showing likes correctly when logging in (only when returning to page with JWT).
Invoked componentDidMount() in login method solved the issue.
* Fixed server response and frontend error handling to correctly display Celebrate/Joi
vaidation errors in console.
