import ThemeContext from '../ReactContexts'
import './index.css'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {activeTheme} = value
      let imageUrl
      if (activeTheme === 'Dark') {
        imageUrl =
          'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      } else {
        imageUrl =
          'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      }
      return (
        <div className="not-found-container">
          <img alt="not found" src={imageUrl} className="failure-image" />
          <h1>Page Not Found</h1>
          <p>we are sorry, the page you requested could not be found.</p>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
