# Game-UP

#### Created by Matthew Shin, June 2019

Game-UP is a web application for video game enthusiasts to get information on any game and stay up to date with recent gaming news. The frontend was built using React and the backend was built using Ruby on Rails. Any user is able to go on the website to search for video games by title. Upon creating an account, they are able to make personalized lists of video games, such as "favorites" or "wants". The application also implements Google OAuth for individual user verification. All of the video game data is pulled from the IGDB API.

![Game-UP Demo](Game-UP.gif)

To see the full application in action go to https://game-up-app.herokuapp.com/

## Setup
For use in a local environment, must setup both the frontend and the backend. The frontend can be cloned from this repository and the backend from [here](https://github.com/mshin1995/game-up-backend). You will need to use PostgreSQL for the database.

### Rails(Backend)
From the root directory use Bundler to install Ruby gems:
```
bundle install
```
Create the PostgreSQL database once that is done:
```
rails db:create
rails db:migrate
```
Start the server:
```
rails s
```

### React(Frontend)
To run locally, you must first go into the index.js file within src/constants. From there, for const USER and LIST, https://game-up-backend.herokuapp.com should be replaced with http://localhost:3000 or whatever localhost URL that the backend is running on. For example, export const USER = "https://game-up-backend.herokuapp.com/users" should be changed to "http://localhost:3000/users".

Then install npm packages:
```
npm install
```
Once that is done, start the server:
```
npm start
```

## Functionality
Users can visit the site and search for more information on any video game they want without having to create an account. Clicking on a news article will redirect them to the actual article. Clicking on a game will redirect them to that specific game's page with all of its information, such as rating, summary, and screenshots.

Users that want to create an account can do so by logging in through Google. Logging in saves individual users to the database in the backend. This also allows users to navigate to "My Lists" on the side bar menu and create personalized lists that they can add/remove video games from.

## Potential Issues
All of the video game data that this site uses comes from the IGDB API. With a free account, the IGDB API sets a limit of 10,000 requests. If there is a lot of traffic for this application, it may reach that limit and prevent it from rendering the data. If this happens to any users, feel free to contact me, so that I can aquire a new key.  

##### Thanks to [IGDB](https://api.igdb.com/) for providing the data to build this application and to https://github.com/Rob--W/cors-anywhere for providing a proxy to bypass issuses with CORS
