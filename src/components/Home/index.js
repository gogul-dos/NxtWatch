import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import ThemeContext from '../ReactContexts'
import {
  StyledHomeMainContainer,
  StyledHomeLeftContainer,
  StyledHomeRightContainer,
} from '../../StyledComponents'
import Header from '../Header'
import Blocks from '../Blocks'
import VideoCard from '../VideoCard'
import './index.css'

class Home extends Component {
  requestStatus = {
    progress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }

  state = {
    searchInput: '',
    searchResults: [],
    urlStatus: this.requestStatus.progress,
  }

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    this.setState({urlStatus: this.requestStatus.progress})
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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

  searchInputChanged = event => {
    this.setState({searchInput: event.target.value})
  }

  searchButtonClicked = () => {
    this.getResults()
  }

  retryButtonClicked = () => [this.getResults()]

  getCurrentView = activeTheme => {
    const {urlStatus, searchResults} = this.state
    console.log(searchResults)
    let color
    let isDark
    if (activeTheme === 'Dark') {
      color = '#ffffff'
      isDark = true
    } else {
      color = '#000000'
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
            <p>We are having some trouble</p>
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
          <ul className="unordered-list-container-for-videos">
            {searchResults.map(eachItem => (
              <VideoCard key={eachItem.id} details={eachItem} />
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {activeTheme} = value
          return (
            <StyledHomeMainContainer backGroundColor={activeTheme === 'Dark'}>
              <Header />
              <div className="main-home-container">
                <StyledHomeLeftContainer
                  backGroundColor={activeTheme === 'Dark'}
                  className="home-left-container"
                >
                  <Blocks />
                </StyledHomeLeftContainer>
                <StyledHomeRightContainer>
                  <div className="search-container">
                    <input
                      type="search"
                      value={searchInput}
                      onChange={this.searchInputChanged}
                      className="input-element"
                      placeholder="Search"
                    />
                    <button
                      type="button"
                      onClick={this.searchButtonClicked}
                      className="search-button"
                      data-testid="search"
                      label="search"
                    >
                      <FaSearch
                        color={activeTheme === 'Dark' ? '#ffffff' : '#000000'}
                        style={{height: '25px', width: '25px'}}
                      />
                    </button>
                  </div>
                  <div className="main-content-container">
                    {this.getCurrentView(activeTheme)}
                  </div>
                </StyledHomeRightContainer>
              </div>
            </StyledHomeMainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Home
