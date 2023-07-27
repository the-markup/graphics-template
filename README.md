# The Markup Graphics Template

Structure and scripts for developing and deploying graphics on The Markup.

## Dependencies

* [node.js](https://nodejs.org/) v14 (use [`nvm`](#using-nvm) to adjust your version if necessary)

## Creating a new graphic

1. Open Terminal
2. Clone the [graphics-template](https://github.com/the-markup/graphics-template) repo (or clone another existing graphic you want to adapt/reuse):

```
git clone git@github.com:the-markup/graphics-template.git
mv graphics-template graphics-2021-blobs
cd graphics-2021-blobs
npm install
```

The rest of the commands assume you are in the newly cloned + renamed folder.

## Create a new GitHub repo

1. [Create a fresh GitHub repo](https://github.com/new) in `the-markup` organization, with `graphics-` in the beginning of the name (required for the security settings to work properly).
2. Copy the repository URL (something like `git@github.com...`).
3. Update your newly cloned graphic to use that repo URL.

```
git remote set-url origin [paste your URL here]
git remote -v
```

Confirm that it's pointing at your newly created repository. It should look something like this:

```
origin	git@github.com:the-markup/graphics-2021-blobs.git (fetch)
origin	git@github.com:the-markup/graphics-2021-blobs.git (push)
```

Push your freshly copied template to GitHub.

```
git push -u origin main
```

## Manage repo access

Go to the __Settings__ tab of your new repo and click on __Manage access__. Click on the __Add teams__ button and add `the-markup/graphics` team.

## Edit and test the graphic

At this point you should try adding/editing files in the `src/[graphic name]` folder and then see if you can get it to compile: `npm run compile`.

You can test the graphic in a web browser by running `npm start` and then visiting [http://localhost:5001](http://localhost:5001).

The `src/[graphic name]` is meaningful for the CMS, so you should start by renaming the `src/graphic` to something more meaningful, like `src/bar-graph`. You can put more than one graphic folder under `src`, which can be helpful for grouping graphics associated with an article.

## Graphic configuration

You can adjust some parameters for the sake of testing locally in `config.json`.

| Key              | What does it do?                                                                                                                           |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `name`           | The most important setting. This determines where the interactive is uploaded. Make sure it's something descriptive and unique.         |
| `heading`        | Only used for preview purposes.                                                                                                            |
| `source`         | Only used for preview purposes.                                                                                                            |
| `align`          | Set the alignment. Only used to determine how to preview it locally. Options are currently: `inline`, `left`, `right`, `full-width`.       |
| `bespoke`        | Boolean used to determine whether graphic should be on a bespoke page.                                                                     |
| `screen_capture` | Set this to `false` if you have any troubles with the screengrab process; it can sometimes crash unexpectedly.                             |
| `svelte`         | Set this to `true` if you want to use Svelte. Use the `svelte` directory instead of the `javascript`, `sass`, and `templates` directories. |

## Updating forks with changes from `graphics-template`

If your fork has become disconnected from the base template, you can pull in new changes with the following commands:

```bash
git remote add upstream git@github.com:the-markup/graphics-template.git
git fetch --all
git merge upstream/main
```

Then, resolve any merge conflicts. It may result in files being created in the default `graphic/` directory. You can choose how to merge those into your graphics.

## Deploying

Go to the Actions tab of your graphics repo. You should see that whenever you push a commit to the `main` branch, your graphics will get deployed to the staging CMS.

In order to deploy your graphics to Production:

1. Click on "Trigger Manual Deploy to Production".
2. Click the "Run workflow" dropdown.
3. Select which branch you want to deploy.
4. Click the "Run workflow" button.

## Using Svelte

> **Warning**
> Svelte support is optional and experimental. Please [report](https://github.com/the-markup/graphics-template/issues/new) or fix any issues you encounter.

Your graphic can use [Svelte](https://svelte.dev/), a JavaScript framework for elegantly building reactive web apps. To get started, enable the option in `config.json` and open `App.svelte`. This file serves as the entry point to your graphic, the way `index.html` used to. You can create and import other components, JavaScript, and CSS files.

When using Svelte, there are several environment variables you can use.

| Variable                   | Purpose                                            | Example                                                                                                             |
|----------------------------|----------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| `process.env.GRAPHIC_NAME` | The name of the graphic                            | `'graphic'`                                                                                                         |
| `process.env.GRAPHIC_PATH`   | Base path/URL for files in the `assets/` directory | `'https://mrkp-static-production.themarkup.org/graphics/blacklight-client_blacklight-client/1688144961393/assets/'` |

## Using `nvm`

Check which version of node.js you have installed:

```
node --version
```

If you're not using v14, you can use [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating) to download/install it. In the process of installing `nvm`, you'll be asked to adjust your `.bashrc` or  `.zshrc` file. Once you open a new terminal window, you should be able to download and activate a new version of node.js like this (using the version configured in the `.nvmrc` file):

```
cd graphics-2021-blobs
nvm use
```

## Philosophy behind the template

This template is a framework and structure for a collection of graphics. The concept is that for every story or project, this repository is duplicated into a project-specific repo to get things started. As a result, only commit changes to this repo if you want them reflected in all graphics repos going forward.

If everything works correctly, you can ignore the `scripts` folder (a series of Node scripts that compile, watch, and deploy). The `src` folder is where the source files for your graphic, or graphics, live.

An individual graphic's source files are made up of Handlebars templates, SCSS files, and an ES6 Webpack app. There is also an optional `data/data.js` file which is an optional node script you can modify on a graphic-by-graphic basis to pass different data to the Handlebars template. This can be used in different ways. It could be something simple like importing a csv file and cleaning it up for the front end. Alternatively, it could be running `JSDOM` and `D3` to precompile more complex graphics so that the client isn't burdened with this.

The philosophy here is that everything should be as light and as simple as possible for the client. Which is why, to date, we don't run Vue or React and we try to avoid sending big libraries like D3 in a bundled app.

## Template structure

There are two main sections to the template, represented by the two root level folders: `scripts` and `src`.

`scripts` contains all scripts that are run through `npm run` commands. They deal with compiling assets, watching for changes, copying files, deploying, and more. You shouldn't really have to touch these while working on a graphic. If you do, it's probably because something is broken or a script needs optimising. If it's the latter, and it makes sense to, make a pull request to the main template so everyone can benefit from the improvement.

`src` is where your graphic code actually lives. Multiple folders contain different parts of the graphic that are later compiled...

| Folder name  | What's in it                                                                                                                                                                                                                                        |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `assets`     | Place any additional assets, like images, in here, and they'll get uploaded with the rest of the graphic. These will be uploaded into an `/assets/` folder, which you can reference in handlebars with `{{ path }}`.                                     |
| `data`       | This is the place to store data and, if needed, use `clean.js` filter and clean any data. The returned value set in `clean.js` will be accessible by the handlebars templates.                                                                       |
| `javascript` | Javascript compiled using webpack sits in here. Any js files placed in the root of this folder will export as a unique javascript file. Any js files placed in newly created folders will be ignored but can be imported through a root level js file. |
| `sass`       | We use Sass to write our css. This is inlined on the page so it will all get bundled together, but like JavaScript you can export multiple css files by having multiple root level files here.                                                        |
| `templates`  | Here are the handlebars templates. `index.html` is the only template that's generated, but you can reference other html files placed in here as includes.                                                                                            |
| `svelte`     | Contains files for a Svelte project. The only required file is `App.svelte`, which will be loaded onto the page.                                                                                                                                    |
