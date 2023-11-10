This is a simple Book Store API written using NodeJS, Express and MySQL.

`src` -> The src folder constains all the source code concerning the project and this will not include any kind of tests.

Lets take a look inside the `src` folder

 - `config` -> In this folder, anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up the connection to mongodb. One more example can be to the setting up of a logging library that can help make meaningful logs.

 - `routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it. 

 - `middlewares` -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc. 

 - `controllers` -> they are kind of the last middlewares as after them, we call our business layer to execute the budiness logic. In controllers, we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output. 

 - `repositories` -> this folder contains all the logic using which we interact with the DB by writing queries. All the raw queries or ODM queries will go here.

 - `services` -> contains the buiness logic and interacts with repositories for data from the database.

 - `utils` -> contains helper methods, error classes etc.

### Setup the project locally

 - Download this repository from github and open it in your favourite text editor. 
  
 - Go inside the folder path and execute the following command:
  ```
  npm install
  ```
 - In the root directory create a `.env` file and add the following env variables
    ```
        SERVER_PORT=<port number of your choice>
        DB_PASSWORD=<enter the db password here>
    ```
    ex: 
    ```
        SERVER_PORT=3000
        DB_PASSWORD=password
    ```

 - To run the server execute
 ```
 npm run start
 ```

### Testing the API

Use an API testing software like Postman to make the requests to the following endpoints:

- To get all the books, make a `get` request to ```/api/v1/books```

- To get details of a particular book, make a `get` request to ```/api/v1/books/<book_id>```

  Replace <book_id> with an actual id.
  
- To add a book, make a `post` request to ```/api/v1/books```
  
  Set the body of the request to JSON and pass a JSON object with title, author and summary keys (all 3 keys are required).

  Note: Title can be a maximum of 100 characters.
        Summary has to be a minimum of 200 characters and can be maximum of 500 characters.

  Ex: {
    "title": "hamlet",
    "author": "Shakespeare",
    "summary": "The ghost of the King of Denmark tells his son Hamlet to avenge his murder by killing the new king, Hamlet's uncle. Hamlet feigns madness, contemplates life and death, and seeks revenge. His uncle, fearing for his life, also devises plots to kill Hamlet"
  }

- To update a book, make a `patch` request to ```/api/v1/books/<book_id>```

  Replace <book_id> with an actual id.

  Set the body of the request to JSON and pass a JSON object with all the keys that need to be updated.

  Ex: {
    "author": "wordsmith"
  }
  
- To delete a book, make a `delete` request to ```/api/v1/books/<book_id>```

  Replace <book_id> with an actual id.

You can fork the postman collection named `Book Store API Dep` at the below linked workspace in order to test the API using Postman:
  ```
  https://www.postman.com/crimson-flare-891477/workspace/public-apis
  ```

### Deployment

The API has been deployed on an AWS EC2 running on Ubuntu. It is set-up using pm2 which acts as the process manager. 
The public IP of the EC2 is 
  ```
  13.200.55.255
  ```
and the application is running on port
  ```
  3000
  ```
Hence, all the API endpoints listed in the previous section can be accessed at 
  ```
  13.200.55.255:3000
  ```

Ex:
  ```
  http://13.200.55.255:3000/api/v1/books
  ```