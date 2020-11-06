import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

// run this command before using Blaze -> meteor add accounts-ui accounts-password
// blaze is a library that can render templates provided by meteor

export default class Accounts extends Component {

   
   componentDidMount() {
       // Render the Blaze accounts form then find the div
       //  we just rendered in the 'render' method and place
       // the Blaze accounds form in that div

       // 1st argument -> Template.loginButtons is a signup template form 
       // provided by meteor.
       // 2nd argument -> is blaze will render the template on our 
       // react app div

       this.view = Blaze.render(Template.loginButtons,
        ReactDOM.findDOMNode(this.refs.sigupForm));
   }

   componentWillUnmount() {
       // Go find the forms we created and destroy them
       // we need to clean up those forms ourselves
       Blaze.remove(this.view);
   }

   render() {
        return (
            <div ref="sigupForm">
                
            </div>
        )
   }
}
