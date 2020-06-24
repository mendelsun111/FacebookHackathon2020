# facebookhackathon2020

https://www.youtube.com/watch?v=kBq6ZTchv9c

Inspiration
Here's our idea: what if... what if... instead of calling 911, you could send them a text directly through messenger. Under stress and pressure, it is often very hard to communicate important information. This is why quick and accurate information is necessary. In fact, messenger's quick replies simplifies the process by a lot while still being accurate. Just tap a few buttons and police will have a great understanding of what's happening.

What it does
So what does our facebook messenger chatbot do?

evaluates your emergency level
establish the necessary information needed to provide help (using facebook quick replies)
We wanted it to be very simple. Being complicated wouldn't make any sense.

How we built it
We built it with blood, sweat and tears. haha just kidding (not really, but let's go to the main points).

Create a facebook page
Facebook for developers tools
Set up a server
Deploy app using node.js/express.js/heroku
Set up webhooks & app
Javascript code and requests
Design and rethink
Fix bugs (throughout 1-7)
Challenges we ran into
We had to learn on everything from scratch. Setting up a server and deploying it was our first challenge. We ran into many problems, but we never gave up (lots of stackoverflow, youtube tutorials and documentation reading). We encountered merge conflicts (you can't run away from that). It was a first for us and we learned a lot. We also wanted to add send live location feature, but it has be discontinued during 2019. Hopefully, this function could be added back as it could be very useful. Because of this, calling 911 in emergency would make more sense, but we did filter out the non-emergencies one. This will attenuate loads calls of 911 as the non-emergencies one could be handled separately.

Accomplishments that we're proud of
We are happy to say that we built it without prior knowledge to facebook bot api, pages, servers, etc. At the end of this project, we can proudly say that it was challenging, but very fulfilling. Always remember: there's a first for everyone. So definitely never give up even if you don't understand.

Make the unknown known, and make the known into knowledge.

Built using HaryPhamDev's tutorial:https://www.youtube.com/watch?v=x_0X3EHmIu4
What we learned
So what did we learn at the end of the day? A whole lot about servers, deployment, merge conflicts, requests, webhooks, facebook bot apis, facebook pages Most importantly, we learned about facebook for developers feature. Before this hackathon, we have never heard of it. Now, we even have our own chatbot on it.

What's next for Police Aid Project
One thing that we didn't do much is using github. We mainly used heroku What's next could be evaluating usability/compatibility in local police offices/call centers. Of course, there's still a lot of improvements possible: better user experience, setting up contact with a police officer directly or add "send live location" once facebook adds back this feature.
