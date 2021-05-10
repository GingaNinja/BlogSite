var gulp = require('gulp'),
request = require('request'),
fs = require('fs'),
config = require('dotenv').config();
const gravatar = require('gravatar');

var buildSrc = "./";

gulp.task("get-comments", function (done) {
    // set up the request with appropriate auth token and Form ID
    var url = `https://api.netlify.com/api/v1/forms/${process.env.COMMENT_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`;
    // get the data from Netlify's submissions API
    request(url, function(err, response, body) {
        if(!err && response.statusCode === 200) {
            console.log("Submissions found");
            var body = JSON.parse(body);
            var comments = {};
            // shape the data
            for (var item in body) {
                var data = body[item].data;
                var email = data.Email;
                var comment = {
                    name: data.Name,
                    avatar: gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, true),
                    comment: data.Comment.trim(),
                    path: data.path,
                    date: body[item].created_at
                };
                if(comments[data.path]){
                    comments[data.path].push(comment);
                } else {
                    comments[data.path] = [comment];
                }
            }
            // write our data to a file where Hugo can get it.
            fs.writeFile(buildSrc + "data/comments.json", JSON.stringify(comments, null, 2), function(err) {
                if(err) {
                    console.log(err);
                    done();
                } else {
                    console.log("Comments data saved.");
                    done();
                }
            });
        } else {
            console.log("Couldn't get comments from Netlify");
            done();
        }
    });
});

gulp.task('dev', gulp.series('get-comments'));

gulp.task('build', gulp.series('get-comments'));