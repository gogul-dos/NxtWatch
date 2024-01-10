import {Component} from 'react'
import {BsDot} from 'react-icons/bs'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {GoThumbsup, GoThumbsdown} from 'react-icons/go'
import {CgPlayListAdd} from 'react-icons/cg'
import {LikeButton} from '../../StyledComponents'
import './index.css'

class VideoPlayerDetails extends Component {
  state = {isLiked: false, isDisliked: false, isSaved: false}

  dislikeButtonClicked = () => {
    this.setState({isLiked: false, isDisliked: true})
  }

  likeButtonClicked = () => {
    this.setState({isLiked: true, isDisliked: false})
  }

  saveButtonClicked = () => {
    const {saveToVideos, searchResults} = this.props
    const {isSaved} = this.state

    this.setState({isSaved: !isSaved})

    saveToVideos(searchResults)
  }

  render() {
    const {searchResults, activeTheme, savedVideos} = this.props
    const {isLiked, isDisliked, isSaved} = this.state
    console.log(isSaved)
    const textColor1 = activeTheme === 'Dark' ? '#ffffff' : '#000000'
    const paraColor = activeTheme === 'Dark' ? '#cbd5e1' : '#475569'
    const backgroundColor = activeTheme === 'Dark' ? '#000000' : '#f1f1f1'
    const publishedAt = searchResults.published_at
    const time = formatDistanceToNow(new Date(publishedAt))

    let buttonColor
    let textContentForSavedButton = 'Save'
    const isObjectInList =
      savedVideos &&
      savedVideos.length > 0 &&
      savedVideos.some(item => item.id === searchResults.id)
    if (isObjectInList) {
      buttonColor = ' #3b82f6'
      textContentForSavedButton = 'Saved'
    } else {
      buttonColor = '#000000'
      textContentForSavedButton = 'Save'
    }

    return (
      <>
        <div style={{backgroundColor}} className="video-player-container">
          <ReactPlayer
            height="100vh"
            width="100%"
            url={searchResults.video_url}
            controls
          />
        </div>
        <div className="video-details-container">
          <p style={{color: textColor1}}>{searchResults.title}</p>
          <div className="video-parameters">
            <div
              style={{display: 'flex', alignItems: 'center', color: paraColor}}
            >
              <p>{searchResults.view_count} views</p>
              <BsDot />
              <p>{time} ago</p>
            </div>
            <div className="video-response-container">
              <LikeButton
                fontColor={isLiked}
                id="like-button"
                type="button"
                className="thumbs-button"
                onClick={this.likeButtonClicked}
                label="like"
                data-testid="like"
              >
                <GoThumbsup className="icon-styles" />{' '}
                <p style={{fontSize: '15px', marginLeft: '5px'}}>Like</p>
              </LikeButton>
              <LikeButton
                fontColor={isDisliked}
                id="dislike-button"
                type="button"
                onClick={this.dislikeButtonClicked}
                className="thumbs-button"
                label="dislike"
                data-testid="dislike"
              >
                <GoThumbsdown className="icon-styles" />{' '}
                <p style={{fontSize: '15px', marginLeft: '5px'}}>Dislike</p>
              </LikeButton>
              <div className="save-button-container">
                <CgPlayListAdd className="icon-styles" />

                <button
                  onClick={this.saveButtonClicked}
                  id="save-button"
                  type="button"
                  className="thumbs-button"
                  label="save"
                  data-testid="save"
                  style={{
                    fontSize: '15px',
                    marginLeft: '5px',
                    color: buttonColor,
                  }}
                >
                  {textContentForSavedButton}
                </button>
              </div>
            </div>
          </div>
          <hr style={{color: '#000000', alignSelf: 'stretch'}} />
        </div>
        <div className="channel-details-container">
          <img
            src={searchResults.channel.profile_image_url}
            className="channel-logo"
            alt="channel logo"
          />
          <div className="channel-sub-details">
            <p>{searchResults.channel.name}</p>
            <p>{searchResults.channel.subscriber_count}</p>
            <p>{searchResults.description}</p>
          </div>
        </div>
      </>
    )
  }
}

export default VideoPlayerDetails
