import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import Login from "./Login";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      fullname: "",
      email: "",
      password: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
  }
  handleClick(event, role) {
    var apiBaseUrl = "http://localhost:4000/api/";
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if (
      this.state.username.length > 0 &&
      this.state.fullname.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0
    ) {
      var payload = {
        username: this.state.username,
        fullname: this.state.fullname,
        email: this.state.email,
        password: this.state.password,
        role: role
      };
      axios
        .post(apiBaseUrl + "/register", payload)
        .then(function(response) {
          console.log(response);
          if (response.data.code === 200) {
            //  console.log("registration successfull");
            var loginscreen = [];
            loginscreen.push(
              <Login
                parentContext={this}
                appContext={self.props.appContext}
                role={role}
              />
            );
            var loginmessage = "Not Registered yet.Go to registration";
            self.props.parentContext.setState({
              loginscreen: loginscreen,
              loginmessage: loginmessage,
              buttonLabel: "Register",
              isLogin: true
            });
          } else {
            console.log("some error ocurred", response.data.code);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      alert("Input field value is missing");
    }
  }
  render() {
    console.log("props", this.props);
    // var userhintText, userLabel;
    // if (this.props.role === "user") {
    //   userhintText = "Enter your Username";
    //   userLabel = "Username";
    // } else {
    //   // userhintText = "Enter your UserAdmin ";
    //   // userLabel = "Admin";
    // }
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Register" />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) =>
                this.setState({ fullname: newValue })
              }
            />
            <br />
            <TextField
              hintText="Enter your Fullname"
              floatingLabelText="Fullname"
              onChange={(event, newValue) =>
                this.setState({ username: newValue })
              }
            />
            <br />
            <TextField
              hintText="Enter your Email"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br />
            <RaisedButton
              label="Submit"
              primary={true}
              style={style}
              onClick={event => this.handleClick(event, this.props.role)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15
};

export default Register;
