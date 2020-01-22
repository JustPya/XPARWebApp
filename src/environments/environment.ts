// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // Users
	urlLogin: "http://localhost:3000/auth/login",
	urlGetAllAdmin: "http://localhost:3000/auth/",
	urlUpdateAdmin: "http://localhost:3000/auth/username",
	urlDeleteAdmin: "http://localhost:3000/auth",
	urlCreateAdmin: "http://localhost:3000/auth",

	// Bands
	urlGetAllBands: "http://localhost:3000/band",
	urlUpdateBand: "http://localhost:3000/band",
	urlCreateBand: "http://localhost:3000/band",
	urlDeleteBand: "http://localhost:3000/band",

	// Songs
	urlGetAllSongs: "http://localhost:3000/song",
	urlCreateSong: "http://localhost:3000/song",
	urlUpdateSong: "http://localhost:3000/song",
	urlDeleteSong: "http://localhost:3000/song",

	// Resources
	urlGetAllResources: "http://localhost:3000/resource",
	urlCreateResource: "http://localhost:3000/resource",
	urlUpdateResource: "http://localhost:3000/resource",
	urlDeleteResource: "http://localhost:3000/resource",

	// Instruments
	urlGetAllInstruments: "http://localhost:3000/inst",
	urlCreateInstrument: "http://localhost:3000/inst",
	urlUpdateInstrument: "http://localhost:3000/inst",
	urlDeleteInstrument: "http://localhost:3000/inst",

	// Upload
	urlUploadVideo: "http://localhost:3000/upload/video",
	urlUpdateUploadResource: "http://localhost:3000/upload/update-resource"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
