# TAW
Thesis Project on web technology for the Computer Science of Ca'Foscari University Venice 2020 - Marco Barnà

The thesis aim is  to build an hypothetical system for an unknown restaurant that is in dire need of upgrading their game....
What you'll find here is a system devided by a "front-end", "back-end" and "client app".
- The back-end is entirely written in javascirpt Node (it's a server) with various nodes/npm modules that is hosted on the platform heroku (i strongly advices you to use it for your projects if you didn't knew about it) and MongoDB Atlas for DB hosting.
- Front-end, were the UI comes into action. It's written in Angular8/Ionic with various npm modules
- A client app written entirely on Ionic that uses Google Firebase for Authentication and then connects to the existent "system" mentioned before for various operation.

## FIRST THING TO DO

 - $ npm install
 - $ npm install -g ionic cordova electron (to remove do npm uninstall -g ionic cordova electron )
 - $ ionic build


## WEB CLIENT

For building the web app, go to folder /ClientsApp/ionic-web-app
then:
 
 - $ ionic serve
 

## MOBILE APP

There are two mobile apps. One that is used as a mobile version that is the same as the web client and electron app, and one that is used exclusively for clients.

For the first one go to /ClientsApp/ionic-web-app (from now on called **IW**)
For the second one /ClientsApp/ionic-clients-app (from now on called **IC**)

### FOR IW
if you want to test it in an emulator go to /ClientsApp/ionic-web-app then:

 - ionic cordova run android -l (for testing the app on android studio - emulator)
 - ionic cordova build android (for testing the app on your device, the output of the terminal will tell you the apk location)

### FOR IC
if you want to test the clients app, you can do the same as the IW but you can't run in an emulator being that is uses
the camera for qr-codes recognition. For this reason you must compile it to the current Operative System you are using and the sideload the apk to your android phone.

## ELECTRON
- $ npm run electron

## LOCAL RUN

### WEB CLIENT
 If you want to run in on local, just change the value in /ClientsApp/ionic-web-app/src/environments/environment.ts
 called base_url to your local machine (localhost)

### SERVER
To change the value needed to run it locally change the following entry in Server/server-ristorante.js

mongoose
  .connect(
    "mongodb+srv://...., <== This to your localhost
    {
