# Software Guidebook - WCAG Tool

## Table of Contents

- [Context](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.ornl68g4g5ck)
- [Functional overview](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.pf1znqlsxaox)
- [Constraints](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.2jgibnlozrzz)
  - [Business constraints](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.w3ojv09z5oqd)
  - [Team composition and make-up](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.s4rxvxpa5ukc)
  - [Budget](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.cd2vryp8thc4)
  - [Schedule](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.q3mdi2lta30h)
  - [Technical constraints](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.5ouith30sidp)
  - [Library/framework](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.b07b1i5khf2j)
  - [Supported platforms](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.s3dbhx8xbqlv)
- [Software Architecture](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.fshyosyrc2wu)
  - [Level 1: System context diagram](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.pkmdtykiss24)
  - [Level 2: Container diagram](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.6uzloytfbr93)
  - [Level 3: Component diagram](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.udfn7894mhz1)
    - [Chrome Extension](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.83hhx4bxy7mu)
    - [REST API](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.f8w61sjlwvlo)
- [Code](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.uyr4yuw1g0fe)
  - [Browser Extension Structure](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.ozrcjrm41a57)
  - [State management](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.98itx6d4ifct)
  - [Single-file](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.z6kqt85f9uvu)
  - [Collaboration met Yjs](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.wmm5rem1zla9)
- [Data](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.vu2tn34yfe2u)
  - [MongoDB Atlas](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.6z2b0dw0iceu)
  - [Data models](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.dmtmls6t1cwb)
  - [GridFS](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.rarjpyttr4vu)
- [Decision Log](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.jdp4a3tot0pk)
  - [Collaboration](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.6aiozqu0h2h8)
  - [Extension VS Website](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.rox6wc6yzcxu)
  - [How annotation and elements are linked.](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.t1bb183aolzi)
  - [XPath vs CSS selectors](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.ria3a5ibtdaz)
  - [Snapshotting](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.n0rhuyflops4)
  - [Chrome or Firefox](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.lb0vtbohl472)

# Context

Nowadays more and more information, utilities and services are offered online via websites and apps. Companies, government agencies and individuals start to utilise the digital world more and more due to the ease of use and broad audience they can reach. For most people, like younger generations and people up to 40-60 years, this is a great trend and happily go along with it.

For some however, e.g. older generations or people with disabilities, using such an app or website might be a difficult thing to do. Most websites today aren’t properly programmed/configured to be accessible for everyone.

A blind person, for example, must rely on the text-to-speech functionality to know and understand what content a website contains. If a website isn’t programmed correctly for the text-to-speech functionality to work (properly), a blind person simply wouldn’t be able to use the website. If a person isn’t able to use a mouse and keyboard due to circumstances, would the website be able to utilise voice control to help this person?

These are accessibility issues that occur on a lot of websites and leave users frustrated.

In the past, people with disabilities had to adapt to the environment, but in today’s world the digital environment should adapt to these people.

Accessibility analysts evaluate and judge websites based on how accessible they are, using the Web Content Accessibility Guidelines (WCAG). Using their own knowledge and automated scripts they check the content on pages and create a rapport with issues that were found during the inspection. The format of this rapport is rather clunky and obscure making it difficult to use both for the analyst and the receiver.

For this reason, we were asked to create a tool that would allow an analyst to create visual annotations on a given webpage and share the annotated webpage with the owner of a website. Giving the website owner an effective and easy to understand view of every accessibility issue that needs fixing.

# Functional overview

The key functionality of this application is the ability to capture a webpage as you see it and convert it to a ‘snapshot’. A snapshot is essentially a representation of a webpage without its functionality. It is completely stripped of its javascript and only the HTML and CSS remain. This has led to some interesting technical decisions, for example, the decision to develop a browser extension instead of a website, which you can read more about in the decision log. It has also shaped almost all the other features of this application. From data storage to collaboration to selecting and creating annotations.

A feature less significant to the architecture, but nonetheless very crucial to this application, is the ability to create, update and delete an annotation. This is the main use case of this application, as it allows analysts to mark problems directly on the webpage instead of filling out a long and boring form. It also makes it easier for analysts and website owners to collaborate, identify and discuss the problems on a page.

This brings us to the next functionality; collaboration. The need for analysts to work together on the same webpage has had some influence on the way we handle communication between client and server which is explained in further detail in the decision log.

# Constraints

This project has had some constraints. We’ll be separating them into two categories and explain how they’ve impacted the architectural design of the application.

## Business constraints

The first category is business constraints. Everything that has had an influence on the architectural decisions during the development of this application, caused indirectly by a business decision, can be categorised as a business constraint.

### Team composition and make-up

Due to the nature of this being a school project, the team is made up of 3 students. This might have a significant influence on the technical decisions being made since we often lack the knowledge that you would expect from a software developer.

### Budget

Another challenge we are facing is having a €0 budget. This has already influenced the decision to store files with GridFS in MongoDB since this is a free option. Had we not had this constraint we might have picked another solution, like Amazon S3.

### Schedule

We’ve been given a 10 week period to develop this application the best we can. Given this constraint we are looking at solutions that are viable to develop within this timeframe.

## Technical constraints

Technical constraints can be categorised as technical decisions that were imposed by either the team or stakeholders and can be considered unchangeable.

### Library/framework

A few technical constraints that have to do with the library/frameworks that we’re currently using, came from the decision to use technologies that are familiar to DWA students. This project has a high probability of being passed on to another group of DWA Students next year, which would make it easier for them to continue development if the project has familiar technologies. To list a few constraints:

- NodeJs backend
- JavaScript
- React frontend
- Express framework
- MongoDB data storage

### Supported platforms

Since we’re developing a browser extension the platforms to host our product are web browsers. There are a few obvious contenders like Chrome, Firefox or Edge. We initially decided to stick with Chrome for a variety of reasons further explained in the [decision log](https://docs.google.com/document/d/1WSlLouD7oEiel_JWBgEA_TEM517flMGCKi1keHVW27Y/edit?skip_itp2_check=true#heading=h.lb0vtbohl472).

# Software Architecture

Below we have used the [C4 model](https://en.wikipedia.org/wiki/C4_model) to visualise the software architecture. We’ve decided to skip ‘Level 4: Code’ because we felt that this level can be understood by simply reading the code itself. Next chapter ‘code’ also explains more about some of the concepts that appear in the diagrams.

## Level 1: System context diagram

[![](https://lh5.googleusercontent.com/QHygJDQFTfGE1gNyrgdgBAc6tin9UwMjwiGJ0IDeKAzvw0uufu7y85lbFpiGHi2_jyRVSHr3KeMooJkZL3TwugIwnwT9Wx3nF1s8hnCkCETaK4gXGsUVu4e1hEOtu9Dv5ZijdiOW)](https://app.diagrams.net/?page-id=a9L3Wu0wHT0waWiI6rr7&scale=auto#G1SrJmyoGllhFI6CipRBo7uIl7XOVB50gQ)

## Level 2: Container diagram

[![](https://lh4.googleusercontent.com/pexNQ0j5bXLv_8FfT5uE5XcFYI65Z1s45MkdrCJAVzlvg6RR3-4CqZMjBVELKcu2grmVuGfKvmVfiUup40rBanfz-2rHonwLAbSBH2yytC7D224MiHnFkdBrR_tz_EfRBwelJe4O)](https://app.diagrams.net/?page-id=aY6XwwjnI5ZyGZXxaUdc&scale=auto#G1DIU1oquSKBRUMbycysl3VH_oIcdsw9pI)

## Level 3: Component diagram

### Chrome Extension

[![](https://lh4.googleusercontent.com/tYU2oGYKqaWC-UkTgJsKmIcJqfsiCaVPxvucP8XRk9sSIjKkdO5SXQF7e3YnV5lVcfOQS-iUZ3zHW079B3NGfR5xrgivbzv4orPsy9sVbtwhbnj85VYN4JVAAozpWpco2ZGD-1Gy)](https://app.diagrams.net/?page-id=S_0v7oDeGRVnYbVjdG3k&scale=auto#G1gH_1Sb-tiaS6Ebgl5opiNYEzXltupvxj)

### Backend

[![](https://lh3.googleusercontent.com/Xf0u89LUzSDrC-VPxXMPNlsdmwnXR3Xy4UXrcygUWGayx7zQCeymjl_7C0KkpsYpIisShK6R7oO531oxrO51oJ-daWiKmRbmejGsMoDwEcBTcm5lOHD_69c46lBjXv2D70fAwreA)](https://app.diagrams.net/?page-id=PCwTK1SPMSIFYd2I3N2e&scale=auto#G1P6JZMOoz9BgC7Y20vJL8CFHdJR6aDRlS)

# Code

There are some implementation details that might not be inherently obvious by reading the code. Below we will go further into detail about these implementations.

## Browser Extension Structure

A browser extension can have a few components that run at different parts in the browser. Examples of this are the background script that runs, as the name would suggest, in the background of the browser. There is also the popup that appears when clicking the extension icon called the popup menu.

![](https://lh3.googleusercontent.com/vD6NcBB3bhWztJyKYiQ2nOmyc-yk4sCOhgmbZxBjzramOLxM_dT7ski7u5RRqi1lxt98RGkhIdUaiJ8ArdgIGqZCI0ldape5D_-zeClE_QTVTR_VbvmUVHH3QUXIv9D9VXYgElK2 'Generic chrome extension architecture')

I’d suggest [reading up](https://developer.chrome.com/docs/extensions/mv3/architecture-overview/) on what components a browser extension can have. Furthermore it is strongly recommended to read up on the [Chrome extension Spike](https://github.com/HANICA-DWA/sep2021-project-opossum/tree/develop/documentatie/Spikes/chrome-extension) for a quick overview on how a chrome extension works.

Our extension currently uses the following extension components:

- Background script

  - Runs in the background is used by single-file to create snapshot

- Content script

  - Runs in foreground on a webpage. Used by the annotation editor and single-file to get the content of the webpage a user wants to take a snapshot of.

- Popup

  - Used to manage extensions. Opens when clicking the extension icon.

- Options

  - Currently only used to change the name of a user. In the future could be used to change snapshot options. For example to disable or enable javascript on snapshots.

- Context menu

  - Opening the context menu on a webpages reveals an option to snapshot the current page.

## State management

For our state management we are using [Redux Toolkit](https://redux-toolkit.js.org/) (RTK). One thing that might be less obvious is the way we combine data fetching and caching with the help of [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) (RTKQ. RTKQ is essentially an add-on to RTK that allows you to define an API with all its endpoints. Data fetched from the server will be automatically stored without the need to write your own action creators and reducers. Multiple components can subscribe to data from a certain endpoint without the need to fetch it from the server every time. Another mechanism from RTKQ that we utilise is data caching and cache invalidation. When executing a mutation on a resource it will automatically trigger a fetch for that given resource to get the latest data from the server. This in turn will update the components that are subscribed to that specific resource. More about this can be read in the [RTKQ documentation about cache](https://redux-toolkit.js.org/rtk-query/usage/cache-behavior).

## Single-file

For our snapshotting functionality we integrated the app with single-file. Single-file creates a perfect copy of most websites and bundles everything into a single html file. It comes with options to include or exclude: javascript, audio sources and video sources, but has a lot more configurable options.

Take a look at the single-file github: <https://github.com/gildas-lormeau/SingleFile>

It contains a lot of useful information about the extension and has great support.

We however use single-file-lite, their manifest v3 version of the extension.

Github repository: <https://github.com/gildas-lormeau/SingleFile-Lite>

The single-file API is integrated with the Chrome extension. The following files in the chrome extension project folder are part of single-file:

- src/extension
- src/common
- src/lib
- Rollup.config.js

Single file is written in plain Javascript without react or redux. Most of the internal communication and communication between single-file and our react components work with [message passing](https://developer.chrome.com/docs/extensions/mv3/messaging/).

Single-file uses Rollup to bundle itself into neat files in the dist/single-file directory.

Run \`npm run build:single-file\` to build once. Or run ‘npm run dev:single-file’ if you’re actively making changes to the single-file source.

The chrome extension uses RTK Query to communicate with the backend. This, however, is part of redux, but since single-file doesn’t have access to redux we’ve had to make the decision to use Axios once in the app to post a snapshot to the server when a new one gets created. This way we persist new snapshots on the server which can be retrieved later.

More information about the usage of single-file can be gained by taking a look at our research on snapshotting, wich can be found [here](https://github.com/HANICA-DWA/sep2021-project-opossum/tree/develop/documentatie/Spikes/Snaphots).

Both the prototype and the readme.md contain useful information.

The single-file wiki also has some useful information about how to integrate single-file with your own extension: <https://github.com/gildas-lormeau/SingleFile/wiki/How-to-integrate-the-API-of-SingleFile-into-an-extension>

## Collaboration with Yjs

In order to make our product collaborative we used a javascript [CRDT](https://crdt.tech/) implementation, [Y,js](https://yjs.dev/). Our product needed quite a few features in order to have the full*“google docs”* experience.

- Presence list: a list of online users, each user needs a unique username, profile picture and colour.
- Collaborative input fields: all changes must be shared near real-time with all collaborators. These input fields are used for the annotation editor. This enables collaborators to see each other's changes immediately.
- Cursors indicating each user, i.e. input fields that contain the cursors of all collaborators. Each cursor has the unique colour of each user and an on hover popup containing the username. This is useful to identify each other.
- Collaborative lists: our product has a list of annotations, all crud operations a collaborator may perform must be visible near real-time.

Fortunately. Y.js is shipped with a lot of features which makes it powerful enough to implement the previous listed featured:

- A presence list is implemented using [Y.js’ awareness](https://docs.yjs.dev/api/about-awareness)
- Collaborative input fields and cursors are implemented using [React Quill](https://www.npmjs.com/package/react-quill/v/2.0.0-beta.4), a rich text editor and [Yjs’ Quill Binding](https://github.com/yjs/y-quill/).
- The collaborative annotation list is implemented using the [shared Array Data Type](https://github.com/yjs/y-quill/).
- To share all data type changes and awareness information [y-websocket](https://github.com/yjs/y-websocket) is used.

Before working on these frameworks I recommended reading the documentation of [Yjs](https://github.com/yjs/yjs), [React Quill](https://www.npmjs.com/package/react-quill/v/2.0.0-beta.4) and this [Spike](https://github.com/HANICA-DWA/sep2021-project-opossum/tree/develop/documentatie/Spikes/collaboration) about collaboration and the implementation of Yjs in React.

# Data

## MongoDB Atlas

For storing data we decided to go with MongoDB since that was one of the technical constraints. Specifically Atlas, which is a cloud version of MongoDB. The main reason for picking Atlas over a local database instance was the ease of development. We wanted one central place to store our data so that development of collaborative features would be easier. One limitation to keep in mind is that the free version of Atlas imposes a 512MB storage limit.

## Data models

The data models are defined with [Mongoose](https://mongoosejs.com/) and can be found in the backend under models. Currently we define three different resources.

Web Content Accessibility Guidelines (WCAG) are the guidelines that analysts use when marking problems on a webpage. These guidelines are maintained and updated by the W3C and we import them from the [official source](https://raw.githubusercontent.com/w3c/wai-wcag-quickref/gh-pages/_data/wcag21.json) into our own database with the use of seed script.

Snapshots are mainly the metadata around the HTML file that represents a webpage, such as name, domain etc. The actual file itself is stored in another collection called \`snapshots.files\` with the help of GridFS as explained below. The HTML file and the snapshot are linked through a property called filename, which is a random 16 byte hex code.

The third resource we define are annotations. We chose to embed the annotations under their respective snapshots, since they never need to be read separately and there will only be a few hundred annotations per snapshot at the absolute max.

## GridFS

Due to the nature of this application and it’s functionality we needed some way to store html, and possibly other files such as images. Since [MongoDB has a 16MB limit](https://docs.mongodb.com/manual/reference/limits/) on documents, we needed an alternative to storing larger files.

[GridFS is a specification on top of MongoDB](https://docs.mongodb.com/manual/core/gridfs/#use-gridfs) which allows us to store files larger than 16MB. We considered using an external file system like S3 Buckets from AWS, but decided GridFS could do the job for now. Since GridFS is integrated with MongoDB we could use the original 512MB free storage to store our files. Had we picked another third-party provider, we would have to set up an account with a credit-card, which was not an option at the time. Another option would be to use the local filesystem of the server. We decided against this since this would defeat the purpose of a cloud database where all our data was shared between developers.

The actual implementation is done with the help of [multer-gridfs-storage](https://www.npmjs.com/package/multer-gridfs-storage). This uses Multer in combination with GridFS as a storage engine. .

# Decision Log

## Collaboration

There are several ways to implement collaboration features into our product. To determine which technology and more specifically, which framework is the best to use we did a little research. The results of this research can be found [here](https://github.com/HANICA-DWA/sep2021-project-opossum/tree/develop/documentatie/Spikes/collaboration). A part of conducting the research was building a fully working prototype, which can be found [here](https://github.com/HANICA-DWA/sep2021-project-opossum/tree/develop/documentatie/Spikes/collaboration/prototype). All needed features are implemented in this prototype.

## Extension VS Website

- We want to make a visual annotation tool, where annotations can be placed on a web page itself. In live websites we need the use of iframes, which can cause, notoriously well-known, cors errors.
- Extensions can draw over existing websites, have control over the browser and run on the user's computer. Avoiding cors problems.

## How annotation and elements are linked.

The team has decided that the way annotation and html elements are linked are with css selectors. An alternative would be to insert the annotation into the element itself. We have chosen for selectors because it doesn’t alter the dom itself but it is a reference to it. This would be an advantage to altering the dom.

For example with sharing to other users what happened you only have to send them the annotation information with the selector. When you have to alter the dom you’ll need another way to tell the user what the element is linked to.

## XPath vs CSS selectors

When you are programmatically trying to select an element on a web page there are two obvious choices to consider: XPath and CSS selectors.

To determine which one would be best for our use cases we built two basic prototypes and consulted a few sources. The full report of this research can be read [here](https://github.com/HANICA-DWA/sep2021-project-opossum/blob/develop/documentatie/Spikes/CSS%20vs%20XPath/XPath%20vs%20CSS%20selector.md).

## Snapshotting

The team made the decision to create an annotation tool that creates annotation on snapshots of the website and not the live website itself.

The reasons for this are:

- Annotation and elements are linked by selectors (e.g. css / xpath)
- Because dynamic websites like <https://nu.nl/> change when new articles are published. Annotation can get lost or annotations get linked to a different element than intended.
- Some websites use random classes and ids. This would mean that we cannot use css selectors and makes using xpath difficult.

There are some different ways to create a copy of a snapshot. Because of this the team did some research. The results are found in the [project repository](https://github.com/HANICA-DWA/sep2021-project-opossum/tree/develop/documentatie/Spikes/Snaphots).

## Chrome or Firefox

We’re currently only developing for Chrome. This is due to the fact that they are on the new manifest v3 for extensions while Firefox is still on manifest v2. Firefox has announced that they will also make the switch to manifest v3 so in the future it will be possible, with minor changes, to run this extension on Firefox as well as Chrome.

Chrome’s manifest v3 does introduce some limitations to the webrequest API that manifest v2 did not have. Firefox did announce that they will be more lenient with their implementation of manifest v3 but what that means isn’t clear yet.

Since developing on an old manifest version that will be deprecated in the future makes no sense and we do not currently need the webrequest API that Chrome's manifest v3 does restrict, we have decided to stay on Chrome. With the outlook that we can switch to firefox when manifest v3 is out on Firefox and if developing on Chrome turns out to be too restrictive. Taking into consideration that extensions on the same manifest versions work cross platform with minimal effort, a migration to Firefox would also be minimal effort. But migrating now to Firefox on manifest v2 would take a considerable amount of time.
