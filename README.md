# The Markup Graphics Template

Structure and scripts for developing and deploying graphics on The Markup. 

## Philosophy Behind The Template

This template is a framework and structure for a collection of graphics. The concept is that for every story or project, this repository is duplicated into a project specific repo to get things started. As a result, only commit changes to this repo if you want them reflected in all graphics repos going forward.

If everything works correctly you can ignore the `scripts` folder (a series of Node scripts that compile, watch and deploy). The `src` folder is where the source files for your graphic, or if you have more than one graphics, live.

An individual graphic's source files are made up of Handlebars templates, SCSS files, and an ES6 Webpack app. There is also an optional `data/data.js` file which is an optional node script you can modify on a graphic-by-graphic basis to pass in different data to the Handlebars template. This can be used in different ways. It could be something simple like importing a csv file and cleaning it up for the frontend. Alternatively, it could be running `JSDOM` and `D3` to precompile more complex graphics so that the client isn't burdened with this.

The philosophy here is that everything should be as light and as simple as possible for the client. Which is why, to date, we don't run Vue or React and we try to avoid sending big libraries like D3 in a bundled app. This is reflected in how The Markup's CMS expects graphics to be delivered, which is a series of static files on S3 – all something taken care of when you run `npm run deploy` from this repo.

## Requirements

- [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) 
- [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/install-macos.html#install-bundle-macos)
- [jq](https://stedolan.github.io/jq/download/)

## Setting up your graphic

First, you'll want to run `npm install` to get all dependencies.

If starting a new project you'll need to set a few parameters in `config.json`.

| Key       | What does it do? |
| --------- | ------------ |
| `name`    | The most important setting. This determines where the interactive is uploaded to. Make sure it's something descriptive and unique |
| `heading` | Only used for preview purposes when `type` is set to `inline` |
| `source`  | Only used for preview purposes when `type` is set to `inline` |
| `align`    | Set the alignment. Only used to determine how to preview it locally. Options are currently: `inline`, `left`, `right`, `full-width` |
| `bespoke`  | Boolean used to determine whether graphic should be on a bespoke page or not |


## Usage

- `npm run start` - For development. This compiles and then watches for changes within the `src` folder. It uses BrowerSync to locally host a preview.
- `npm run deploy` - If you're ready to go run this to deploy. It will have to re-compile everything first, but then it will use your default aws credentials to upload. These can be set with the [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/install-macos.html#install-bundle-macos)
- `npm run list` - This will return a list of previously deployed version numbers. You'll want these if you have to revert to an older version

## Template structure

There are two main sections to the template, represented by the two root level folders. `scripts` and `src`.

`scripts` contains all scripts that are run through `npm run` commands. They deal with compiling assets, watching for changes, copying files, deploying and more. You shouldn't really have to touch these while working on a graphic. If you do it's probably because something is broken or a script needs optimising. If it's the latter, and it makes sense to, make a PR to the main template so everyone can benefit from the improvement.

`src` is where your graphic code actually lives. Multiple folders contain different parts of the graphic that are later compiled...

| Folder Name  | What's in it |
| ------------ | ------------ |
| `assets`     | Place any additional assets, like images, in here and they'll get uploaded with the rest of the graphic. These will uploaded into an `/assets/` folder which you can reference in handlebars with `{{ path }}`. |
| `data`       | This is the place to store data and if needed using `clean.js` filter and clean any data. The returned value set in `clean.js` will be accessible by the handlebars templates |
| `javascript` | Javascript compiled using webpack sits in here. Any js files placed in the root of this folder will export as a unique javascript file. Any js files placed in newly created folders will be ignored but can imported through a root level js file. |
| `sass`       | We use Sass to write our css. This is inlined on the page so it will all get bundled together but like javascript you can export multiple css files by having multiple root level files here |
| `templates`  | Here are the handlebars templates. `index.html` is the only template that's generated but you can reference other html files placed in here as includes. |

