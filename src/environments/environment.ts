// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from "./interface";

// export const environment: Environment = {
//   production: false,
//   apiKey: 'AIzaSyB5YhvZRUkKTrIqny9pCsV9or0K7_Hm8VM'
// };

export const environment: Environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyB5YhvZRUkKTrIqny9pCsV9or0K7_Hm8VM",
    authDomain: "angular-studio-3333b.firebaseapp.com",
    databaseURL: "https://angular-studio-3333b-default-rtdb.firebaseio.com",
    projectId: "angular-studio-3333b",
    storageBucket: "angular-studio-3333b.appspot.com",
    messagingSenderId: "380773113597",
    appId: "1:380773113597:web:3495d1885b43898c9f2894"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
