import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
// import Dropzone from 'react-dropzone-uploader';
import Dropzone, {useDropzone} from 'react-dropzone';
import { ProfileFileUpload }  from './ProfileFileUpload';
import { Images } from '../../api/images';
// import fs from 'fs';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.onDrop = (file) => {
            console.log(file);

            const newFile = file.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
              }));
            
            // revokeObjectURL will prevent from memory leaks
            // newFile.forEach(file => URL.revokeObjectURL(file.preview));

            this.setState({files : newFile})
        };
    }   

    state = {
                _id: "",
                name : "",
                email : "",
                password : "",
                files: null,
                file: null,
                isValid : false,
                isSubmitted : false,
                errMsg: null,
                successMsg: null
            }
    
    handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    handleChangeEvent = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    signupUser = (e) => {
        e.preventDefault(); // will prevent the form from reloading

        if (this.state.files) {
            this.uploadProfilePic(this.state.files[0]);
        }

        console.log(this.isValidPassword(this.state.password) + " Environment " + process.env.NODE_ENV);
        // console.log(process.env.DEPLOY_PLATFORM)
        // console.log('Signup Password rules', this.getPasswordRule());
        
        Meteor.call('getMongoUrlEnv', function(err, results) {
            console.log("Mongo_URL="+results);
        });

        this.setState({ isSubmitted: true })
        const isValid = this.isValidForm();
        this.setState({
            isValid: isValid
        })
        this.updateUser(isValid);
    }

    uploadFileByOstrio = (file) => {
        const upload = Images.insert({
            file: file,
            streams: 'dynamic',
            chunkSize: 'dynamic'
          }, false);

          upload.on('start', function () {
            console.log('start');
          });
    
          upload.on('end', (error, fileObj) => {
            if (error) {
              alert('Error during upload: ' + error);
            } else {
              this.successMsg('File "' + fileObj.name + '" successfully uploaded');
            }
            console.log('end');
          });
    
        upload.start();
    }

    getProfilePic = (file) => {
        
    }
    
    // uploadFileByFS = (file) => {
    //     Images.insert(file, function(err, fileObj) {
    //         if (err) {
    //             console.log(err); //in case there is an error, log it to the console
    //         } else {
    //             console.log("image upload is done successfully");
    //             //the image upload is done successfully.
    //             //you can use this callback to add the id of your file into another collection
    //             //for this you can use fileObj._id to get the id of the file
    //         }
    //     });
    // }
    
    uploadProfilePic = (file) => {
        file.userId = Meteor.userId();
        this.uploadFileByOstrio(file); // working

        // this.uploadFileByFS(file);

        // const fsFile = new FS.File(file)
        
        // Images.insert(fsFile,  function(err, result) {
        //     if (err) {
        //         throw err;
        //     } else {
        //         console.log("fsCollection image upload success");
        //     }
        // })


        //Meteor.call('file-upload', file, {name: "venkat"});

        // var reader = new FileReader();
        // reader.onload = function(fileLoadEvent) {
        //    Meteor.call('file-upload', file, reader.result);
        // };


        // var fsFile = new FS.File(file);
        // fsFile.owner = Meteor.userId();
        // fsCollection.insert(fsFile, function (err) {
        //     if (err) {
        //         throw err;
        //     } else {
        //         console.log("fsCollection image upload success");
        //     }
        // });
    }
    

    updateUser = (isValid) => {
        if (isValid && this.state._id) { //profile update
               Meteor.users.update({ _id: Meteor.userId()}, {$set: {"profile.name": this.state.name }});
               setTimeout(() => {
                   this.props.myCallback();
               }, 1000)
        }
    }

    isValidForm = () => {
        let errMsg = null;
        if (!this.state._id) {
            if (!this.state.name || !this.state.email || !this.state.password) {
                errMsg = "Please fill all the required fields";
            } else if(!this.isValidPassword(this.state.password)) {
                errMsg = (this.getPasswordRule()) ? 
                Meteor.settings.public.password_rule_msg : "Password must be minimum 8 characters";
            }
        } else { // update
           if (this.state.name && this.state.email && this.state.password) 
           {
            errMsg = "Please fill all the required fields";
           }
        }
        this.setState({
            errMsg: errMsg
        })
        return (errMsg == null) ? true : false;
    }

    getPasswordRule = () => {
        // return Meteor.settings.public.password_rule;
        return "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$";
    }

    isValidPassword = (str) =>
    {
        // const regEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        // return regEx.test(str);

        // https://riptutorial.com/meteor/example/14700/specifying-app-parameters-with-meteor-settings
        const pwd_rules = this.getPasswordRule();
        const regEx = pwd_rules ? new RegExp(pwd_rules) : /^[a-zA-Z0-9]{8,}$/;
        return regEx.test(str);
    }

    isLoggedIn = (e) => {
        e.preventDefault();

        const user = Meteor.user();
        console.log("loggedIn user : " + JSON.stringify(user));

        if (user) {
            // const profileObj = Meteor.user({fields: {'profile.name': 1}});
            // console.log("loggedIn userName : " + profileObj.profile.name);
            const userEmailObj = Meteor.user({fields: {'emails': 1}});
            let userName = userEmailObj.emails[0].address;
            if (user && user.profile) {
                userName = user.profile.name;
            }
            console.log("loggedIn userName : " + userName);
        }

        Meteor.loggingIn(function() {
            console.log("loggedIn userId : " + this.userId)
        })
    }

    getCurrentUser = () => {
        const user = this.props.user;
        // const user = Meteor.user();
        console.log("myName " + this.props.myName, this.props.userId, this.props.user)

        if (user) {
            let userName = user.emails[0].address;
            if (user.profile) {
                userName = user.profile.name;
            }
            this.setState({ 
                _id: this.props.match.params.id,
                name : userName,
                email : user.emails[0].address,
             });
        }

        Meteor.call('get.profile', 'venkat', (err, results)  => {
            if (err) {
                console.log('get.profile err' + err)
            } else {
                if (results) {
                    this.setState({
                        file : results
                    })
                }
                console.log('get.profile results' + JSON.stringify(results));
            }
        });
    }
    

    componentDidMount() {
        // console.log("myName 1 " + this.props.myName, this.props.userId, this.props.user)
        // this.props.user is indefined here
        setTimeout(() => {
            this.getCurrentUser();
        }, 1000)
    }

    removeProfile = (e) => {
        e.preventDefault();

        // Using callback
        Images.remove({userId:  Meteor.userId()}, (error) => {
            if (error) {
                const reason = `File wasn't removed, error:  ${error.reason}`
                this.setState({ 
                    errMsg : reason
                });
                console.error(reason);
            } else {
                this.setState({ 
                    files : null
                });
                this.successMsg('File successfully removed');
            }
        });
    }

    successMsg = (msg) => {
        console.info(msg);
        this.setState({ 
            successMsg : msg
        });
        setTimeout(() => {
            this.setState({ 
                successMsg : null
            });
        }, 4000)
    }
    
    

    render() {
        const files = this.state.files ? this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {Math.round(file.size / 1024)} KB
            </li>
        )) : null;


        // const { file } = this.state;
        // const fileUpload = (!file) ? 
        //     <div style={{ border: '2px solid #d9d9d9', padding: 10, borderRadius: 4 }} 
        //          onClick={this.handleClick}>
        //         Click me to upload a file from a data URL.
        //     </div>
        // : null;

        const showError = (this.state.isSubmitted && this.state.errMsg) ?
            <h3>{this.state.errMsg}</h3> : null;

        return (
         <div>
            <form>
            <h2> <T _tagType='span'>login.userProfile</T> </h2>
            <label>
              <T _tagType='span'>login.name</T>  {" : "}
              <input type="text" name="name" value={this.state.name} 
                            onChange={this.handleChangeEvent} />
            </label>  <br /> <br />
            <label>
              <T _tagType='span'>login.email</T>  {" : "}
              <input type="text" name="email" value={this.state.email} 
                     disabled={this.state._id}
                            onChange={this.handleChangeEvent} />
            </label>  <br /> <br />
            
            {/* <ProfileFileUpload /> */}
            {/* {fileUpload} */}

            <div> 
                <Dropzone accept="image/*" onDrop={this.onDrop}>
                    {({getRootProps, getInputProps}) => (
                    <section className="container">
                        <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside>
                        <h4>Files</h4>
                        <ul>{files}</ul>
                        </aside>
                    </section>
                    )}
                </Dropzone>
            </div> 

            <div>
             {
                (this.state.files) ?
                <div>
                    <img src={this.state.files[0].preview} className="profile-preview" /> 
                    <button onClick={this.removeProfile}>Remove</button>
                </div>
                : null
             }
            </div>  

            {/* <Dropzone
                getUploadParams={this.getUploadParams}
                onChangeStatus={this.handleChangeStatus}
                onSubmit={this.handleSubmit}
                accept="image/*"
                inputContent={(files, extra) => (extra.reject ? 'Image files only' : 'Drag Files')}
                styles={{
                    dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                    inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                }}
            /> */}

            <button className="btn btn-success" onClick={(e)=> { this.signupUser(e) }}>
                { 
                   <T _tagType='span'>common.update</T>
                }
            </button>
            { " " }

              <h3 className="color-red">{showError}</h3>
              {
                (this.state.successMsg) ?
                <h3 className="success">{this.state.successMsg}</h3> : null
              }
              
            </form>
         </div>
        );
    }
}
 
//   const { tasks, incompleteTasksCount, user } = useTracker(() => ({
//     tasks: Tasks.find(filter, { sort: { createdAt: -1 } }).fetch(),
//     incompleteTasksCount: Tasks.find({ checked: { $ne: true }}).count(),
//     user: Meteor.user(),
//   }));

// export default Signup
    
export default withTracker((props) => {
    // Meteor.subscribe('userData');
    
    return { 
        user: Meteor.user(),
        userId: Meteor.userId(),
        myName: "Venkatesh"
    };
})(Signup);

// const mapMeteorToProps = (props) => {
//     return {
//         user: Meteor.user(),
//         userId: Meteor.userId(),
//         myName: "Venkatesh"
//     };
// };
// export default withTracker(mapMeteorToProps)(Signup);