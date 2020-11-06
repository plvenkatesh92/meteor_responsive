import { Meteor } from 'meteor/meteor';
import  App  from '/imports/ui/App';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../imports/ui/store/reducers/reducer';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, (applyMiddleware(thunk) ));

Meteor.startup(() => {
    const app = (
      <Provider store={store}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>
    );

  render(app, document.getElementById('root'));
});
