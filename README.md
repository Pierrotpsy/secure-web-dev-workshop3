# Workshops 3-4-5

Third, fourth and fifth Secure Web Development workshops.

### Description

The goal was to learn the basics of MongoDB and how to use it with Javascript using the same `.json` file as in workshop 1 as source data.

### How to execute

The code can simply be executed by running these commands from the project repository : 
```bash
npm install

npm run start
```

The code can then be tested using a browser and the correct URLs or by using an API testing tool such as Postman or Insomnia. All of the tests done were made using Postman.

### Contents

The `.env` file contains the MongoDB credentials in this format :
```json
MONGO_URI=mongodb+srv://<username>:<password>@<server name>/?retryWrites=true&w=majority
```

It also contains the JWT Secret used to generate secure JSON Web Tokens.
