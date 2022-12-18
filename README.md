# Workshops 3-4-5

Third, fourth and fifth Secure Web Development workshops.

### Description

The goal was to create a simple API using Node.js and Express.js. This API needed to offer authentication and authorization to access data and use functionalities.

This goal was attained using this model : **Controller/API Layer -> Service -> Mode** for each class in the database.

As for libraries, only a few were used :
- Express
- Mongoose
- Bcrypt
- Passport
- Passport Local
- Passport JWT

In the end, the API can securely register and log in users. This generates a secure JWT which can then be used to access most routes, although a few of them are role protected. 

### How to execute

The code can simply be executed by running these commands from the project repository : 
```bash
npm install

npm run start
```

The code can then be tested using a browser and the correct URLs or by using an API testing tool such as Postman or Insomnia. All of the tests done were made using Postman.

Above each route in the controllers, there is a description of a test done using Postman.

The first thing to do is of course to register a user and to log in to obtain a valid JWT, which can then be used to access most routes, except those for which a specific role is needed. the **superAdmin** role can access every route though.

### Contents

The `.env` file contains the MongoDB credentials in this format :
```json
MONGO_URI=mongodb+srv://<username>:<password>@<server name>/?retryWrites=true&w=majority
```

It also contains the JWT Secret used to generate secure JSON Web Tokens.
