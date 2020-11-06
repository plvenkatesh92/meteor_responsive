import { Meteor } from 'meteor/meteor';
import { Departments } from '../imports/api/departments';

function insertDepartment({ id, name }) {
  Departments.insert({id, name, createdAt: new Date()});
}

Meteor.startup(() => {
  console.log("Mongo url: " + process.env.MONGO_URL, "Platform: ",  process.env.DEPLOY_PLATFORM);
  console.log("Node Env: " + process.env.NODE_ENV);  
  
  const noOfDepartments = Departments.find().count();
  if (noOfDepartments === 0) {
      insertDepartment({ id: 1, name: 'Administration' });
      insertDepartment({ id: 2, name: 'Sales' });
      insertDepartment({ id: 3, name: 'Development' });
      insertDepartment({ id: 4, name: 'Warehouse' });
      insertDepartment({ id: 5, name: 'Marketing' });
  }

  Meteor.publish('departments', () => {
    return Departments.find();
  });

  Meteor.publish('departments', (per_page) => {
     const myroles = Departments.find({}, { limit : 2 });
     console.log('server log roles per_page: ' + 2);
     return myroles;
  })

});
