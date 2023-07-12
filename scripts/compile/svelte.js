const logger = require('../utilities/logger');
const fs = require('fs');
const path = require('path');
const { webpack, EnvironmentPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SveltePreprocess = require('svelte-preprocess');

module.exports = {
    render(graphic) {
        logger.log('svelte', 'compiling');
        let done = false;

        const rootDir = __dirname.replace('/scripts/compile', '');
        const buildDir = path.join(rootDir, '.build', graphic.name);

        webpack({
            mode: graphic.dest == 'remote' ? 'production' : 'development',
            entry: path.join(rootDir, 'src', graphic.name, 'svelte/app.js'),
            output: {
                path: buildDir
            },
            resolve: {
                alias: {
                    svelte: path.resolve('node_modules', 'svelte/src/runtime')
                },
                extensions: ['.mjs', '.js', '.svelte'],
                mainFields: ['svelte', 'browser', 'module', 'main'],
                conditionNames: ['svelte', 'browser', 'import']
            },
            module: {
                rules: [
                    {
                        test: /\.(html|svelte)$/,
                        use: {
                            loader: 'svelte-loader',
                            options: {
                                emitCss: true,
                                preprocess: SveltePreprocess({
                                    scss: true,
                                    sass: true
                                })
                            }
                        }
                    },
                    {
                        test: /node_modules\/svelte\/.*\.mjs$/,
                        resolve: {
                            fullySpecified: true
                        }
                    },
                    {
                        test: /\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    url: false
                                }
                            }
                        ]
                    },
                    {
                        test: /\.ts$/,
                        use: 'ts-loader',
                        exclude: /node_modules/
                    },
                    {
                        test: /\.(scss|sass)$/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader
                            },
                            'css-loader',
                            'sass-loader'
                        ]
                    }
                ]
            },
            plugins: [
                new MiniCssExtractPlugin({ filename: 'main.css' }),
                new EnvironmentPlugin({
                    GRAPHIC_NAME: graphic.name,
                    ASSET_BASE: graphic.path
                })
            ]
        }).run((_, stats) => {
            if (stats.compilation.errors?.length) {
                console.log(stats.compilation.errors);
            }

            done = true;
        });

        require('deasync').loopWhile(function(){return !done;});

        if (!fs.existsSync(`.build/${graphic.name}/main.css`)) {
            fs.writeFileSync(`.build/${graphic.name}/main.css`, '/* Silence is golden */');
        }

        fs.writeFileSync(`${buildDir}/index.html`, `<div id="svelte-${graphic.name}"></div>`);

        logger.log('svelte', 'finished');

        return {
            js: ['main.js'],
            css: ['main.css'],
            html: 'index.html'
        }
    }
}