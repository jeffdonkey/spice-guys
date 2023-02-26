<a name="readme-top"></a>

<!-- PROJECT LOGO / TITLE -->
<br />
<div align="center">
    <a href="https://github.com/jeffdonkey/spice-guys">
        <img src="supportfiles/sglogo.png" alt="logo" />
    </a>
    <h3 align="center">Spice Guys</h3>
    <!-- <p align=center>
             |\      _,,,---,,_</br>
        ZZZzz /,`.-'`'    -.  ;-;;,_</br>
            |,4-  ) )-,_. ,\ (  `'-'</br>
            '---''(_/--'  `-'\_)   
    </p> -->
</div>


<!-- TABLE OF CONTENTS -->
<details>
    <summary>Table of Contents</summary>
    <ol>
        <li>
            <a href="#about-the-project">About the Project</a>
            <ul>
                <li><a href="#project-requirements">Project Requirements</a></li>
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
        <li><a href="#roadmap">Roadmap / Future Updates</a></li>
        <li><a href="#license">License</a></li>
        <li><a href="#contact">Contact</a></li>
    </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About the Project
This project is a web application that allows users to create and share spices for recipes. Users can create an account and login to the application. Once logged in, users can create, edit, and delete recipes. Users can also view recipes created by other users. Users can also search for recipes by name, ingredients, or tags. Users can also add recipes to their favorites list. Users can also add recipes to their shopping list. Users can also add recipes to their meal plan. Users can also view their profile page, which displays their recipes, favorites, shopping list, and meal plan.**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Project Requirements
The project must be a web application that uses a database to store data. The web application must be written in Javascript/React, Express, Node and Mongodb.
</br>
The web application must be deployed to the web. The web application must be responsive. The web application must be able to handle user authentication. The web application must be able to handle file uploads. The web application must be able to handle user input validation. The web application must be able to handle user input sanitization. The web application must be able to handle user input encryption. The web application must be able to handle user input decryption. The web application must be able to handle user input hashing. The web application must be able to handle user input salting. The web application must be able to handle user input throttling. The web application must be able to handle user input rate limiting. The web application must be able to handle user input filtering. The web application must be able to handle user input masking. The web application must be able to handle user input escaping. The web application must be able to handle user input normalization. The web application must be able to handle user input encoding.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

STG Note-Taker is a full-stack MERN app built with the following frameworks/libraries:
* [![React.js](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
* [![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
* [![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
* [![MongoDB](https://custom-icon-badges.demolab.com/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
* Nodemailer
* Bcrypt
* JWT
* Axios - for making requests to backend

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- APP ENDPOINTS -->
## Application Endpoints

### Server API (http://localhost:5000)
| Method | Path                                    | Purpose                           |
| ------ | --------------------------------------- | --------------------------------- |
| GET    | /api                                    | Home page                         |
| GET    | /api/auth                               | User route                        |
| POST   | /api/auth/register                      | For new user sign-up              |
| POST   | /api/auth/login                         | For user login                    |
| POST   | /api/auth/forgotpassword                | For user with forgotten password  |
| POST   | /api/auth/resetpassword/:resetToken     | For user to reset password        |
| GET    | /api/spices                             | Spices route                      |
|        |                                         |                                   |
|        |                                         |                                   |
|        |                                         |                                   |
|        |                                         |                                   |


### React App (http://localhost:3000)
| Component                | Purpose                                                               |
| ------------------------ | ----------------------------------------------------------------------|
| `components/About.js`    | Component directing to About page (/about)                            |
| `components/AddNote.js`  | Component on Home page that consists of form for adding notes         |
| `components/Alert.js`    | Component that creates an alert for the NoteState (in context folder) |
| `components/Home.js`     | Home page (/) - contains Notes and AddNote components                 |
| `components/Login.js`    | Component directing to Login page (/login)                            |
| `components/Navbar.js`   | Navigation bar at top of Home (/), /login, /signup, and /about pages  |
| `components/NoteItem.js` | Component representing individual note that make up Notes component   |
| `components/Notes.js`    | Component on Home page that includes individual note item components  |
| `components/Signup.js`   | Component directing to Signup page (/signup)                          |

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Installation
1. Once you've pulled the code into your local machine and are in the main branch, make sure you're in the root folder and run `npm install` to install dependencies.
2. Open another terminal and `cd` into the `client` folder and run `npm install` to install all the React dependencies.
3. Create a file in the root directory called `config.env`. You'll need to add the following environmental variables:
    ```sh
        PORT=5000
        MONGO_URI=mongodb+srv://<username>:<password>@<clustername>.mongodb.net/spiceGuys

        JWT_SECRET=<random-string>
        JWT_EXPIRE=10min

        EMAIL_SERVICE=SendGrid
        EMAIL_USERNAME=apikey
        EMAIL_PASSWORD=<random-string>
        EMAIL_FROM=<your-email>
    ```
4. In order to run the app you'll also need to create a database in MongoDB, generate a JSON web token (JWT), and set up an account on SendGrid. The Prerequisites section below provides further instructions on these.
5. In `package.json` in the `client` folder, make sure the port number in the proxy field matches the `PORT` in your `config.env` file and adjust if needed. The code you pull in locally, `"proxy": "http://127.0.0.1:5000"`, has the port set at 5000.


### Prerequisites
* Set up a database on MongoDB:
    - Open MongoDB Compass, select the "Databases" tab at the top and click the "Create database" button under it.
        ![MongoDB Compass](supportfiles/MongoDB-Compass.png?raw=true)
    - A window will open where you'll fill in fields for "Database Name" and "Collection Name" and then click "Create Database". I named my database "spiceGuys" and the collection "users". I also added a collection named "spices", but that can be done later.
    - Get your connection string by clicking on the three dots next to your cluster name, which will enable a pop-up in which you'll click on "Copy connection string".
        ![MongoDB Connection String](supportfiles/MongoDB-Connection-String.png?raw=true)
    - Copy the string and paste it after `MONGO_URI=` in the `config.env` file. Note that you may need to change the database name at the end of the string. Mine always comes up as "mongodb+srv://tysonlannon:<password>@cluster6977.oyy7lkw.mongodb.net/stgnotes" so I have to replace "stgnotes" with "spiceGuys".
    - If you have trouble getting logged into Compass you can find instructions at the MongoDB Atlas website that will guide you through connecting to Compass at https://www.mongodb.com/atlas/database. Note that you'll need to log in here as well so you may need to reset your password like I did. It's not the same as the password in the string above.
    - If you still have issues connecting we can troubleshoot it on Gather.

* Get a JSON web token (JWT) for authentication (note that this is covered in the video at https://www.youtube.com/watch?v=YocRq-KesCM):
    - Go to the terminal and type `node` to launch the REPL (Node shell).
        ![Node-REPL](supportfiles/node-REPL.png?raw=true)
    - At the `>` prompt type `require('crypto').randomBytes(35).toString('hex')`.
    - Copy the generated string and paste it after `JWT_SECRET=` in the `config.env` file.
    - Type `.exit` to exit the REPL and return to the terminal.

* Set up an account on SendGrid for handling password resets:
    - The video at https://www.youtube.com/watch?v=YocRq-KesCM (timestamp 01:33:13) covers how to generate your `EMAIL_PASSWORD` using `apikey` as the `EMAIL_USERNAME`, but you'll need to register for SendGrid first. You can do this at https://signup.sendgrid.com/.
    - The sign-up form requires a company name and website, so I used "ThriveDX" and "https://thrivedx.com/".
    - If you get hung up on this we can troubleshoot on Gather. If you want to skip this setup that should be fine but Jeff should probably get set up since it he'll be the one to deploying.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP / FUTURE UPDATES -->
## Roadmap / Future Updates

- [ ] BlahBlahBlah
- [ ] BlahBlahBlah
- [ ] BlahBlahBlah
- [ ] BlahBlahBlah

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

| Name          | Email                     | Phone Number     |
| ------------- | --------------------------| -----------------|
| Jeff Spice    | 8jefa8@gmail.com          | (479).422.2529   |
| Shane Spice   | shanespillman@gmail.com   | (336).624.8595   |
| Gang Spice    | gangzi923@gmail.com       | (910).547.2365   |
| Sassy Spice   | tysonlannon@gmail.com     | (919).345.3057   |

<p align="right">(<a href="#readme-top">back to top</a>)</p>