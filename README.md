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

The extension should now be added to your browser and ready to use. The result will look like this: 

![Result](https://media.giphy.com/media/ivAyXWGHRtKsENdyps/giphy.gif)

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
> Run all integration tests for backend.  

> **npm run test:e2e**
> Run all e2e tests. (requires some setup, info found in wcag-tool/chrome-extension/README.md)

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

## Known issues

1. **Issues:** When adding 100+ annotations to a website, the badges will start to make the website lag.
   **Fix:** Optimize rendering badges i.e. don't render them when they're not in the viewport, use intersectionObserver for this. Use an optimized way to listen for position changes of the element the badge is attached to and update accordingly (possibly with mutationObserver API). 
2. **Issue:** When performing auto analyses with Axe Core the browser/UI will freeze until it's done.
   **Fix:** To be determined.

3. **Issue: **The alerts after generating annotations with Axe Core will show up after opening and closing the slider even when dismissed earlier.
   **Fix:** Properly keep track if the alert should be hidden or not with react state.

4. **Issue: **When two or more people are collaborating on an annotation and one of them is on the detail or edit slider of an annotation and another person deletes the annotation, the person viewing the annotating will be in an unwanted state. 
   **Fix:** Add resource blocking by creating a websocket room for each annotation. If there's more than one user (yourself) in the room, don't allow for deleting an annotation. 

5. **Issue:**Lag when scrolling through the list of annotations due to highlighting the element on hover.
   **Fix:** Make it so that the element only gets highlighted after hovering for over 100-300ms.

6. **Issue:** The WCAG dropdown shows 4 sets of the same rules as they are mapped wrong.
   **Fix:** Map the WCAG data correctly.

7. **Issue:** When selecting a WCAG, you can't unselect it.
   **Fix:** Add an option that doesn't represent a WCAG.

8. **Issue:** When return from the detail page of an annotation to the list overview, the scrollbar of list will be at the top instead of the annotation where you scrolled to.
   **Fix:** Don't close the annotation list slider when going back and forth between the detail slider or have it scroll to the element you just came from when returning.

9. **Issue:** When clicking on the 'Delete annotation' button and the tooltip shows up to confirm and you press esc to close the slider and then reopen a detail slider the tooltip will be opened and out of position.
   **Fix**: Make sure the tooltip is closed when exiting the detail slider

10. **Issue:** No error is displayed to the user when something goes wrong during the following events:

    - Fetching snapshots
    - Creating and updating an annotation
    - Fetching annotations

    **Fix:** Use the alerts mentioned in issue 3 to show error state.

    
