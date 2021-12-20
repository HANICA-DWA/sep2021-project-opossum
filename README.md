# Installation guide

Execute the following steps in order to setup the development environment for this application. 

## Required software:

- Install Node.js 16+ 

## Configuring MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas/register and register an account

2. Login and create an organization (pick MongoDB Atlas as cloud service).

3. Create a new project (pick the free option with a cloud provider & region near you). 

4. Add a new username and password. 

5. Add your own IP adress to the IP access list

6. Click on the connect button on your cluster.  

7. Click 'connect your application'. 

8. pick the latest Node.js driver

9. Copy the connection string, it should look like this `mongodb+srv://admin:<password>@cluster0.t2xwc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

   `admin` is the username you added to the project. `myFirstDatabase` is het database name you're going to be using.

**Bonus:** to allow other users to connect to your database go to network access and click on 'add IP address'. You can choose to everything or add a specific IP.

## Configuring environment 

1. Navigate to `../wcag-tool/backend/env`

2. Create 2 files: `test.env` and `development.env`

3. Add the following content to both files: 

   ```
   PORT=5000
   MONGO_URI=mongodb+srv://admin:<password>@cluster0.t2xwc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   ```

Make sure the MONGO_URI is on one line, without line breaks. Replace `admin` and `<password>` with your own username and password. Replace `myFirstDatabase` with the corresponding database name you are going to use for your development and test database. WARNING: YOUR TEST AND DEVELOPMENT DATABASES NEED TO HAVE DIFFERENT NAMES

