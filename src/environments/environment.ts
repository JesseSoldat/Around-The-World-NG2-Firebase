// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
	firebase: {
	  apiKey: "AIzaSyBcDhfji5499fBObaKQtVj2fygUdaE0xiI",
	  authDomain: "angularfire-ab896.firebaseapp.com",
	  databaseURL: "https://angularfire-ab896.firebaseio.com",
	  projectId: "angularfire-ab896",
	  storageBucket: "angularfire-ab896.appspot.com",
	  messagingSenderId: "642273660133"
	}
};