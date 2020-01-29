# The Markup Graphics Template

Structure and scripts for developing and deploying graphics on The Markup. To use, duplicate into a project specific repo. Only commit changes to this that you want to be reflected in future graphics.

## Requirements

- [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) 
- [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/install-macos.html#install-bundle-macos)
- [jq](https://stedolan.github.io/jq/download/)

## Setting up your graphic

First, you'll want to run `npm install` to get all dependencies.

If starting a new project you'll need to set a few parameters in `config.json`.

| `name` | The most important setting. This determines where the interactive is uploaded to. Make sure it's something descriptive and unique |
| `type` | Set the type of interactive. Only used to determine how to preview it locally. Options are currently: `inline` |
| `heading` | Only used for preview purposes when `type` is set to `inline` |
| `source` | Only used for preview purposes when `type` is set to `inline` |

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

