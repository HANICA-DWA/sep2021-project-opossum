# Installation guide

Execute the following steps in the given order to setup the development environment for this application. 

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

   `admin` is the username you added to the project. `myFirstDatabase` is the database name you're going to be using.

**Bonus:** to allow other users to connect to your database go to network access and click on 'add IP address'. You can choose to allow everything or add a specific IP.

## Configuring backend environment 

1. Navigate to `\wcag-tool\backend\env`

2. Create 2 files: `test.env` and `development.env`

3. Add the following content to both files: 

   ```
   PORT=5000
   MONGO_URI=mongodb+srv://admin:<password>@cluster0.t2xwc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   ```

Make sure the MONGO_URI is on one line, without line breaks. Replace `admin` and `<password>` with your own username and password. Replace `myFirstDatabase` with the corresponding database name you are going to use for your development and test database. **WARNING: YOUR TEST AND DEVELOPMENT DATABASES NEED TO HAVE DIFFERENT NAMES.**

## Deploying to the chrome store

1. Navigate to `\wcag-tool`
2. Run `npm run setup`
3. Run `npm run dev`
4. Open a chrome browser and browse to `chrome://extensions/`
5. Make sure developer mode is checked. 
6. Click on `Load unpacked`
7. Select the following folder `\wcag-tool\chrome-extension\dist` 

The extension should now be added to your browser and ready to use.

## Project scripts

There are various custom scripts to help with development. In `\wcag-tool` you can execute the following scripts.

**npm run dev**
Starts up the backend and frontend. Hot reloading is enabled on both projects. A remote server will be started on port 8000 so you can utilize Redux development tools. 

**npm run setup**
Installs all dependencies for the backend and frontend. Bundles all the files for the chrome extension. 

**npm run test:unit**
Run all unit tests for both front- and backend. 

**npm run test:integration**
Run all unit integration tests for both front- and backend. 

**npm run lint**
Run eslint on all .js and .jsx files for both front- and backend. 

**npm run lint:fix**
Run eslint on all .js and .jsx files for both front- and backend and fixes all automatically fixable issues. 

Both `\wcag-tool\backend` and  `\wcag-tool\chrome-extension` have their own README.md files with extra information about scripts. They can be found here: [chrome-extension README](./wcag-tool/chrome-extension/README.md) & [backend README](./wcag-tool/backend/README.md) 

## Documentation

Documentation can be found [here](./documentatie/Software-Guidebook/Software-Guidebook-WCAG-Tool.md). The results of our spikes can be found [here](./documentatie/Software-Guidebook/Spikes)

