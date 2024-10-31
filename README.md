# noSQLChallenge

## Description

This project is an API for a social networking web application, developed with Express.js, MongoDB, and Mongoose. It enables users to share thoughts, react to friends' posts, and manage their friend lists. Designed to handle large amounts of unstructured data, it’s well-suited for scalable social media platforms. The project was driven by a desire to gain practical experience with NoSQL databases and explore how they handle flexible data structures in social networks. It tackles the challenge of efficiently scaling and organizing vast user data. Throughout the project, I learned how to model unstructured data with MongoDB, create schemas with Mongoose, build RESTful API routes, and use virtuals to dynamically calculate data such as friend and reaction counts, all while effectively managing timestamps.

walkthrough video  [https://youtu.be/7xUwjuG7s5w]

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

Before you start, please make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [npm](https://www.npmjs.com/)

### Installation Steps

Clone the Repository

1. clone the repository to your local machine using the command:



   ```bash
   git clone git@github.com:Kagen-Smith/noSQLChallenge.git
   ```

2. Navigate to the Project Directory

Move into the project's directory:

   Move into the directory of the project:

   ```bash
   cd your-project-repo
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Run the Application**

   ```bash
   npm run start
   ```

5. **Test the API**

   Navigate to `http://localhost:3001/api` in Insomnia.

   Available routes include:
   `/api/thoughts` and `/api/users`

6. **Optional: Run in Development Mode**

   ```bash
   npm run start:dev
   ```

## Usage

### Base URL

All endpoints use the following base URL: http://localhost:3001/api

Ensure the server is running locally, or replace the URL with your deployed server's address, if applicable.

The API supports full CRUD operations for users, thoughts (posts), and reactions. Below are examples of how to interact with these resources.

---

### Users

#### 1. Create a New User

- Endpoint: POST /users
- Description: Create a new user by providing a username and email.
- Example:

```bash
POST /api/users
Content-Type: application/json

{
  "username": "john",
  "email": "john@example.com"
}
```

#### 2. Get All Users

- Endpoint: GET /users
- Description: Retrieve a list of all users.
- Example:

```bash
GET /api/users
```

#### 3. Get a Single User by ID

- Endpoint: GET /users/:userId
- Description: Fetch details of a single user by their ID.
- Example:

```bash
GET /api/users/60b77f4f5b4c7b4a5429e1a1
```

#### 4. Update a User

- Endpoint: `PUT /users/:userId`
- Description: Update a user's username or email by their ID.
- Example:

```bash
PUT /api/users/60b77f4f5b4c7b4a5429e1a1
Content-Type: application/json

{
  "username": "john",
  "email": "john_updated@example.com"
}
```

#### 5. Delete a User

- Endpoint: `DELETE /users/:userId`
- Description: Delete a user by their ID.
- Example:

```bash
DELETE /api/users/60b77f4f5b4c7b4a5429e1a1
```

### Thoughts

The CRUD actions on thoughts may be used similarly to Users routes using the following path:

`http://localhost:3001/api/thoughts`

### Reactions

#### 1. Add a Friend to a User

- Endpoint: `POST /thoughts/:thoughtId/reactions`
- Description: Add a reaction to an existing thought by providing `reactionBody` and `username`.
- Example:

```bash
POST /api/thoughts/60b784f75b4c7b4a5429e1a5/reactions
Content-Type: application/json

{
  "reactionBody": "Great thought!",
  "username": "jane_smith"
}
```

#### 2. Remove a Reaction from a Thought

- Endpoint: `DELETE /thoughts/:thoughtId/reactions/:reactionId`
- Description: Delete a reaction from a thought by specifying the thoughtId and reactionId.
- Example:

```bash
DELETE /api/thoughts/60b784f75b4c7b4a5429e1a5/reactions/60b784f95b4c7b4a5429e1a6
```

### Friends

#### 1. Add a Friend to a User

- Endpoint: `POST /users/:userId/friends/:friendId`
- Description: Add a user as a friend by specifying the userId and friendId.
- Example:

```bash
POST /api/users/60b77f4f5b4c7b4a5429e1a1/friends/60b77f4f5b4c7b4a5429e1a2
```

#### 2. Remove a Friend from a User

- Endpoint: `DELETE /users/:userId/friends/:friendId`
- Description: Remove a user from a user's friends list.
- Example:

```bash
DELETE /api/users/60b77f4f5b4c7b4a5429e1a1/friends/60b77f4f5b4c7b4a5429e1a2
```


## License

This project is licensed under the MIT license.

## Questions

Please visit my GitHub profile: https://github.com/Kagen-Smith.<br>
For additional questions, please contact me at: kagensmith27@gmail.com