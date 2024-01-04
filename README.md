# Demo credit

This is a simple Node.js and Express.js demo application that allows users to login,signup ,as well as create,edit ,delete and share notes with other users

[POSTMAN API DOCS ](https://documenter.getpostman.com/view/20589483/2s9YsGgsPh)

[LIVE URL](https://speer-backend-assesment.cyclic.app/)

## Features

- User Signup: New users can sign up using their email and password.
- User Signin: Registered users can sign in using their credentials.
- Creat notes: Signed-in users can create a note that will be associated with their account
- Edit and delete notes: Signed-in users can edit and delete their previously created notes
- Get note/Get all notes: Signed-in users can get a single note and also get all notes associated with their acounts,even the one's shared with them by other users

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js and npm (Node Package Manager)
- MongoDb

## Setup

- Clone the repository:

- Navigate to the project directory:

- Install the dependencies:

- Configure the Database:

  create a `.env` file then copy the contents of `.env.sample` and replace the various variables with your own variables ,

- Run the Application in the development with `npm run dev`,to create a production build ,run the command ' `npm run build` ,to run unit test run `npm run test` to run in production mode run `npm start`

The app will be accessible at `http://localhost:3000`.

## API Endpoints

> note that all endoints except login and signup requires authentication token in the request header,examples are in the postman docs

- `POST /api/auth/signup`: Register a new user. Requires `email` and
  `password` in the request body,this end point returns the user details as well as a jwt token valid for 3 days.

- `POST /auth/signin`: Sign in a user. Requires `email` and `password` in the request body. and return a jwt token.

- `POST /api/notes`: This end point creates a new note and it requires `title` and `description` in the request body.

- `GET /api/notes`: This end point fetches all the notes associated with a users account .

- `GET /api/notes/:id`: This end point fetches a single note.

- `PUT /api/notes/:id`: This end point updates a single note and can take either/both `title` and `description` in the request body.

- `DELETE /api/notes/:id`: This end point deletes a single note

- `POST /api/notes/:id/share`: This end point shares a single note with a user it takes `recepient` in the request body ,which is the id of the user you want to share the note with.

- `GET /api/search?q=query`: This end point performs a string search on all the notes associated with a user's account ,and returns all the notes that contain the query string in either the title or description.

## Security Considerations

- **Authentication**: JWT (JSON Web Tokens) is used to protect all wallet enpoints please pass the jwt token received from the login or signup route in the headers inthis format `Authorization : Bearer token` to protect user accounts and endpoints.

- **Input Validation**: input validation is implemented using [Zod](https://zod.dev/ 'Zod').
- **Error Handling**: All errors are handled properly,with an express middleware .

## Disclaimer

This is a demo application and should not be used in production without proper security reviews and enhancements.

## License

This project is licensed under the MIT License
