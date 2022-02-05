# match-me-with

Another Tinder clone app developed in React with Firebase integrations.

Live version is running here: https://match-me-with.vercel.app/ 

## Prerequisites

In order to run this app we must have a Firebase project setup and collect related info to update environment variables.
Firebase project offers lots of features but for this app we are using Authentication and Firestore Database.

- Authentication: for user authentication
- Firestore Database: to store user profile info

Follow these steps here to get it ready:

- Go to https://console.firebase.google.com/u/0/ and create a new Firebase project

    ![Firebase New Project](/resources/firebase-new.png)
- Go to Project settings > General and copy these green-highlighted info

    ![Firebase Env](/resources/firebase-env.png)
- Copy and rename `.env.sample` to `.env` and populate the variables there with the Firebase info above

Finally make sure the dependencies are installed by running this command from the root project directory:

```
yarn
```

It's ready!

## Start development

In the root project directory, run:

```
yarn start
```

The app will start in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Make edits and lint code

During running in development mode, the page will reload if you make edits.

You will also see any lint errors in the console. In order to manually check for linting errors, run:

```
yarn lint
```

## Run Test

Test runner has been setup for this app. Launch it in the interactive watch mode by executing:

```
yarn test
```

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Deploy

This app is being deployed by https://vercel.com/.

In order to have it run on Vercel:
- Register a Vercel account and connect it with this Github repo
- Select `Create React App` as the framework preset for Build & Development Settings (or set the build command to `yarn build`)

    ![Vercel Setup](/resources/vercel-setup.png)

- Make sure Vercel environment variables are updated

    ![Vercel Env](/resources/vercel-env.png)

That's it!
