# Group Plan -

An app that lets you search, add, categorize, and share locations to determine whether the location is accessible to persons with physical disabilities.

Requirements:
users can see all pinned locations within a 5 km radius of downtown Toronto on app load
users can search a location by name or address and select it to view rating/categories
users should be able to register an account and login
users can pin new locations and provide rating/categories on accessibility (authenticated)
users can edit/delete pins

/_ stretch _/
users can filter search results
users can add locations to favourites
users can share a link to a business
admins have data visualization on pins added over a period
admins have data visualization on % of places that are deemed accessible vs. not

# USER/ADMIN STORIES

- As a user... ROLE
- I want to... GOAL
- Because... BENEFIT

### users can see all pinned locations within a 5 km radius of downtown Toronto on app load (stretch: radius based off of user location - see stretch)

As a user, I want to view all the locations that have been rated on accessibility in my area because that my point of interest to start.

### users can search a location by name or address and select it to view rating/categories

As a user, I want to see if a location has been pinned by searching its name or address because I want to see if it has been rated by other users before.
As a user, I want to view the rating and categories for a location that has been pinned because I want to know how accessible it is.

### users should be able to register an account and login

As a user, I want to be able to create an account to be able to create new pins and edit/delete previous submissions.

### users can pin new locations and provide rating/categories on accessibility (authenticated)

As a user, I want to pin new locations (create), rate it and select categories for other users to view because it will allow other users to determine more accessible locations

### users can provide rating/categories on accessibility to an existing pin (authenticated)

As a user, I want to rate it and select categories for other users to view because it will allow other users to determine more accessible locations

### users can edit/delete pins

As a user, I want to be able to make changes to a submitted pin or delete it because people make mistakes and they should be able to make flexible changes.

/_ stretch _/

### pinned locations loaded dynamically with user's location

As a user, I want to be able to see pinned locations near me as soon as the app loads

### uses can add locations to favourites

As a user, I want to save pinned/favourited locations for future reference

### users can share a link to a business

As a user, I want to be able to share a location's link that will display its ratings and details within the app

### admins can create, edit or delete pins

As an administrator, I can create, edit or delete pins from

### admins have data visualization on pins added over a period

As an administrator, I can view charts to highlight how many pinned locations have been added over a period because data is the oil of the internet and we gotta get that \\\\$\$

### admins have data visualization on % of places that are deemed accessible vs. not

As an administrator, I can view charts to highlight how many pinned locations have been deemed accessible or not over a period because data is the oil of the internet and we gotta get that \\\\$\$

# FEATURES

- Single Page App

## MVP: Minimum Viable Product

- user login/registration => form
- search pins => debounce search form, google api
- add pins => add pin from search

## Deployment: Heroku

# ERD

!["ERD"]()

# WIREFRAMES

- Sketch a wireframe with a prototyping tool like Figma
- A sketch of what the app will work like with box layout

# DATABASE - PostgreSQL / Sequelize(?)

- Define what data you need - users, locations, categories, ratings, favourites,

- Build an ERD (with draw.io) - look at entity relationships, PKs (id), FKs (user_id), table names plural

# ROUTES

- follow REST:
  HTTP method | URL pattern | Use
  GET | /pins | show all pins
  GET | /pins/new | show create new pin form  
  POST | /pins | create new pin
  GET | /pins/:id | show a pinned location/details
  DELETE | /locations/:id | delete a pin

Server-side
GET /pins get pins
POST /pins create a new pin
UPDATE /pins/:id update pin (user of that pin)
DELETE /pins delete pin (admin)

POST /login authenticate user
POST /register register user

# STACK CHOICE

- React, Express, ORM - Sequelize (?)

# SINGLE PAGE VS MULTI-PAGE APP

- SPA: HTML generated dynamically by JS on the client, AJX requests, no page reload
- MPA: EJS, sends response as full HTML, page reload

# DIVIDING TASKS

- Vertical: break into features, priortize features, each dev build a feature full stack
- Horizontal: break in tech domains, dev responsible for an entire domain, domains could be ui, api (routes), db

# COMMUNICATION - TEAMWORK

- be willing to let some things go
- give feedback kindly
- do what you say you'll do
- Trello: project management tool
- Slack: communication

# PROJECT WORKFLOW

- NEVER CODE ON MASTER
- Database setup:
  psql -U vagrant -d template1
  CREATE ROLE labber WITH LOGIN password 'labber';
  CREATE DATABASE midterm OWNER labber;
- Git Repo setup:
  fork and clone template
  change env. file: change database name to what you call yours, leave labber user
  npm install
  npm rebuild node sass
  npm run db:reset - might have to do a few times during project to reset db
  npm run local (for nodemon - runs on port 8080)
- PUBLIC FOLDER - static assets
- ROUTES - user (/api/users) and widget (/widgets/routes) routes
- Buld a dbHelpers.js file to store functions for db access
- To test POST requests.. could use Insomnia, Postman or curl

# GIT BRANCH

- git checkout -b feature/setup - or whatever you want to call the branch
- when ready to merge to master:
  git checkout master
  git pull
  git merge feature/setup
