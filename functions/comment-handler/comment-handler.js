var request = require("request");

// populate environment variables locally.
require('dotenv').config()

const URL = "https://jamstack-comments.netlify.com";
const fetch = require('node-fetch')

/*
  Our serverless function handler
*/
export async function handler(event, context) {
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
    await fetch(slackURL, {
      method: 'POST',
      body: JSON.stringify({
        text: body.text,
      }),
    })
    return { statusCode: 204, body: `Post to Slack successful!`}
  } catch (error) {
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