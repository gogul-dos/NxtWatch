import React from 'react'

const ThemeContext = React.createContext({
  activeTheme: 'Dark',
  activeBLock: 1,
  blockChanged: () => {},
  changeTheme: () => {},
  savedVideos: [],
  saveToVideos: () => {},
})

export default ThemeContext
