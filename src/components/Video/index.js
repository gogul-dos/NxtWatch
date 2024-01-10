import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Blocks from '../Blocks'
import VideoPlayerDetails from '../VideoPlayerDetails'
import {
  StyledHomeLeftContainer,
  StyledHomeMainContainer,
} from '../../StyledComponents'
import ThemeContext from '../ReactContexts'
import './index.css'

class Video extends Component {
  requestStatus = {
    progress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }

  state = {
    searchResults: [],
    urlStatus: this.requestStatus.progress,
  }

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    this.setState({urlStatus: this.requestStatus.progress})
    const url = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        searchResults: data.video_details,
        urlStatus: this.requestStatus.success,
      })
      console.log(data.video_details)
    } else {
      this.setState({urlStatus: this.requestStatus.failure})
    }
  }

  retryButtonClicked = () => {
    this.getResults()
  }

  getCurrentView = (
    activeTheme,
    textColor1,
    paraColor,
    backgroundColor,
    saveToVideos,
    savedVideos,
  ) => {
    const {urlStatus, searchResults} = this.state
    const publishedAt = searchResults
    console.log('publishedAt', publishedAt) //

    let color
    let isDark
    let backGroundColor
    if (activeTheme === 'Dark') {
      color = '#ffffff'
      backGroundColor = '#ebebeb'
      isDark = true
    } else {
      color = '#000000'
      backGroundColor = '#0f0f0f'
      isDark = false
    }
    const imageUrl = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    switch (urlStatus) {
      case this.requestStatus.progress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color={color} height="50" width="50" />
          </div>
        )
      case this.requestStatus.failure:
        return (
          <div
            style={{color, backgroundColor: backGroundColor}}
            className="failure-container"
          >
            <img src={imageUrl} className="failure-image" alt="failure view" />
            <h1 style={{color: textColor1}}>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button
              onClick={this.retryButtonClicked}
              type="button"
              className="retry-button"
            >
              Retry
            </button>
          </div>
        )
      case this.requestStatus.success:
        return (
          <div className="video-player-main-container">
            <VideoPlayerDetails
              searchResults={searchResults}
              activeTheme={activeTheme}
              saveToVideos={saveToVideos}
              savedVideos={savedVideos}
            />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {activeTheme, saveToVideos, savedVideos} = value
          const textColor1 = activeTheme === 'Dark' ? '#ffffff' : '#000000'
          const paraColor = activeTheme === 'Dark' ? '#cbd5e1' : '#475569'
          const backgroundColor = activeTheme === 'Dark' ? '#000000' : '#f1f1f1'
          return (
            <StyledHomeMainContainer
              data-testid="videoItemDetails"
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
                  {this.getCurrentView(
                    activeTheme,
                    textColor1,
                    paraColor,
                    backgroundColor,
                    saveToVideos,
                    savedVideos,
                  )}
                </div>
              </div>
            </StyledHomeMainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Video
