# Installation guide

Execute the following steps in the given order to setup the development environment for this application. 

## Required software:

- [Install Node.js LTS](https://nodejs.org/en/)

## Configuring backend environment

We choose to use MongoDB Atlas as described in the [software guidebook](./documentatie/Software-Guidebook/Software-Guidebook-WCAG-Tool.md). You are also free to use a local instance of MongoDB (this can be useful for a local development environment). If you want to setup MongoDB Atlas and use that Mongo URI follow the steps at the bottom of this page.

In the next steps we're going to setup two different environment files. For more info on the use of env files [read here](https://www.npmjs.com/package/dotenv).

### Development environment 

1. Navigate to `\wcag-tool\backend\env`

2. Create a file called: `development.env`

3. Add the following properties: 

   a. `PORT` is the port number that the server runs on .e.g. `5000`
   
   b. `MONGO_URI` needs to be any valid MongoDB URI. This can be from a local or Atlas DB instance (for more info [read here](https://docs.mongodb.com/manual/reference/connection-string/)).
   
   ```
   PORT=<port number>
   MONGO_URI=<mongo uri>
   ```
   
    **WARNING: YOUR TEST AND DEVELOPMENT DATABASES NEED TO HAVE DIFFERENT NAMES.**

### Test environment 

1. Navigate to `\wcag-tool\backend\env`

2. Create a file called: `test.env` 

3. Add the following properties: 

   a. `PORT` is the port number that the server runs on .e.g. `5000`

   b. `MONGO_URI` needs to be any valid MongoDB URI. This can be from a local or Atlas DB instance (for more info [read here](https://docs.mongodb.com/manual/reference/connection-string/)).

   ```
   PORT=<port number>
   MONGO_URI=<mongo uri>
   ```

  **WARNING: YOUR TEST AND DEVELOPMENT DATABASES NEED TO HAVE DIFFERENT NAMES.**

## Configuring frontend environment

The frontend uses a `config.js` file to manage configuration settings. It currently looks like this: 

```js
export default {
  SERVER_URL: 'http://localhost:5000/v1',
  WEBSOCKET_URL: 'ws://localhost:5000/',
}
```

Make sure the port in the `SERVER_URL` and `WEBSOCKTER_URL` corresponds to the port specified in the `development.env` in the backend before running the application. 

## Loading the extension into chrome

In this step we're going to be unpacking our chrome-extension into chrome. Note that this is not the same as adding a extension to the chrome store. This will just be to run the extension locally on your machine. 

1. Navigate to `\wcag-tool`
2. Run `npm run setup`
2. Run `npm run seed:dev`
3. Run `npm run start`
4. Open a chrome browser and browse to `chrome://extensions/`
5. Make sure developer mode is checked. 
6. Click on `Load unpacked`
7. Select the following folder `\wcag-tool\chrome-extension\dist` 
7. Make sure your database instance is running if you're using a local Mongo instance.

The extension should now be added to your browser and ready to use.

## Project scripts

There are various custom scripts to help with development. In `\wcag-tool` you can execute the following scripts.

> **npm run dev**
> Starts up the backend and frontend. Hot reloading is enabled on both projects. A remote server will be started on port 8000 so you can utilize Redux development tools. 

> **npm run setup**
> Installs all dependencies for the backend and frontend. 

> **npm run start**
> Starts up the backend with node and builds the frontend into the dist folder that needs to be deployed to the chrome store.

> **npm run test:unit**
> Run all unit tests for both front- and backend. 

> **npm run test:integration**
> Run all integration tests for both front- and backend.  

> **npm run lint**
> Run eslint on all .js and .jsx files for both front- and backend. 

> **npm run lint:fix**
> Run eslint on all .js and .jsx files for both front- and backend and fixes all automatically fixable issues. 

Both `\wcag-tool\backend` and  `\wcag-tool\chrome-extension` have their own README.md files with extra information about scripts. They can be found here: [chrome-extension README](./wcag-tool/chrome-extension/README.md) & [backend README](./wcag-tool/backend/README.md) 

## Documentation

Documentation can be found [here](./documentatie/Software-Guidebook/Software-Guidebook-WCAG-Tool.md). The results of our spikes can be found [here](./documentatie/Spikes)

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
