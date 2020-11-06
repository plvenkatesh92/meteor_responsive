import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import OrganizationsListItem from './OrganizationsListItem';
import { Departments } from '../../api/departments';

class OrganizationList extends Component {
   
    render() {
        const organizations = this.props.organizations;
        console.log("organizations", organizations);
        const renderOrganizations = (organizations && organizations.length > 0) ?
            organizations.map(e =>
                <div key={e._id}>
                    <OrganizationsListItem {...this.props} orgObj={e} />
                </div>
            ) : null;

        return (
            <div>
                { renderOrganizations }
            </div>
        )
    }
}

export default withTracker((props) => {
    console.log("Organization withTracker")
    Meteor.subscribe('organizationList', 'Organization');
    return {
        ...props,
        organizations: Departments.find().fetch()
    };
})(OrganizationList);

