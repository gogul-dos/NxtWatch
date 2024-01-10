import {Component} from 'react'
import SavedVideosList from '../SavedVideosList'
import Header from '../Header'
import Blocks from '../Blocks'
import {
  StyledHomeLeftContainer,
  StyledHomeMainContainer,
} from '../../StyledComponents'
import ThemeContext from '../ReactContexts'
import './index.css'

class SavedVideos extends Component {
  requestStatus = {
    progress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }

  state = {
    searchResults: [],
  }

  getCurrentView = (activeTheme, savedVideos) => {
    const {searchResults} = this.state
    const {history} = this.props
    console.log(searchResults)
    const formattedData = savedVideos.map(eachVideo => ({
      id: eachVideo.id,
      publishedAt: eachVideo.published_at,
      thumbnailUrl: eachVideo.thumbnail_url,
      title: eachVideo.title,
      viewCount: eachVideo.view_count,
      channel: eachVideo.channel,
    }))

    return (
      <>
        {savedVideos.length === 0 ? (
          <div className="save-videos-button">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
              className="failure-image"
            />
            <h1>No saved videos found</h1>
            <p>Save your videos by clicking a button</p>
          </div>
        ) : (
          <>
            <h1>Saved Videos</h1>
            <ul className="unordered-list-in-saved-videos">
              {formattedData.map(eachVideo => (
                <SavedVideosList
                  key={eachVideo.id}
                  details={eachVideo}
                  history={history}
                />
              ))}
            </ul>
          </>
        )}
      </>
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {activeTheme, savedVideos} = value
          return (
            <StyledHomeMainContainer
              data-testid="savedVideos"
              backGroundColor={activeTheme === 'Dark'}
            >
              <Header />
              <div className="trending-main-container">
                <StyledHomeLeftContainer
                  backGroundColor={activeTheme === 'Dark'}
                >
                  <Blocks />
                </StyledHomeLeftContainer>
                <div className="main-content-container">
                  {this.getCurrentView(activeTheme, savedVideos)}
                </div>
              </div>
            </StyledHomeMainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideos
