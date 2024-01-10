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
    link: '/savedvideos',
    id: 4,
  },
]

class Blocks extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {activeTheme, activeBlock, blockChanged} = value

          return (
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
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Blocks
