# walkme

walkme is a JavaScript library for writing flows/walkthroughs/enriched readme.

## Use case
* Imagine a complex application, new joiners or team mates who started working on this application with zero knowledge might not know -
  * how application works?
  * what's the architecture behind app? 
  * why it was built for ?..etc.

* Isn’t it would be cool if there is an documentation in place with which helps user to understand better about the app.

* This package which helps user to write walk through / tour about application.

* [Sample App with source code](https://github.com/gouthamT/pokedex)

* [example App](https://gouthamt.github.io/pokedex/)  --> [Demo walkme App](https://gouthamt.github.io/walkme-sample-app/)

## Installation

`npm i -D walkme`

`node node_modules\walkme\initWalkme`

* After executing above commands `quarry.js` file will be created under walkme folder.

* update the start function code snippet.

* make sure to update your root html file (or) import `node_modules\walk-me\walk-me-relay.js` file in dev mode only.


```
// in index.js
if (process.env.NODE_ENV === 'development') {
  import('walk-me/walk-me-relay')
}
```

## Launch walkme

`npm run start:Walkme` 

or 

`node node_modules\walk-me\startWalkme`
