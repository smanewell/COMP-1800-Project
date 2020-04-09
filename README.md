## Setup

1. Add `.env` file to the main project folder
2. Inside your `.env` file, paste this line `SESSION_SECRET=secret`
3. Save changes
4. Install Modules
   - `npm init`
   - `npm i express ejs`
   - `npm i --save-dev nodemon dotenv`
   - `npm i bcrypt`
   - `npm i passport passport-local express-session express-flash`

## Run

1. `npm run devStart`
2. Go to `localhost:3000` in your browser

## Detailed Explanation

1. `npm init` 

2. `npm i express ejs`

3. `npm --save-dev nodemon dotenv`

4. Create `.env` file 

5. Create `.gitignore` file

6. Inside the `package.json` file, create:

   `"devStart": "nodemon server.js"` 

   as the value for the `"scripts"` key.

7. Create your server file and name it `server.js`

8. Inside `server.js` we want to import `express` and set up basic a route to our homepage, which will render a file named `index.ejs` 

9. Create a folder named **views** and then create that `index.ejs` file inside of it.

10. Before we continue, we want to make sure that we tell our server that we are using `ejs` syntax. We do this by setting the view engine to `ejs` (which is a javascript-embedded html template). For example:

    ```javascript
    const express = require('express');
    const app = express();
    
    // 10.	set view engine
    app.set('view-engine', 'ejs');
    
    app.get('/',(req,res) => {
        res.render('index.ejs');
    });
    
    app.listen(3000);
    ```

11. Create routes we need for our **login page ** and our **register page**. So, inside views create `register.ejs` and `login.ejs`

12. Inside `server.js` create a route for each page.

13. ```js
    const express = require('express');
    const app = express();
    
    app.set('view-engine', 'ejs');
    
    app.get('/',(req,res) => {
        res.render('index.ejs');
    });
    
    // 12. add route
    app.get('/register',(req,res) => {
        res.render('register.ejs');
    });
    
    // 12. add route
    app.get('/login',(req,res) => {
        res.render('login.ejs');
    });
    
    app.listen(3000);
    ```

14. Create the form label/input for name, email, and password in `register.ejs` .Make sure that the attributes `for`,  `id`, and `name` all have the same value. Also, make sure to include a `required` attribute in every `input` tag

15. Repeat step 14 to create a `login.ejs` file, except refactor the code to match the requirements for **login**

16. Include a `href`'s in both pages that will point to each other

17. Most importantly, our form's `method` attribute should have the value `POST`:

    #### **`register.ejs`**

    ```ejs
    <h1>Register</h1>
    <form action="/register" method="POST">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
      </div>
      <button type="submit">Register</button>
    </form> 
    <a href="/login">Login</a>
    ```

    #### **`login.ejs`**

    ```ejs
    <h1>Login</h1>
    <form action="/login" method="POST">
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <a href="/register">Register</a>
    ```

18. Go back into our `server.js` file and implement our post methods for `login.ejs` and `register.ejs`

19. We want to include this line of code: 

    ```js
    app.use(express.urlencoded({extended: false}))
    ```

    This tells our application that we want to access the forms we created inside `register.ejs` and `login.ejs` by using our request variable: `req` inside our post methods.

20. Our post methods would be as follows:

    ```js
    const express = require('express');
    const app = express();
    
    app.set('view-engine', 'ejs');
    // 19. set extended as false 
    app.use(express.urlencoded({ extended: false }));
    
    app.get('/',(req, res) => {
      res.render('index.ejs');
    });
    
    app.get('/login', (req, res) => {
      res.render('login.ejs');
    });
    
    app.post('/login',(req,res) => {  
    });
    
    app.get('/register',(req, res) => {
      res.render('register.ejs');
    });
    
    app.post('/register',(req,res) => {   
    });
    
    app.listen(3000);
    ```

21. Create an array to hold users for simplicity

22. When our users register and create a password, we want to make sure that we can hash it and compare it against other hashed passwords. We will download the `bcrypt` library and import/initialize it inside our `server.js` file.

    

    `npm i bcrypt`

    ​	

23. ```js
    const express = require('express');
    const app = express();
    const bcrypt = require('bcrypt');
    // 21. array to hold our users
    const users = [];
    
    app.set('view-engine', 'ejs');
    // 19. set extended as false 
    app.use(express.urlencoded({ extended: false }));
    
    app.get('/',(req, res) => {
      res.render('index.ejs');
    });
    
    app.get('/login', (req, res) => {
      res.render('login.ejs');
    });
    
    app.post('/login',(req,res) => {  
    });
    
    app.get('/register',(req, res) => {
      res.render('register.ejs');
    });
    
    app.post('/register', checkNotAuthenticated, async (req, res) => {
      try {
          /* create a hashed password. The value 10 refers to the number of times we want to generate a hash */
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        // add user to users array
        users.push({
          id: Date.now().toString(),
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
        });
        // 
        res.redirect('/login');
      } catch {
          /* 
        if register fails, redirect back to '/register' 	*/
        res.redirect('/register');
      }
    });
    
    app.listen(3000);
    
    ```

24. Now, let's say we have added a user to our mock database (our local array) AND we want to be able to **persist the user across all of our requests.** One way we can do this is by using a library called  **Passport.js**

25. Install Passport.js

    ```bash
    npm i passport
    ```

26. Install `passport-local ` which just allows us to use **local** usernames and passwords to login

    ```bash
    npm i passport-local
    ```

27. Next, in order to store and persist our users information across all of our pages we need to install `session` for express

    ```bash
    npm i express-session
    ```

28. Finally, if we want to display error messages to our users if their login attempt fails we can download `flash` for express. 

    ```bash
    npm i express-flash
    ```

29. Now, it's time to set up passport with our login. We can start writing our code for this inside our `server.js` file or we could make a new file to make things more organized. 

    In this example, we will create a new file called `passport-config.js` to store all of our passport code. This file is stored in our main folder alongside `server.js`, `package.json`, etc.

    

30. Inside this file, create a function called `initialize` and require it inside our `server.js` file

    #### **`passport-config.js`**

    ```js
    function initialize(passport){
    }
    ```

    **`server.js`**

    ```js
    const express = require('express');
    const app = express();
    const bcrypt = require('bcrypt');
    // import
    const passport = require('passport');
    
    // link to passport-config.js
    const initializePassport = require('./passport-config');
    initializePassport(passport);
    
    const users = [];
    
    app.set('view-engine', 'ejs');
    app.use(express.urlencoded({ extended: false }));
    
    app.get('/',(req, res) => {
      res.render('index.ejs');
    });
    
    app.get('/login', (req, res) => {
      res.render('login.ejs');
    });
    
    app.post('/login',(req,res) => {  
    });
    
    app.get('/register',(req, res) => {
      res.render('register.ejs');
    });
    
    app.post('/register', checkNotAuthenticated, async (req, res) => {
      try {
    
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        users.push({
          id: Date.now().toString(),
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
        });
        res.redirect('/login');
      } catch {
    
        res.redirect('/register');
      }
    });
    
    app.listen(3000);
    ```

31. We're using  the `local` version of passport in this example

    **`passport-config.js`**

    ```js
    const LocalStrategy = require('passport-local').Strategy
    
    function initialize(passport){
        
    }
    ```

32. Now we want to **Use** this local strategy:

    ```js
    const LocalStrategy = require('passport-local').Strategy
    
    function initialize(passport){
        passport.use(new LocalStrategy());
    }
    ```

33. We need to pass options into the `new LocalStrategy()` instance in order to get info from our `.ejs` files. The info is the input tags that have the `name `attributes with the values `email` and `password` . We pass in the option `usernameField` to identify our `email` input, since the input's name attribute is equal to `email`. We can pass in the option `passwordField` to identify our `password` input, but since it's value is equal to `password` it already shares the same name as the default value that `passwordField` checks for. So we can leave out this option.

    ```js
    const LocalStrategy = require('passport-local').Strategy
    
    function initialize(passport){
        passport.use(new LocalStrategy({usernameField: 'email'}));
    }
    ```

    

34. Next, we need to pass a second variable into our `LocalStrategy` instance which is going to be the function that this is going to authenticate our user. We'll name it `authenticateUser`

    ```js
    const LocalStrategy = require('passport-local').Strategy
    
    function initialize(passport){
        /* `done` represents a function that will be 
        called when we are done authenticating our user
        */
        const authenticateUser = async (email, password, done) => {}
        
        passport.use(new LocalStrategy({usernameField: 'email'}),authenticateUser);
    
    }
    ```

35. The next thing we need to do is set up passport to serialize and deserialize our users. Inside of the `serializeUser` call we are going to have parameters:  `user` and the `done` function, which will serialize our user to store inside it in the session. For our call to `deserializeUser`  we take in:  `id` and `done` because we're going to serialize our user as a single `id`.

    ```js
    const LocalStrategy = require('passport-local').Strategy
    
    function initialize(passport){
        const authenticateUser = async (email, password, done) => { }
        
        passport.use(new LocalStrategy({usernameField: 'email'}),authenticateUser);
        
        passport.serializeUser((user,done) => { });
        passport.deserializeUser((id,done) => { });
    
    }
    ```

36. 
