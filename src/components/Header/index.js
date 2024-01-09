import {withRouter, Link} from 'react-router-dom'
import ThemeContext from '../ReactContexts'
import './index.css'

const Header = props => {
  const {history} = props

  return (
    <ThemeContext>
      {value => {
        const {activeTheme} = value
        const imgUrl =
          activeTheme === 'Dark'
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
      }}
    </ThemeContext>
  )
}
