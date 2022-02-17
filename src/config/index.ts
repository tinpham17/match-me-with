const config = {
  localStorage: {
    userKey: 'fm_user'
  },
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    collection: {
      profiles: 'profiles'
    }
  },
  routes: {
    login: '/login',
    register: '/register',
    explore: '/explore',
    liked: '/liked'
  }
}

export {
  config
}
