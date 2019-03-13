import React, { Component } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  InputAdornment,
  IconButton,
  Button,
  Paper
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderPage: 1 // 0 Login, 1 Register, 2 User
    };
  }

  handleChange = which => {
    //this.setState({ [which]: event.target.value }); not yet
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  renderRegister() {
    if (this.state.renderPage === 1) {
      return (
        <Paper>
          <FormControl>
            <InputLabel htmlFor='email-input'>Email address</InputLabel>
            <Input id='email-input' aria-describedby='email-helper-text' />
            <FormHelperText id='email-helper-text'>
              We'll never share your email.
            </FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor='adornment-password'>Password</InputLabel>
            <Input
              id='adornment-password'
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleChange('password')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='Toggle password visibility'
                    onClick={this.handleClickShowPassword}>
                    {this.state.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button>Register</Button>
        </Paper>
      );
    }
  }

  render() {
    return <div>{this.renderRegister()}</div>;
  }
}
