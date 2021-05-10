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
            author_name: body.data.Email,
            title: body.data.path,
            title_link: `${body.site_url}${body.data.path}`,
            text: body.data.Comment,
          },
          {
            fallback: `Manage comments on ${body.site_url}`,
            callback_id: "comment-action",
            actions: [
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
      throw new Error(`Server error ${fetchResponse.status}`);
    }
    //console.log(`success: ${data}`);
    return { statusCode: 200, body: `Post to Slack successful!`}
  } catch (error) {
    console.log(`Internal Server Error: ${error}`)
    return { statusCode: 500, body: `Internal Server Error: ${error}` }
  }
}

module.exports = { handler }