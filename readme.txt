           Meteor React Setup Document



 npm install --save react react-dom
 npm install --save react-router react-router-dom
 npm install axios 

 meteor add twbs:bootstrap@3.3.6 (bootstrap)
 

 
 npm install faker (to genererate dummy data for demo purpose)
 npm install loadash (library is a collection of utility libraries 
 which makes our development easier)


 npm install --save react-addons-pure-render-mixin
 meteor add react-meteor-data (to support publication(server) - subscription (client))
 It creates a container or useTracker

 -> Authentication
 meteor add accounts-ui (provides default balze template for login, logout)
 meteor add accounts-password (to create user, change password, email etc)

 meteor remove insecure (prevent from inserting records directly from react) -> Section 5-> 84 on udemy course

 meteor remove autopublish (which brings up all the records from the db to client we dont need that since records are shown based on roles)
 
 meteor npm install --save bcrypt (to get rid of some console errors, which is not mandatory)

 meteor add accounts-password (to create user, change password, email etc)
 
 --> Commands to execute meteor apps
   > meteor or meteor run
 --> Commands to execute meteor apps with Environment variables
     // https://blog.meteor.com/the-meteor-chef-making-use-of-settings-json-3ed5be2d0bad
   > meteor --settings settings.json

 Meteor Good links

  https://riptutorial.com/meteor/example/31041/add-react-plus-reactrouter

  WithTracker Good Example
  https://scotch.io/tutorials/building-an-events-app-with-meteor-and-react


 Extensions which improves prodctivity
	https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets
	 rcc - to create react class component
	 rfc - to create react function component
	 met - to create arrow function method


  react life cycle
  componentWillMount is a life cycle hook executed only once per component.
  This is a perfect place to initialize and call external api's using axios
 
  react render() will be executed whenever the state gets updated


  Tips
  https://www.youtube.com/watch?v=xa-_FIy2NgE
  always use functional component for stateless component 

  Browser Router is a basic one
  Use Different Router for Scalable Apps
  Higher order components
  formik -> for form creation & validation
  

  two-factor Authentication
   // https://www.npmjs.com/package/otplib
   // https://blog.meteor.com/tutorial-two-factor-authentication-with-meteor-and-totp-21d4a2f9ee51
  