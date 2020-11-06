import './HeaderProfile.css';
import React, { Component } from 'react';
import HeaderProfile from './HeaderProfile';
import { withTracker } from 'meteor/react-meteor-data';
import './header.css';

class Header extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        user: null,
        userName: "",
        email: "",
        isClicked: false,
        isProfileClicked: false,
        isSubMenuCatsExp: false,
        isSubMenuCats: false,
        isMenuItemOne: false,
        isMenuItemTwo: false
    }

    // useLayoutEffect() {
    //     console.log(props.forwardRef.current);
    // };

    componentDidMount() {
        setTimeout(() => {
            this.getCurrentUser()
        }, 3000)
    }

    login = (e) => {
        e.preventDefault();
        console.log(this.props)
        this.props.history.push('/login');
    }

    logout = (e) => {
        e.preventDefault();
        this.logoutUser();
    }

    logoutUser = () => {
       
    }

    editProfile = (e) => {
        e.preventDefault();
        this.props.history.push(`/profile/${this.state.user._id}`);
    }

    changePassword = (e) => {
        e.preventDefault();
        this.props.history.push('/resetPassword');
    }

    changeLanguage = (e) => {
        e.preventDefault();
        this.props.history.push('/locales');
    }

    getCurrentUser() {
       
    }

    reloadHeaderTitle() {
       
    }

    myCallback = (val) => {        
        if(val == 'profile') {
           this.props.history.push(`/profile/${this.state.user._id}`);
        } else if (val == 'logout') {
            this.logoutUser();
        }
    }

    toggleProfileView = () => {
        this.setState({isProfileClicked: !this.state.isProfileClicked});
    }
    

    render() {
        return (
            <>
            <div className="header">
            <i onClick={()=>this.setState({isClicked: !this.state.isClicked})} className={!this.state.isClicked ? "fa fa-bars hamburger" : "fa fa-close hamburger"}></i>
              <a className="logo header-text-color app-logo">
                    <span className="app-title"> 
                      <span>ID</span>
                      <span>SYNC</span>
                      <span> DENALI</span>
                      <span className="cloud-logo"> </span>
                    </span> 
                </a>
              <div className="header-right">
                   <div className='profile-header'>
                      <a className="bellIcon"><i className="glyphicon glyphicon-bell"></i></a> 
                      <p onClick={this.toggleProfileView} className="imgIcon"><i className="fa fa-user"></i></p>
                      <a onClick={this.toggleProfileView} className="name"> {this.state.userName}</a>
                      <i onClick={this.toggleProfileView} className={this.state.isProfileClicked ? "fa fa-caret-up dropdown-icon" : "fa fa-caret-down dropdown-icon"}></i>
                   </div>
                   <div>
                    {
                    this.state.isProfileClicked ? 
                    <div className="menu">
                        <HeaderProfile email={this.state.email} userName={this.state.userName} userId={this.props.currentUserId}
                        myCallback={this.myCallback}></HeaderProfile>
                    </div>
                    : null
                    }
                    </div>
                    
              </div>
             
          </div>
           {this.state.isClicked ?
            <div className='col-md-3 menu-text hamburger-menu'>
                <p className='ml-1' onClick={()=>{ this.setState({isClicked:!this.state.isClicked});this.props.history.push('./audit')}}><i className="fas fa-list-ul"></i> Activities</p>
                <div className='activity-sub-menu ml-1' onClick={()=>this.setState({isSubMenuCatsExp: !this.state.isSubMenuCatsExp})}>
                    <i className="fas fa-circle mt-2 header-mr-1"></i>
                    <li className='header-mr-1'>Menu Item with Sub Cats Exp</li>
                    <i className={this.state.isSubMenuCatsExp ? "fa fa-caret-down mt-2" : "fa fa-caret-right mt-2"}></i>
                </div>
                {this.state.isSubMenuCatsExp &&
                <div className={this.state.isMenuItemOne ? 'active-inner-sub-menu' : 'inactive-inner-sub-menu'}>
                    <div onClick={()=>this.setState({isMenuItemOne: !this.state.isMenuItemOne, isMenuItemTwo: false})} className='inner-menu'>
                    <i className="fas fa-circle mt-2"></i>
                    <li className='ml-1'>Sub Menu Item</li>
                    </div>
                    </div>
                }
                <div className='activity-sub-menu ml-1 mt-half' onClick={()=>this.setState({isSubMenuCats: !this.state.isSubMenuCats})}>
                    <i className="fas fa-circle mt-2 header-mr-1"></i>
                    <li className='header-mr-1'>Menu Item with Sub Cats</li>
                    <i className={this.state.isSubMenuCats ? "fa fa-caret-down mt-2" : "fa fa-caret-right mt-2"}></i>
                </div>
                {this.state.isSubMenuCats &&
                <div  onClick={()=>this.setState({isMenuItemTwo: !this.state.isMenuItemTwo, isMenuItemOne: false})} className={this.state.isMenuItemTwo ? 'active-inner-sub-menu' : 'inactive-inner-sub-menu'}>
                    <div className='inner-menu'>
                    <i className="fas fa-circle mt-2"></i>
                    <li className='ml-1'>Sub Menu Item</li>
                    </div>
                    </div>
                }
            </div> 
            : null}
          </>
        );
    }
}

export default Header;


