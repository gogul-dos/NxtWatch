import {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Gaming from './components/Gaming'
import ThemeContext from './components/ReactContexts'
import ProtectedRoute from './components/ProtectedRoute'
import Trending from './components/Trending'
import Video from './components/Video'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {activeTheme: 'Light', activeBlock: 1, savedVideos: []}

  changeTheme = () => {
    const {activeTheme} = this.state
    let newTheme
    if (activeTheme === 'Dark') {
      newTheme = 'Light'
    } else {
      newTheme = 'Dark'
    }
    this.setState({activeTheme: newTheme})
  }

  blockChanged = id => {
    this.setState({activeBlock: id})
  }

  saveToVideos = details => {
    const {savedVideos} = this.state
    let newVideos
    const idAvailable = savedVideos.some(
      eachVideo => eachVideo.id === details.id,
    )
    if (idAvailable) {
      newVideos = savedVideos.filter(eachVideo => eachVideo.id !== details.id)
    } else {
      newVideos = [...savedVideos, details]
    }
    this.setState({savedVideos: newVideos})
    console.log('details changed', details)
  }

  render() {
    const {activeTheme, activeBlock, savedVideos} = this.state
    return (
      <ThemeContext.Provider
        value={{
          activeTheme,
          activeBlock,
          savedVideos,
          saveToVideos: this.saveToVideos,
          changeTheme: this.changeTheme,
          blockChanged: this.blockChanged,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/videos/:id" component={Video} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
