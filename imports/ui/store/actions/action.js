import * as actionTypes from './actionTypes';



export const onMenuSelectionChange = (payLoad) => {
    return {
        type: actionTypes.CHANGE_MENU_SELECTION,
        payload: { selectedMenu: payLoad.menu, isSidebarOpen: payLoad.isSidebarOpen }
    };
};

export const newEmployee = () => {
    return {
        type: actionTypes.NEW_EMPLOYEE
    };
};

export const selectEmployee = (payload) => {
    return {
        type: actionTypes.SET_EMPLOYEE,
        payload: payload
    };
};

export const onDepartmentSelected = (payload) => {
    return {
        type: actionTypes.SET_DEPARTMENT_FILTER,
        payload: payload
    };
};

export const onDepartmentUnSelected = (payload) => {
    return {
        type: actionTypes.REMOVE_DEPARTMENT_FILTER,
        payload: payload
    };
};

export const collapseSideBar = () => {
    return {
        type: actionTypes.COLLAPSE_SIDEBAR,
    };
};

export const addIdentity = (payload) => {
    return {
        type: actionTypes.ADD_NEW_IDENTITY,
        payload: payload
    };
};

export const dispatchOrganizationAdded = (payload) => {
    return {
        type: actionTypes.NEW_ORGANIZATION_ADDED,
        payload: payload
    };
};

export const addNewEmployee = () => {
    return dispatch => {
        dispatch(onMenuSelectionChange({menu: "plus", isSidebarOpen: true}));
        dispatch(newEmployee());
    }
};

export const onNewOrganizationClick = (identityType) => {
    return dispatch => {
        dispatch(addIdentity({ type: identityType }));
    }
};

export const addNewOrganization = (orgName) => {
    return dispatch => {
        dispatch(dispatchOrganizationAdded({ orgName: orgName }));
    }
};

