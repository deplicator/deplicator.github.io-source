var fs          = require('fs');
var metalsmith  = require('metalsmith');
var drafts      = require('metalsmith-drafts');
var collections = require('metalsmith-collections');
var markdown    = require('metalsmith-markdown');
var permalinks  = require('metalsmith-permalinks');
var archive     = require('metalsmith-archive');
var more        = require('metalsmith-more');
var tags        = require('metalsmith-tags');
var templates   = require('metalsmith-templates');
var handlebars  = require('handlebars');

handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
handlebars.registerPartial('navigation', fs.readFileSync(__dirname + '/templates/partials/navigation.hbt').toString());
handlebars.registerPartial('sidebar', fs.readFileSync(__dirname + '/templates/partials/sidebar.hbt').toString());

handlebars.registerHelper('betterDate', function(timestamp) {
    var theDaysILike = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satruday'];
    var theMonthsILike = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var day = timestamp.getDay();
    var month = timestamp.getMonth();
    var date = timestamp.getDate();
    var year = timestamp.getFullYear();
    return theDaysILike[day] + ', ' + theMonthsILike[month] + ' ' + date + ', ' + year;
});

handlebars.registerHelper('betterTags', function(tags) {
    var tagHtml = '';
    for(each in tags) {
        tagHtml += '<span class="tag"><a href="topics/' + tags[each] + '.html">' + tags[each] + '</a></span>'
    }
    return tagHtml;
});

// Converts tags metadata object into string and passes to template so it can turn it back into an object!
handlebars.registerHelper('tagCloud', function(tags) {
    var tagCloud = '[';
    for(each in tags) {
        tagCloud += '{"text": "' + each + '", "weight": ' + tags[each].length + ', "link": "topics/' + each.replace(/\s/g, '-') + '.html"}, ';
    }
    tagCloud = tagCloud.substring(0, tagCloud.length - 2);
    tagCloud += ']';
    return tagCloud;
});

// Add templates to files by directory.
var setTemplates = function(options) {
    return function(files, metalsmith, done) {
        for(var each in options) {
            for(var file in files) {
                if(file.substring(file.lastIndexOf('.')) === '.md') {
                    var currentdir = file.substring(0, file.lastIndexOf('/'));
                    if(currentdir === options[each].path && files[file].template === undefined) {
                        files[file].template = options[each].templateName;
                    }
                }
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

// fix paths to pictures
var fixImages = function(options) {
    return function(files, metalsmith, done) {
        for(var file in files) {
            var currentdir = file.substring(0, file.indexOf('/'));
            var re = new RegExp('<img src="../', 'g')
            if(currentdir === 'blog') {
                var content = files[file].contents.toString();
                content = content.replace(re, '<img src="../../');
                files[file].contents = new Buffer(content);
            } else if(file === 'index.html') {
                var content = files[file].contents.toString();
                content = content.replace(re, '<img src="');
                files[file].contents = new Buffer(content);
            }
        }
        done();
    };
};


metalsmith(__dirname)
    .destination('../deplicator.github.io')
    .metadata({
        site: {
            author: 'James Pryor',
            title: 'A Blog by James',
            url: 'http://deplicator.github.io'
        }
    })
    .use(drafts())
    .use(setTemplates({
        blog: {
            path: 'blog',
            templateName: 'post.hbt'
        },
        projects: {
            path: 'projects',
            templateName: 'project.hbt'
        },
        resumes: {
            path: 'resume',
            templateName: 'resume.hbt'
        }
    }))
    .use(collections({
        blog: {
            pattern: 'blog/*.md',
            reverse: true,
            sortBy: 'date'
        },
        projects: {
            pattern: 'projects/*.md',
            reverse: true,
            sortBy: 'date'
        }
    }))
    .use(markdown())
    .use(permalinks({
        pattern: ':collection/:title'
    }))
    .use(archive({
        collections: 'blog',
        groupByMonth: false
    }))
    .use(more())
    .use(tags({
        path: 'topics/:tag.html',
        template:'/topics.hbt',
        sortBy: 'date',
        reverse: true
    }))
    .use(templates({
        engine: 'handlebars',
        directory: 'templates'
    }))
    .use(fixImages())
//  .use(showMetadata())
    .build(function(err) {
        if (err) {
            console.log(err);
        }
    });
