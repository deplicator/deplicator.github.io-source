var fs          = require('fs');
var metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var templates   = require('metalsmith-templates');
var handlebars  = require('handlebars');

// Change between local dev or production.
var url = 'https://deplicator.github.io'
process.argv.forEach(function (val, index, array) {
    if (index == 2) {
        url = 'http://homeserver/dev/deplicator.github.io'
    }
});

// Did we build for local or github pages?
console.log(url);

// Add templates to files if necessary.
var setTemplates = function(options) {
    return function(files, metalsmith, done) {
        for(var file in files) {
            if(file.substring(file.lastIndexOf('.')) === '.md' /*&& file.substring(0,6) === 'resume'*/) {
                files[file].template = 'index.hbt';
            }
        }
        done();
    };
};

// Let me see the metadata!
var showMetadata = function(something) {
    return function(files, metalsmith, done) {
        console.log(metalsmith.metadata());
        for(var file in files) {
            console.log('KEY: ' + file);
            console.log('VALUES: ', files[file], '\n\n');
        }
        done();
    };
};

metalsmith(__dirname)
    .destination('../deplicator.github.io')
    .metadata({
        site: {
            author: 'James Pryor',
            title: 'resume',
            url: url
        }
    })
    .use(setTemplates())
    .use(markdown())
    .use(templates({
        engine: 'handlebars',
        directory: 'templates'
    }))
    //.use(showMetadata())
    .build(function(err) {
        if (err) {
            console.log(err);
        }
    });
