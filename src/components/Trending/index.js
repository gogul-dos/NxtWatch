import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaFire} from 'react-icons/fa'
import TrendingVideoCard from '../TrendingVideoCard'
import Header from '../Header'
import Blocks from '../Blocks'
import {
  StyledHomeLeftContainer,
  StyledHomeMainContainer,
} from '../../StyledComponents'
import ThemeContext from '../ReactContexts'
import './index.css'

class Trending extends Component {
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
    this.setState({urlStatus: this.requestStatus.progress})
    const url = `https://apis.ccbp.in/videos/trending`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const formattedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
        channel: eachVideo.channel,
      }))
      this.setState({
        searchResults: formattedData,
        urlStatus: this.requestStatus.success,
      })
      console.log(data)
    } else {
      this.setState({urlStatus: this.requestStatus.failure})
    }
  }

  retryButtonClicked = () => [this.getResults()]

  getCurrentView = activeTheme => {
    const {urlStatus, searchResults} = this.state
    console.log(searchResults)
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
          <div style={{color}} className="failure-container">
            <img src={imageUrl} className="failure-image" alt="failure view" />
            <h1>Oops! Something Went Wrong</h1>
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
          <>
            <div className="trending-success-container">
              <div className="trending-heading-container">
                <div
                  className="icon-container"
                  style={{backgroundColor: backGroundColor}}
                >
                  <FaFire color="red" height="25px" width="25px" />
                </div>
                <h1 style={{color}}>Trending</h1>
              </div>
            </div>
            <ul className="unordered-list-container-for-trending">
              {searchResults.map(eachItem => (
                <TrendingVideoCard key={eachItem.id} details={eachItem} />
              ))}
            </ul>
          </>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {activeTheme} = value
          return (
            <StyledHomeMainContainer
              data-testid="trending"
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
                  {this.getCurrentView(activeTheme)}
                </div>
              </div>
            </StyledHomeMainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending
