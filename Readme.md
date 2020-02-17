# tkf-service

## Notes
- TKF Take Home Task

### Date
- 16th February 2020

### Location of deployed application
- UI: https://tkf.now.sh
- Service: https://tkf-service.herokuapp.com/tkf-service
- Service Documentation: https://tkf-service.herokuapp.com/tkf-service/doc/index.html

### Time spent
How much time did you spend on the assignment? Normally, this is expressed in hours

- I'll be fair here. It took me more than given timeframe. It took me around 8 - 9 hours. Explanation: I don't have much experience working with JWT token and neither with creating koa middlewares (although we use them as a team, I didn't have too many opportunities to work with them). I spent some time to figure out how to use them. So JWT and middleware took me most of the time. I also wanted to create the UI for it. Also only updating this Readme file takes at least 30 minutes :)

### Assumptions made
Use this section to tell us about any assumptions that you made when creating your solution.

- Users must be stored in a DB collection. The sequence counter should also be in the DB (for example a contract/customer ID counter?). Saving important data on the server is no good because, on redeploy, we reset the data. For this example, I consider it ok.
- The password must be encrypted when stored. So that's encrypted 2x sha256. Not the best algorithm though - there should be more protection in the real world.

### Shortcuts/Compromises made
If applicable. Did you do something that you feel could have been done better in a real-world application? Please
let us know.

- I would definitely add more tests (depending on the logic). Here I didn't have many tests to do (just the sequence counter doesn't make sense). In the real world, there should be more tests.
- Make a proper middleware for the private paths instead of adding the middleware to specific routes. Because given we have more paths, we might forget to secure some of the paths.
- Sorry for the bad UI ... especially the sequence page. Instead of investing the time in something more important like UI for sequence Page or, most important, feedback from the API in case of error messages/user inexistent or email validation, I made the login page nicer. That's because, since it was an extra task for the UI, I thought I could use build something that looks more approachable. But in the real world, there should be both done properly :).

### Stretch goals attempted
If applicable, use this area to tell us what stretch goals you attempted. What went well? What do you wish you
could have done better? If you didn't attempt any of the stretch goals, feel free to let us know why.

- I built a NextJS application for the UI. There is missing a lot of functionality but in the given time, I couldn't make more of it. The login page could be more friendly (in terms of error messages) while the sequence page could just be better. There is some functionality though that was extra - going directly to the sequence page, it will redirect to the authentication page - because accessing the sequence page, is going to validate the token. I also think that the login page looks cute :).
- Added access to Mongo Cloud
- UI is deployed using NOW from Zeit. Service is deployed in Heroku. MongoDB is in Mongo Atlas.
- The password is hashed with sha256 2 times before sending it to the server. It's not the best algorithm but good enough for this task :).
- Added ApiDoc for the API https://tkf-service.herokuapp.com/tkf-service/doc/index.html
- both projects have eslint configuration
- there are some basic tests for user functionality.
- There is automatically redirection between pages (coming at https://tkf.now.sh it will redirect to /auth. Creating new user / logging in, you will be redirected to /sequence. Deleting the token (or having an invalid one on the sequence page), you will be redirected to authentication)
- Cannot create the same user 2 times.
- I would've loved to give a try to OAuth using GitHub / Facebook etc. But I never did that and it would've taken me more time than already took.

### Instructions to run assignment locally
BOTH: yarn install

TKF UI: yarn dev
TKF Service: yarn start

### What did you not include in your solution that you want us to know about?
Were you short on time and not able to include something that you want us to know
about? Please list it here so that we know that you considered it.
- OAuth authentication

### Other information about your submission that you feel it's important that we know if applicable.
- I didn't try CURLing my application. What I did try was postman and the UI I made :)

### Your feedback on this technical challenge
Have feedback for how we could make this assignment better? Please let us know.
- A very nice challenge. I like the fact that I had to work deeper with some important things like authentication token and that it's up to the developer what he wants to use and do (I like the given flexibility). I am sad about not being able to implement the OAuth in the given time. But it's definitely something I will try.
- The task description is quite good. It seems very friendly too (that shows how friendly the atmosphere in the team is).
