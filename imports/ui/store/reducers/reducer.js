import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selectedMenu : "home",
    isSidebarOpen: false,
    employeeId : null,
    employee : {},
    selectedDepartments : [],
    identityType: null,
    newOrganizationAdded: null
}

const newEmployee = ( state, action ) => {
    return updateObject( state, { employeeId: null, employee : {}, isSidebarOpen: true } );
};

const setEmployee = ( state, action ) => {
    console.log("setEmployee employee id " + action.payload._id)
    const newState = updateObject( state, { employeeId: action.payload._id, employee : action.payload, isSidebarOpen: true } );
    // console.log("setEmployee reducer newState " + JSON.stringify(newState));
    return newState;
};

const setDepartmentFilter = ( state, action ) => {
    const selectedDepartments = [...state.selectedDepartments, action.payload]
    const newState = updateObject( state, { selectedDepartments });
    return newState;
};

const removeDepartmentFilter = ( state, action ) => {
    const index = state.selectedDepartments.findIndex(d => d.id === action.payload.id);
    const selectedDepartments = [...state.selectedDepartments.filter(d => d.id != action.payload.id)];
    return updateObject( state, { selectedDepartments });
};

const onMenuSelectionChange = (state, action) => {
    console.log("action ", JSON.stringify(action))
    let menuObj = {
        selectedMenu: action.payload.selectedMenu,
        isSidebarOpen: action.payload.isSidebarOpen
    }
    if (action.payload.selectedMenu == "organization") {
        Object.assign(menuObj, { identityType: null });
    }
    return {
        ...state,
        ...menuObj
    };
}

const onCollapseSidebar = (state) => {
    console.log('onCollapseSidebar', state.isSidebarOpen);
    return {
        ...state, 
        isSidebarOpen: !state.isSidebarOpen
    };
}

const addNewIdentity = (state, action) => {
    console.log('addNewIdentity', state.identityType, JSON.stringify(action.payload));
    return {
        ...state, 
        identityType: action.payload.identityType
    };
}

const newOrganizationAdded = (state, action) => {
    console.log('OrganizationName', action.payload.orgName);
    return {
        ...state, 
        newOrganizationAdded: action.payload.orgName
    };
}


const reducer = (state = initialState, action) => {
    let newState = null;
    switch (action.type) {
        case actionTypes.NEW_EMPLOYEE: newState = newEmployee(state, action); break;
        case actionTypes.SET_EMPLOYEE: newState = setEmployee(state, action); break;
        case actionTypes.SET_DEPARTMENT_FILTER: newState = setDepartmentFilter(state, action); break;
        case actionTypes.REMOVE_DEPARTMENT_FILTER: newState = removeDepartmentFilter(state, action); break;
        case actionTypes.CHANGE_MENU_SELECTION: newState = onMenuSelectionChange(state, action); break;
        case actionTypes.COLLAPSE_SIDEBAR: newState = onCollapseSidebar(state, action); break;
        case actionTypes.ADD_NEW_IDENTITY: newState = addNewIdentity(state, action); break;
        case actionTypes.NEW_ORGANIZATION_ADDED: newState = newOrganizationAdded(state, action); break;       
        
        default:
            newState = state;
    }
    // console.log(action.type, "reducer newState " + JSON.stringify(newState));
    return newState;
}

export default reducer;