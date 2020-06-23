  
// import homepageService from "../services/homepageService";

//import request from "request";
require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let getHomePage = (req, res) => {
    return res.render("homepage.ejs");
};

let getFacebookUserProfile=(req,res)=>{
    return res.render("profile.ejs");
};

let setUpUserFacebookProfile = async (req, res) => {

    // Send the HTTP request to the Messenger Platform

    let data={
        "get_started":{
            "payload":"GET_STARTED"
        },
        "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "Talk to an agent",
                        "payload": "CARE_HELP"
                    },
                    {
                        "type": "postback",
                        "title": "Outfit suggestions",
                        "payload": "CURATION"
                    },
                    {
                        "type": "web_url",
                        "title": "Shop now",
                        "url": "https://www.originalcoastclothing.com/",
                        "webview_height_ratio": "full"
                    }
                ]
            }
        ],
        "whitelisted_domains":[
            "policehelphackathon.herokuapp.com"
        ]
    };

    request({
        "uri": "https://graph.facebook.com/v6.0/me/messenger_profile",
        "method": "POST",
        "json": data
    }, (err, res, body) => {
        if (!err) {
        return res.status(200).json({
            message: "setup done"
        })
        } else {
        return res.status(500).json({
            "message":"Error from the node server"
        })
        }
    }); 
    // Send the HTTP request to the Messenger Platform
    try{
        await homepageService.setUpMessengerPlatform(PAGE_ACCESS_TOKEN);
        return res.status(200).json({
            message: "OK"
        });
    }catch (e) {
        return res.status(500).json({
            "message": "Error from the node server"
        })
    }
};



module.exports = {
    getHomePage: getHomePage,
    getFacebookUserProfile: getFacebookUserProfile,
    setUpUserFacebookProfile: setUpUserFacebookProfile
};