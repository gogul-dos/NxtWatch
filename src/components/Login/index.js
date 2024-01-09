import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import ThemeContext from '../ReactContexts'
import {
  StyledLoginMainComponent,
  StyledLoginSubComponent,
} from '../../StyledComponents'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMessage: false,
    errorMessage: '',
  }

  showPasswordChanged = () => {
    document.getElementById('password').type = document.getElementById(
      'showPassword',
    ).checked
      ? 'text'
      : 'password'
  }

  usernameChanged = event => {
    this.setState({username: event.target.value})
  }

  passwordChanged = event => {
    this.setState({password: event.target.value})
  }

  formSubmitted = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const {history} = this.props
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const keyToken = 'jwt_token'
      const jwtToken = data[keyToken]
      Cookies.set('jwt_token', jwtToken, {expires: 15})
      history.replace('/')
    } else {
      this.setState({showErrorMessage: true, errorMessage: data.error_msg})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showErrorMessage, errorMessage} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {activeTheme} = value
          return (
            <StyledLoginMainComponent
              className="main-login-container"
              activeTheme={activeTheme}
            >
              <StyledLoginSubComponent
                activeTheme={activeTheme}
                className="sub-login-container"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                  className="website-logo-image"
                />
                <form onSubmit={this.formSubmitted} className="form-container">
                  <label className="login-label " htmlFor="username">
                    USERNAME
                  </label>
                  <input
                    onChange={this.usernameChanged}
                    className="input-element"
                    type="text"
                    value={username}
                    id="username"
                    placeholder="Username"
                  />
                  <label className="login-label " htmlFor="password">
                    PASSWORD
                  </label>
                  <input
                    onChange={this.passwordChanged}
                    className="input-element"
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                  />
                  <div className="check-box-container">
                    <input
                      onChange={this.showPasswordChanged}
                      type="checkbox"
                      id="showPassword"
                    />
                    <label className="login-label " htmlFor="showPassword">
                      Show Password
                    </label>
                  </div>
                  <button type="submit" className="login-button">
                    Login
                  </button>
                  {showErrorMessage && <p>{errorMessage}</p>}
                </form>
              </StyledLoginSubComponent>
            </StyledLoginMainComponent>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
