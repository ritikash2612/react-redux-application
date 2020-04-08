# react-redux-application

Steps to run the application
install node modules: go to the downloaded folder and run the following command:
npm install node modules
install json server: npm install json-server -g
to run json-server
move to the folder named json-server and run the command:
 json-server --watch db.json -p 3001 -d 2000
This should start up a server at port number 3001 on your machine.
The data from this server can be accessed by typing the following addresses into your browser address bar:
http://localhost:3001/dishes 
http://localhost:3001/comments
http://localhost:3001/promotions
http://localhost:3001/leaders 
http://localhost:3001/feedback
