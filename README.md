# Project Setup Documentation

## What Has Been Done So Far

- Initialized an Express.js backend project.
- Set up the main application entry point in `app.js`.
- Configured environment variables in `config/env.js`.
- Established MongoDB connection logic in `database/mongodb.js`.
- Created middleware for error handling in `middlewares/error.middleware.js`.
- Defined models for `User` and `Subscription` in `model/`.
- Implemented routing for users, authentication, and subscriptions in `routes/`.
- Added 404 error handling and global error middleware.
- Installed essential packages: `express`, `jsonwebtoken`, `bcryptjs`.

## Project Structure

```
app.js
package.json
README.md
config/
  env.js
database/
  mongodb.js
middlewares/
  error.middleware.js
model/
  subscription.model.js
  user.model.js
routes/
  auth.route.js
  subscription.route.js
  user.route.js
```

## How the Project Was Configured

1. **Initialized Node.js Project**
   - Ran `npm init` to create `package.json`.
2. **Installed Dependencies**
   - Installed Express for server setup: `npm install express`
   - Installed JWT and bcrypt for authentication: `npm install jsonwebtoken bcryptjs`
3. **Environment Variables**
   - Created `config/env.js` to manage environment variables like `PORT`.
4. **Database Connection**
   - Set up MongoDB connection logic in `database/mongodb.js`.
5. **Middleware**
   - Added error handling middleware in `middlewares/error.middleware.js`.
   - Configured Express to parse JSON requests using `express.json()`.
6. **Routing**
   - Created separate route files for users, authentication, and subscriptions.
   - Registered routes in `app.js` under `/api/v1/` namespace.
7. **Models**
   - Defined Mongoose models for `User` and `Subscription` in `model/`.
8. **Server Startup**
   - Server starts on the configured port and connects to MongoDB.

## How to Run

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```

---

This documentation summarizes the initial setup and configuration of the backend project.

npx express-generator --no-view --git ./
npm install --save-dev nodemon 
npm install dotenv
