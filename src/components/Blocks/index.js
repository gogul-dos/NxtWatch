import {Component} from 'react'
import {Link} from 'react-router-dom'
import {MdHome} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import ThemeContext from '../ReactContexts'
import {StyledActiveBlock} from '../../StyledComponents'
import './index.css'

const blocks = [
  {
    displayText: 'Home',
    icon: MdHome,
    link: '/',
    id: 1,
  },
  {
    displayText: 'Trending',
    icon: FaFire,
    link: '/trending',
    id: 2,
  },
  {
    displayText: 'Gaming',
    icon: SiYoutubegaming,
    link: '/gaming',
    id: 3,
  },
  {
    displayText: 'Saved Videos',
    icon: CgPlayListAdd,
    link: '/saved-videos',
    id: 4,
  },
]

class Blocks extends Component {
  getColor = activeTheme => {
    if (activeTheme === 'Dark') {
      return '#ffffff'
    }
    return '#0f0f0f'
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {activeTheme, activeBlock, blockChanged} = value

          return (
            <div>
              <ul className="block-unordered-list">
                {blocks.map(eachBlock => (
                  <li key={eachBlock.id} className="list-item-block">
                    <Link className="Link-container" to={eachBlock.link}>
                      <StyledActiveBlock
                        backGroundColor={activeTheme === 'Dark'}
                        isActive={eachBlock.id === activeBlock}
                        onClick={() => blockChanged(eachBlock.id)}
                        label={eachBlock.displayText}
                        type="button"
                        className="blocks-button"
                      >
                        <eachBlock.icon
                          style={{
                            color: (() => {
                              if (eachBlock.id === activeBlock) {
                                return 'red'
                              }
                              if (activeTheme === 'Dark') {
                                return '#f9f9f9'
                              }
                              return '#000000'
                            })(),
                            height: '25px',
                            width: '25px',
                          }}
                        />
                        <p className="for-margin">{eachBlock.displayText}</p>
                      </StyledActiveBlock>
                    </Link>
                  </li>
                ))}
              </ul>
              <div>
                <p
                  style={{
                    color: () => this.getColor(activeTheme),
                    marginLeft: '10px',
                  }}
                >
                  CONTACT US
                </p>
                <div className="contact-us-logo">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="channel-logo"
                    style={{marginRight: '10px'}}
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                    alt="twitter logo"
                    className="channel-logo"
                    style={{marginRight: '10px'}}
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
                    alt="linked in logo"
                    className="channel-logo"
                    style={{marginRight: '10px'}}
                  />
                </div>
                <p style={{padding: '15px', alignSelf: 'flex-end'}}>
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Blocks
