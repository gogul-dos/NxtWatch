import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import ThemeContext from '../ReactContexts'
import './index.css'

const SavedVideosList = props => {
  const {details, history} = props
  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = details
  const time = formatDistanceToNow(new Date(publishedAt))
  return (
    <ThemeContext.Consumer>
      {value => {
        const {activeTheme} = value
        const textColor1 = activeTheme === 'Dark' ? '#ffffff' : '#000000'
        const paraColor = activeTheme === 'Dark' ? '#cbd5e1' : '#475569'
        const backgroundColor = activeTheme === 'Dark' ? '#000000' : '#f1f1f1'
        return (
          <Link
            style={{textDecoration: 'none'}}
            to={`/videos/${id}`}
            onClick={() => history.push(`/videos/${id}`)}
          >
            <li style={{backgroundColor}} className="list-item-for-trending">
              <div className="trending-video-container">
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="thumbnail-image-for-trending"
                />
                <div
                  style={{color: textColor1}}
                  className="video-details-container"
                >
                  <div>
                    <h1>{title}</h1>
                    <p>{channel.name}</p>
                    <div className="views-container" style={{color: paraColor}}>
                      <p>{viewCount} views</p>
                      <BsDot />
                      <p>{time} ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SavedVideosList
