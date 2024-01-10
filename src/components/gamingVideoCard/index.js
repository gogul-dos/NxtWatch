import {Link} from 'react-router-dom'
import ThemeContext from '../ReactContexts'
import './index.css'

const GamingVideoCard = props => {
  const {details} = props
  const {id, thumbnailUrl, title, viewCount} = details
  return (
    <ThemeContext.Consumer>
      {value => {
        const {activeTheme} = value
        const textColor1 = activeTheme === 'Dark' ? '#ffffff' : '#000000'
        const paraColor = activeTheme === 'Dark' ? '#cbd5e1' : '#475569'
        const backgroundColor = activeTheme === 'Dark' ? '#000000' : '#f1f1f1'
        return (
          <li style={{backgroundColor}} className="gaming-list-item">
            <Link style={{textDecoration: 'none'}} to={`/videos/${id}`}>
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="gaming-image"
              />
              <div className="gaming-details-container">
                <p style={{color: textColor1}}>{title}</p>
                <p style={{color: paraColor}}>{viewCount} watching worldwide</p>
              </div>
            </Link>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default GamingVideoCard
