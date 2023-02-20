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
        ![Node ](supportfiles/node-REPL.png?raw=true)
    - At the `>` prompt type `require('crypto').randomBytes(35).toString('hex')`.
    - Copy the generated string and paste it after `JWT_SECRET=` in the `config.env` file.
    - Type `.exit` to exit the REPL and return to the terminal.

* Set up an account on SendGrid for handling password resets:
    - The video at https://www.youtube.com/watch?v=YocRq-KesCM (timestamp 01:33:13) covers how to generate your `EMAIL_PASSWORD` using `apikey` as the `EMAIL_USERNAME`, but you'll need to register for SendGrid first. You can do this at https://signup.sendgrid.com/.
    - The sign-up form requires a company name and website, so I used "ThriveDX" and "https://thrivedx.com/".
    - If you get hung up on this we can troubleshoot on Gather. If you want to skip this setup that should be fine but Jeff should probably get set up since it he'll be the one to deploying.