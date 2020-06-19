# Amazon Tracker
This is web app which will help users to track price of product when they set tracker. I used nightmare.js for web scraping.

## Progress
 Till Now only server code has written.

## How to Run??
1. Clone this Repository
2. Run cd server & npm install
3. Run node app.js
4. Open localhost:8000 in browser

## Routes
### Auth Routes
Sr.No.|Address|Description
------|-------|-----------
1.| (POST) /register | Register new User Require username,password & name in body
2.| (POST) /login | Login in App requires username and password
3.| (GET) /curUser | Get Logged in user

### Main Routes
Sr. No.| Address | Description
------|------|--------
1.| (GET) /tracker | Get List of trackers added by logged in user
2.| (POST) /tracker | Create new tracker 
3.| (GET) /tracker/:id | View details of tracker having provided id
4.| (PUT) /tracker/:id  | Update Details of specific tracker 
5.| (DELETE) /tracker/:id | Delete Specific Tracker.
