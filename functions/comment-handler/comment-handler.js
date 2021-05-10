var request = require("request");

// populate environment variables locally.
require('dotenv').config()

const URL = "https://jamstack-comments.netlify.com";
const fetch = require('node-fetch')

/*
  Our serverless function handler
*/
const handler = async(event, context) => {
  // get the arguments from the notification
  var body = JSON.parse(event.body);

  console.log(body);
  // prepare call to the Slack API
  var slackURL = process.env.SLACK_WEBHOOK_URL
  // var slackPayload = {
  //   "text": "New comment on " + URL,
	//   "attachments": [
  //     {
  //       "fallback": "New comment on the comment example site",
  //       "color": "#444",
  //       "author_name": body.data.email,
  //       "title": body.data.path,
  //       "title_link": URL + body.data.path,
  //       "text": body.data.comment
  //     },
  //     {
  //       "fallback": "Manage comments on " + URL,
  //       "callback_id": "comment-action",
  //       "actions": [
  //         {
  //           "type": "button",
  //           "text": "Approve comment",
  //           "name": "approve",
  //           "value": body.id
  //         },
  //         {
  //           "type": "button",
  //           "style": "danger",
  //           "text": "Delete comment",
  //           "name": "delete",
  //           "value": body.id
  //         }
  //       ]
  //     }]
  //   };

//    console.log(slackPayload);
  try {
    // post the notification to Slack
    const fetchResponse = await fetch(slackURL, {
      method: 'POST',
      body: JSON.stringify({
        text: `New comment on ${body.site_url}`,
        attachments: [
          {
            fallback: "New comment on the blog site",
            color: "#444",
            author_name: body.data.email,
            title: body.data.path,
            title_link: `${body.site_url}${body.data.path}`,
            text: body.data.comment,
          },
          {
            fallback: `Manage comments on ${body.site_url}`,
            callback_id: "comment-action",
            actions: [
              {
                type: "button",
                text: "Approve comment",
                name: "approve",
                value: body.id
              },
              {
                type: "button",
                style: "danger",
                text: "Delete comment",
                name: "delete",
                value: body.id,
              }
            ],
          },
        ],
      }),
    });
    if (!fetchResponse.ok) {
      //console.log(`Server error ${fetchResponse.status}`);
      throw new Error(`Server error ${fetchResponse.status}`);
    }
    //console.log(`success: ${data}`);
    return { statusCode: 200, body: `Post to Slack successful!`}
  } catch (error) {
    console.log(`Internal Server Error: ${error}`)
    return { statusCode: 500, body: `Internal Server Error: ${error}` }
  }
//     request.post({url:slackURL, json: slackPayload}, function(err, httpResponse, body) {
//       var msg;
//       if (err) {
//         msg = 'Post to Slack failed:' + err;
//       } else {
//         msg = 'Post to Slack successful!  Server responded with:' + body;
//       }
//       callback(null, {
//         statusCode: 200,
//         body: msg
//       })
//       return console.log(msg);
//     });
// return { statusCode: 200, body: slackURL}
}

//export default { handler }
module.exports = { handler }

// {
//   number: 20,
//   title: null,
//   email: 'dave@arkells.net',
//   name: 'asdf',
//   first_name: 'asdf',
//   last_name: null,
//   company: null,
//   summary: 'asdf',
//   body: 'asdf',
//   data: {
//     path: '/posts/2012-01-10-freshly-installed-jekyll/',
//     Comment: 'asdf',
//     Name: 'asdf',
//     Email: 'dave@arkells.net',
//     Website: '',
//     ip: '82.69.35.188',
//     user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:88.0) Gecko/20100101 Firefox/88.0',
//     referrer: 'https://blog.burpydave.uk/posts/2012-01-10-freshly-installed-jekyll/'
//   },
//   created_at: '2021-05-09T22:23:38.768Z',
//   human_fields: {
//     Path: '/posts/2012-01-10-freshly-installed-jekyll/',
//     Comment: 'asdf',
//     Name: 'asdf',
//     Email: 'dave@arkells.net',
//     Website: ''
//   },
//   ordered_human_fields: [
//     {
//       title: 'Path',
//       name: 'path',
//       value: '/posts/2012-01-10-freshly-installed-jekyll/'
//     },
//     { title: 'Comment', name: 'Comment', value: 'asdf' },
//     { title: 'Name', name: 'Name', value: 'asdf' },
//     { title: 'Email', name: 'Email', value: 'dave@arkells.net' },
//     { title: 'Website', name: 'Website', value: '' }
//   ],
//   id: '609860ea339167f5703b8859',
//   form_id: '6098164566292b0007fad431',
//   site_url: 'https://blog.burpydave.uk',
//   form_name: 'Comments'
// }