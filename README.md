# express-dot-example
Project for demonstrating how to integrate dotJS with expressJS with pre-rendering and best practices

## How to use
Just clone the repo and `npm install`. 

This will build the dotJS templates as well, thanks to the `postinstall` script included.

For development, `npm run dev` (uses nodemon with .jst and .def extensions added, recompiles all templates on any change)
For production,  `npm start` (compiles the templates only if the build folder does not exist)

## How is this project different?

This project follows the approach given at [the official dotJS express example](https://github.com/olado/doT/tree/master/examples/express) and builds upon it.

Different from the official example, this project seperates the dotjs build and source folders, proposes a way to set dotJS as the express view engine. Also nodemon is set up to work with .jst and .def files. Lastly, it also gives a structure of when and how to compile the templates in terms of achieving the best performance in dev/prod scenarios.

With this setup, dotJS templates are compiled when,
1. `npm install` is done.
2. app is starting in dev mode
3. app is starting in prod mode without `.dotjs_build/` folder

such that no unnecessary compilations is done in production.

## How does it work?

When any of the three scenarios above is realized, dotJS package is used for compiling the templates. Files with `.jst` extension are the base files to be converted into standart javascript files. Files with `.def` extension can be used for defining partials. Partials defined within `.def` files cannot be reached explicitly but only can be used in `.jst` files.

Compiled `.jst` templates are put into the folder `.dotjs_build/` in javascript format, with their respective names.

In runtime, a helper script `renderTemplates.js` scans the `.dotjs_build/` folder and exposes an object of template functions for easy and fast access. Then, this object is used for registering express a template engine.

## Compatibility

This project uses const-let declarations and arrow functions. While I have not tried myself, [NodeJS ES6 Compatibility Page](https://node.green) shows that these functionalities should be fine with NodeJS 6.4.0 and upper.

## Contribution

There might be problems with this repo in terms of raw performance or organization aspects. Feel free to open an issue to discuss.
