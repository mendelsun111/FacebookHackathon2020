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
    return new Promise(async (resolve, reject) => {
        try {
            let response_first = { "text": `Welcome ${username} to Police Help!` };
            let response_second = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "How can we help you today?",
                            "image_url": "https://scontent.fybz2-1.fna.fbcdn.net/v/t1.15752-0/p280x280/105384837_275070350236122_6162302596554889487_n.png?_nc_cat=109&_nc_sid=b96e70&_nc_ohc=rkrqCWLHGTgAX-h7hsX&_nc_ht=scontent.fybz2-1.fna&oh=44d93fa8e15621eb0fec077625dfd1f3&oe=5F1AA983",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Emergency",
                                    "payload": "EMERGENCY",
                                },
                                {
                                    "type": "postback",
                                    "title": "Report Incident",
                                    "payload": "REPORT_INCIDENT",
                                }
                            ],
                        }]
                    }
                }
            };

            //send a welcome message
            await sendMessage(sender_psid, response_first);

            //send a image with button view main menu
            await sendMessage(sender_psid, response_second);

            resolve("done!");
        } catch (e) {
            reject(e);
        }

    });
};


let reportIncident = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = { text: "We will ask you some questions about the incident. If possible, please provide us with as much detail as possible." };
            let response_second = { text: "What time did the incident occur?" };

            await sendMessage(sender_psid, response);

            //Delay this function, otherwise it will appear before the previous message.
            setTimeout(await sendMessage(sender_psid, response_second), 1000);


        } catch (e) {
            reject(e);
        }

    });

};

let askIncidentDetail = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = { text: "Please provide the information below: \n1. Location of the Incident. \n2. Who are you? \n3. Please provide your phone number so we can contact you. \n4. Who was present? \n5. What happened? \n5End your report with 'DONE'" };

            await sendMessage(sender_psid, response);

        } catch (e) {
            reject(e);
        }

    });

};

let sendMessage = (sender_psid, response) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    console.log('message sent!');
                    resolve("done");;
                } else {
                    reject("Unable to send message:" + err);
                }
            });

        } catch (e) {
            reject(e);

        }

    })

};

//Quick replies
let safetyCheckEmergency = (sender_psid) => {
    let request_body = {
        "recipient": { "id": sender_psid },
        "messaging_type": "RESPONSE",
        "message": {
            "text": "Are you safe?",
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "NO",
                    "payload": "EMERGENCY_DANGER",
                    "image_url": "https://www.colorcombos.com/images/colors/FF1A00.png"
                }, {
                    "content_type": "text",
                    "title": "YES",
                    "payload": "EMERGENCY_SAFE",
                    "image_url": "https://wallpaperplay.com/walls/full/6/7/3/73723.jpg"
                }
            ]
        }
    };

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

//Call police if person not safe
let callPolice = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = { text: "Call 911 NOW!" };

            await sendMessage(sender_psid, response);

            resolve("done!");

        } catch (e) {
            reject(e);
        }

    });

};

let askPhoneNumber = (sender_psid) => {
    let request_body = {
        "recipient": { "id": sender_psid },
        "messaging_type": "RESPONSE",
        "message": {
            "text": "What is your phone number?",
            "quick_replies": [
                {
                    "content_type": "user_phone_number",
                }
            ]
        }
    };

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

let sendFinalReport = async (sender_psid) => {
    try {
        let response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Your report has been submitted, we will contact you as soon as possible. \n\nTo send another report, please press the button below.",
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Emergency",
                            "payload": "EMERGENCY",
                        },
                        {
                            "type": "postback",
                            "title": "Report Incident",
                            "payload": "REPORT_INCIDENT",
                        }
                    ],
                }
            }
        };

        await sendMessage(sender_psid, response);

    } catch (e) {
        console.log(e);
    }

};

module.exports = {
    getFacebookUsername: getFacebookUsername,
    sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer,
    reportIncident: reportIncident,
    sendMessage: sendMessage,
    safetyCheckEmergency: safetyCheckEmergency,
    callPolice: callPolice,
    askPhoneNumber: askPhoneNumber,
    sendFinalReport: sendFinalReport,
    askIncidentDetail: askIncidentDetail
};