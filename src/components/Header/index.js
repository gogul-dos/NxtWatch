import {withRouter, Link} from 'react-router-dom'
import {IoMoon, IoSunnyOutline} from 'react-icons/io5'
import ThemeContext from '../ReactContexts'
import {
  StyledNavbarButtonLogout,
  StyledNavbarContainer,
} from '../../StyledComponents'
import './index.css'

const Header = props => {
  const {history} = props

  return (
    <ThemeContext.Consumer>
      {value => {
        const {activeTheme, changeTheme} = value
        const imgUrl =
          activeTheme === 'Dark'
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        const handleLogout = () => {
          console.log('button-clicked')
          changeTheme()
        }
        const Theme = activeTheme === 'Dark' ? IoSunnyOutline : IoMoon
        return (
          <StyledNavbarContainer
            backGroundColor={activeTheme === 'Dark'}
            className="navbar-container"
          >
            <Link to="/">
              <img
                src={imgUrl}
                alt="website logo"
                className="website-logo-image"
              />
            </Link>
            <ul className="navbar-unordered-list">
              <li className="for-margin">
                <button
                  onClick={handleLogout}
                  label="theme"
                  type="button"
                  data-testid="theme"
                  className="theme-mode-button"
                >
                  <Theme
                    style={{
                      color: activeTheme === 'Dark' ? '#f9f9f9' : '#090909',
                      fontWeight: 'bold',
                      height: '40px',
                      width: '40px',
                    }}
                  />
                </button>
              </li>
              <li className="for-margin">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile-image"
                />
              </li>
              <li className="for-margin">
                <StyledNavbarButtonLogout
                  color={activeTheme}
                  type="button"
                  label="logout"
                >
                  Logout
                </StyledNavbarButtonLogout>
              </li>
            </ul>
          </StyledNavbarContainer>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(Header)
