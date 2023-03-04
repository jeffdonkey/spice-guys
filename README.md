<a name="readme-top"></a>

<!-- PROJECT LOGO / TITLE -->
<br />
<div align="center">
    <a href="https://github.com/jeffdonkey/spice-guys">
        <img src="supportfiles/sglogo.png" alt="logo" />
    </a>
    <h3 align="center">Spice Guys</h3>
</div>


<!-- TABLE OF CONTENTS -->
<details>
    <summary>Table of Contents</summary>
    <ol>
        <li>
            <a href="#about-the-project">About the Project</a>
            <ul>
                <li><a href="#built-with">Built With</a></li>
            </ul>
        </li>
        <li>
            <a href="#application-endpoints">Application Endpoints</a>
            <ul>
                <li><a href="#application-endpoints">Server API</a></li>
                <li><a href="#application-endpoints">React App</a></li>
            </ul>
        </li>
        <li>
            <a href="#getting-started">Getting Started</a>
            <ul>
                <li><a href="#installation">Installation</a></li>
                <li><a href="#prerequisites">Prerequisites</a></li>
            </ul>
        </li>
        <li><a href="#license">License</a></li>
    </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About the Project
Spice Guys is a web application that allows users to create and share information on spices. Users will create an account and login to the application. Once logged in, users can create, edit, and delete spices. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

Spice Guys is a full-stack MERN app built with the following frameworks/libraries:
* [![React.js](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
* [![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
* [![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
* [![MongoDB](https://custom-icon-badges.demolab.com/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
* [![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com)
* Bcrypt
* JSON Web Token (JWT)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- APP ENDPOINTS -->
## Application Endpoints

### Server API
| Method | Path                                    | Purpose                           |
| ------ | --------------------------------------- | --------------------------------- |
| GET    | /api                                    | Root Page                         |
| GET    | /api/auth                               | User route                        |
| POST   | /api/auth/createuser                    | For new user sign-up              |
| POST   | /api/auth/login                         | For user login                    |
| GET    | /api/fetchallspices                     | Spices route                      |
| POST   | /api/spices/addspice                    | Add Spice route                   |
| DELETE | /api/spices/deletespice/:id             | Delete spice route                |
| PUT    | /api/spices/updatespice/:id             | Update spice route                |


### React App
| Component                   | Purpose                                                                        | 
| ------------------------    | -------------------------------------------------------------------------------|
| `components/About.js`       | Component directing to About page (/about)                                     |
| `components/AddSpice.js`    | Component on Home page that consists of form for adding notes                  |
| `components/Alert.js`       | Component that creates an alert for the SpiceState (in context folder)         |
| `components/LandingPage.js` | Landing Page (/) - can access Login or Signup                                  |
| `components/Home.js`        | Home page (/home) - displays Spices and AddSpice components, can access Logout |
| `components/Login.js`       | Component directing to Login page (/login)                                     |
| `components/Navbar.js`      | Navigation bar - can access Login, Signup, Home and About                      |
| `components/SpiceItem.js`   | Component representing individual spice that make up Spice.js component        | 
| `components/Spice.js`       | Component on Home page that includes individual SpiceItem.js components        |
| `components/Signup.js`      | Component directing to Signup page (/signup)                                   |

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Installation
1. In order to run this project locally, you'll need to cd into the both the `backend` and `client` folders and run `npm install`.
2. Create an `.env` file in the `backend` directory and  add the following environmental variables:
    ```sh
        PORT=5000
        MONGO_URI=mongodb+srv://<username>:<password>@<clustername>.mongodb.net/spiceGuys
        JWT_SECRET=<random-string>
    ```
3. Create an `.env` file in the `client` directory and add the following environmental variable:
```sh
    PORT=5000
```
    Note that if you change the port to anything other than 5000 in one .env you'll need to update it in the other as well.
4. In order to run the app you'll also need to create a database in MongoDB and generate a JSON web token (JWT). The Prerequisites section below provides further instructions on these.

### Prerequisites
* Set up a database on MongoDB:
    - Open MongoDB Compass, select the "Databases" tab at the top and click the "Create database" button under it.
        ![MongoDB Compass](supportfiles/MongoDB-Compass.png?raw=true)
    - A window will open where you'll fill in fields for "Database Name" and "Collection Name" and then click "Create Database". I named my database "spiceGuys" and the collection "users". I also added a collection named "spices", but that can be done later.
    - Get your connection string by clicking on the three dots next to your cluster name, which will enable a pop-up in which you'll click on "Copy connection string".
        ![MongoDB Connection String](supportfiles/MongoDB-Connection-String.png?raw=true)
    - Copy the string and paste it after `MONGO_URI=` in backend directory's `.env` file.
    - If you have trouble getting logged into Compass you can find instructions at the MongoDB Atlas website that will guide you through connecting to Compass at https://www.mongodb.com/atlas/database.

* Get a JSON web token (JWT) for authentication:
    - Go to the terminal and type `node` to launch the REPL (Node shell).
        ![Node-REPL](supportfiles/node-REPL.png?raw=true)
    - At the `>` prompt type `require('crypto').randomBytes(35).toString('hex')`.
    - Copy the generated string and paste it after `JWT_SECRET=` in the `backend` directory's `.env` file.
    - Type `.exit` to exit the REPL and return to the terminal.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>