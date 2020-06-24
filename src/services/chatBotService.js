import request from "request";

require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;


let getFacebookUsername = (sender_psid) => {
    return new Promise((resolve, reject) => {
        // Send the HTTP request to the Messenger Platform
        let uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`;
        request({
            "uri": uri,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                //convert string to json object
                body = JSON.parse(body);
                let username = `${body.first_name} ${body.last_name}`;
                resolve(username);
            } else {
                reject("Unable to send message:" + err);
            }
        });
    });
};

let sendResponseWelcomeNewCustomer = (username, sender_psid) => {
    return new Promise( async (resolve, reject) => {
        let response_first = { "text": `Welcome ${username} to Police Help! ` };
        let response_second = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is the situation urgent?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": "https://bit.ly/imageToSend",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Urgent",
                                "payload": "URGENT",
                            },
                            {
                                "type": "postback",
                                "title": "Not Urgent",
                                "payload": "NOT_URGENT",
                            }
                        ],
                    }]
                }
            }
        };

        //send a welcome message
        await sendMessage(sender_psid, response_first);

        //send a image with button view main menu
        await sendMesssage(sender_psid,response_second);
    });

}

let sendMessage = (sender_id, response) => {
    let request_body = {
        "recipient": {
          "id": sender_psid
        },
        "message": response
      }
    
      // Send the HTTP request to the Messenger Platform
      request({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
      }, (err, res, body) => {
        if (!err) {
          console.log('message sent!')
        } else {
          console.error("Unable to send message:" + err);
        }
      });  
};

module.exports = {
    getFacebookUsername: getFacebookUsername,
    sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer
};