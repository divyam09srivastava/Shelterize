// import * as firebase from "firebase";
// import "firebase/auth";

// const app = firebase.initializeApp({
//   apiKey: "AIzaSyCY5G0Xgal_kYnUi4vyDiCSntydThvTNSE",
//   authDomain: "moderntest-2eadd.firebaseapp.com",
//   databaseURL: "https://moderntest-2eadd.firebaseio.com",
//   projectId: "moderntest-2eadd",
//   storageBucket: "moderntest-2eadd.appspot.com",
//   messagingSenderId: "508323795309",
//   appId: "1:508323795309:web:13311b390517f51313ca64",
//   measurementId: "G-KHE16SCL7Z",
// });

// export default app;
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyCY5G0Xgal_kYnUi4vyDiCSntydThvTNSE",
  authDomain: "moderntest-2eadd.firebaseapp.com",
  databaseURL: "https://moderntest-2eadd.firebaseio.com",
  projectId: "moderntest-2eadd",
  storageBucket: "moderntest-2eadd.appspot.com",
  messagingSenderId: "508323795309",
  appId: "1:508323795309:web:13311b390517f51313ca64",
  measurementId: "G-KHE16SCL7Z",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  dbreturns() {
    return this.db;
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  addUser(
    name,
    email,
    address,
    city,
    state,
    postalcode,
    phone,
    capacity,
    lat,
    long,
    service,
    description
  ) {
    // if (!this.auth.currentUser) {
    //   return alert("Not authorized");
    // }

    // return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
    //   name,
    //   email,
    //   city,
    //   state,
    //   postalcode,
    // });
    const data = {
      name,
      address,
      email,
      city,
      state,
      postalcode,
      phone,
      capacity,
      lat,
      long,
      service,
      description,
      uid: new Date().getTime(),
    };

    // adding data here
    this.db
      .collection("users")
      .doc(data.uid.toString())
      .set(data)
      .then(() => {
        // NotificationManager.success("A new user has been added", "Success");
        alert("Sucess : New User Added");
        // window.location = "/";
      })
      .catch((error) => {
        // NotificationManager.error(error.message, "Create user failed");
        alert("Failure : New User NOT Added" + "  " + error);
        // this.setState({ isSubmitting: false });
      });
  }

  addCustomer(
    name,
    age,
    email,
    phone,
    city,
    state,
    postalcode,
    lat,
    long,
    complete,
    helped
  ) {
    const data = {
      name,
      age,
      email,
      phone,
      city,
      state,
      postalcode,
      lat,
      long,
      complete,
      helped,
      uid: new Date().getTime(),
    };

    // adding data here
    this.db
      .collection("customers")
      .doc(data.uid.toString())
      .set(data)
      .then(() => {
        // NotificationManager.success("A new user has been added", "Success");
        alert("Sucess : New Customer Added");
        // window.location = "/";
      })
      .catch((error) => {
        // NotificationManager.error(error.message, "Create user failed");
        alert("Failure : New Customer NOT Added" + "  " + error);
        // this.setState({ isSubmitting: false });
      });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.email;
  }

  // async getCurrentUserDetail(email) {
  //   await this.db
  //     .collection("users")
  //     .where("email", "==", `${email}`)
  //     .get()
  //     .then((querySnapshot) => {
  //       const data = querySnapshot.docs.map((doc) => doc.data());
  //       console.log(data);
  //       return data;
  //     });
  // }
}

export default new Firebase();
