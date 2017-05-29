# AroundTheWorld

window.location.replace(...)
window.location.href = 'newPage.html';
$(location).attr('href', 'http://stackoverflow.com')


window.location.replace('http://www.example.com')
window.location.assign('http://www.example.com')
window.location.href = 'http://www.example.com'
document.location.href = '/path'

// window.history
window.history.back()
window.history.go(-1)

// window.navigate; ONLY for old versions of Internet Explorer
window.navigate('top.jsp')


// Probably no bueno
self.location = 'http://www.example.com';
top.location = 'http://www.example.com';

// jQuery
$(location).attr('href','http://www.example.com')
$(window).attr('location','http://www.example.com')
$(location).prop('href', 'http://www.example.com')

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
