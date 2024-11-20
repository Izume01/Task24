# Task24

Task24 is a comprehensive task management application that allows users to efficiently create, edit, delete, and manage tasks with features such as prioritization, task completion tracking, and persistent state across sessions. Built with Node.js, Express, MongoDB, and Passport for secure authentication, Task24 provides a responsive design that is accessible on multiple devices.

## Table of Contents
- [Task24](#task24)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
    - [Environment Variables](#environment-variables)
  - [License](#license)

## Features
- **User Authentication**: Register, log in, and log out securely with Passport authentication.
- **Task Management**: Create, edit, delete, and prioritize tasks.
- **Task Completion Tracking**: Mark tasks as completed for easy tracking.
- **Responsive Design**: Accessible across desktop and mobile devices.
- **Task Prioritization**: Assign priorities (low, medium, high) to tasks for effective management.
- **Task Details Overlay**: View task details in an overlay for a better experience.
- **Persistent Task State**: Save tasks across sessions.


## Installation
1. Clone the repository:

```bash
git clone https://github.com/yourusername/task24.git

cd task24
```
2. Install Dependencies
```bash
pnpm install
```
3. Set up environment variables:
Create a .env file in the root directory and add the following variables:

```plaintext
PORT=3000
MONGO_URI=your_mongodb_uri
SECRET=your_session_secret
```
4. Start the application
```bash
pnpm dlx nodemon app.js
```

## Usage
1. Open this link http://localhost:5000/register in your browser
2. Register a new account or log in with an existing account.
3. Create, edit, and delete tasks as needed.
4. Mark tasks as completed by checking the checkbox.

## Project Structure
```php
Task24/
├── .env                   # Environment variables
├── .gitignore             # Files to ignore in Git
├── .vscode/               # VSCode settings
│   └── settings.json
├── app.js                 # Main application file
├── config/                # Configuration files
│   ├── connectDB.js       # Database connection
│   ├── dropdb.js          # Database drop script
│   └── passport.js        # Passport configuration for authentication
├── controller/            # Controllers for business logic
│   ├── statsController.js # Stats controller
│   └── taskController.js  # Task controller
├── LICENSE                # License file (MIT)
├── model/                 # Mongoose models
│   ├── stats.js           # Stats model
│   ├── tasks.js           # Task model
│   └── user.js            # User model
├── package-Sel.json       # Package metadata and dependencies (Sel environment)
├── package.json           # Project metadata and dependencies
├── pnpm-lock-Sel.yaml     # pnpm lock file (Sel environment)
├── pnpm-lock.yaml         # pnpm lock file
├── public/                # Static files (CSS, JavaScript)
│   ├── css/
│   │   ├── login.css
│   │   ├── register.css
│   │   ├── stats.css
│   │   └── style.css
│   └── js/
│       ├── createTask.js
│       ├── editTaskOverlay.js
│       ├── index.js
│       ├── overlay.js
│       ├── UpdateCheck.js
│       └── fetchData.js   # Fetch data script
├── routes/                # Express route handlers
│   ├── auth.js            # Authentication routes
│   ├── protected-route.js # Protected routes middleware
│   ├── stats.js           # Stats routes
│   └── task.js            # Task routes
└── views/                 # EJS templates for rendering HTML
    ├── index-Sel.ejs      # Homepage (Sel environment)
    ├── index.ejs          # Homepage
    ├── login.ejs          # Login page
    ├── register.ejs       # Registration page
    ├── setting.ejs        # Setting page
    └── statistics.ejs     # Statistics page
```

- app.js: Main application file.
- config/: Configuration files for database - - - connection and Passport.
- controller/: Controllers for handling business logic.
- model/: Mongoose models for MongoDB collections.
- public/: Static files (CSS, JavaScript).
- routes/: Route handlers.
- views/: EJS templates for rendering HTML.


### Environment Variables
The application requires the following environment variables:

- PORT: The port on which the server will run.
- MONGO_URL: The URI for connecting to MongoDB.
- SECRET: The secret key for session management.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
