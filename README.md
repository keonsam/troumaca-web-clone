# **TroumacaWeb**

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0.

**TroumacaWeb** is the web user interface of the Troumaca application.  **Troumaca** is an asset system that allows 
individuals or organizations to be more effective owner of things, i.e. assets.  **Troumaca** is optimized to make it easy to 
perform the activities associated with assets. For example, receiving, tagging, tracking, assigning and from receiving to 
disposal and disposing, to name a few.  

## Development server
The goal is to allow for **Troumaca Web** to development independently of the actual backend layer.  The web layer encompass 
the in browser part of the application and the server side application it interacts with.

Depending on the objective there are a number of ways in which you can start **Troumaca Web**:
 
**npm run startServersWithProxy**
This starts the lite server wit a proxy configuration and the back end server 

**npm run startServerWithProxy**
This starts the lite server wit a proxy configuration

**npm run startBackEnd**
This starts the back end


You can also Run `ng serve` for a dev server only.

Navigate to `http://localhost:4200/` to view the Web Ui. The app will automatically reload if you change any of the source files.

Access the API via `http://localhost:3000/`


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build. 
Be aware that this will not include the backend code at this time.

## Running unit tests

Run `ng test.ts` to execute the unit tests via [Karma](https://karma-runner.github.io).

You can also run `npm test`. 

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Add Express
https://www.djamware.com/post/58e0d15280aca75cdc948e4e/building-chat-application-using-mean-stack-angular-4-and-socketio

Note:
Certain services are treated as global dependencies
- AuthGuard
- Logging
- Event
