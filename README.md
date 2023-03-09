# REFERRAL SYSTEM

This README contains prerequisites for running the application, steps for installation and step to run the project on local system.

## Prerequisites

- Ruby version - 3.0.1
- Rails version - 7.0.4.2 (version >= 7.0.0 will also work)
- Nodejs - 18.14.0 (vesrion >= 16.0 will also work)
- yarn - 1.22.19
- MySQL
## About the app

- The app is based on Ruby on rails as backend, and react library as it's frontend. For handling the authentication we are using Devise gem. The APIs can be used with other frontend too. 

## Pre-installation steps

- In config/database.yml file, please add the username and password field. This is an important step in order for database operations to run successfully.

- There's DEVISE_JWT_SECRET_KEY added in the .env. We can generate new key using
```bash
    rake secret
```
## Steps for installation

- Clone repository or download zipped folder from [Link](https://github.com/rockingatgithub/DirectShifts_devise).
- Go to current directory.
- Execute the following command in terminal/command prompt.
```bash
    ./bin/setup
```
- Above script will install all bundles, dependencies and prepare database for our application.

## Starting the application

- After the installation is successful, execute the following command.
```bash
    ./bin/dev
```
- Above script starts both the rails application and react UI.
- By default it runs on [Link](http://localhost:3000)


### Pages of the application

- Signin page :- Contains the Signin form.
- Signup page:- Contains the Signup form.
- Home page:- Shows the list of referrals created by the user along with the referral link.

### Steps to register and create a new referral link

- Go to the signup page, register using email/passowrd. (Signin if already registered)
- After successful logging in / signing up we see the user dashboard, which contains all the referrals created by the user.
- Try adding a new referral from the Add referral button above.
- After the referral is successfully created it shows up in the table.
- Try copying the link or clicking the Link button to open the signup page.
- Enter the password for this new referred user.
- With this we have successfully created a referral link and signup a new user. 

### APIs
- The APIs can be tested separately using testing tools like (Postman).
- We can test both users and referrals APIs
- The API documentation [Link](https://documenter.getpostman.com/view/11577542/2s93Jruivb).