import styled from 'styled-components'

export const StyledLoginMainComponent = styled.div`
  background-color: ${props =>
    props.activeTheme === 'Dark' ? '#000000' : '#f8fafc'};
  color: ${props => (props.activeTheme === 'Dark' ? '#ffffff' : '#0f0f0f')};
`

export const StyledLoginSubComponent = styled.div`
  background-color: ${props =>
    props.activeTheme === 'Dark' ? '#0f0f0f' : '#ffffff'};
  color: ${props => (props.activeTheme === 'Dark' ? '#ffffff' : '#0f0f0f')};
  label {
    color: ${props => (props.activeTheme === 'Dark' ? '#ffffff' : '#0f0f0f')};
  }
  p {
    color: red;
  }
  button {
    color: #ffffff;
  }
`
export const StyledNavbarButtonLogout = styled.button`
  background-color: transparent;
  outline: none;
  color: ${props => (props.color === 'Dark' ? '#ffffff' : '#000000')};
  font-size: 15px;
  border-width: 2px;
  border-style: solid;
  border-color: ${props => (props.color === 'Dark' ? '#f9f9f9' : '#000000')};
  border-radius: 10px;
  padding: 10px;
`
export const StyledHomeMainContainer = styled.div`
  background-color: ${props => (props.backGroundColor ? '#0f0f0f' : '#f9f9f9')};

  min-height: 100vh;
  max-height: 100%;
`
export const StyledActiveBlock = styled.button`
  background-color: ${props => (props.isActive ? '#94a3b8' : 'transparent')};
  outline: none;
  color: ${props => (props.backGroundColor ? '#ffffff' : '#000000')};
  border-width: 0;
  text-decoration: none;
`

export const StyledHomeLeftContainer = styled.div`
  width: 15%;
  background-color: ${props => (props.backGroundColor ? '#0f0f0f' : '#ebebeb')};
  min-height: 100vh;
  max-height: 100%;
`
export const StyledNavbarContainer = styled.nav`
  background-color: ${props => (props.backGroundColor ? '#0f0f0f' : '#ebebeb')};
`

export const StyledHomeRightContainer = styled.div`
  padding: 25px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const StyledLoginButton = styled.button`
  color: '#ffffff';
`
export const LikeButton = styled.button`
  color: ${props => (props.fontColor ? '#2563eb' : '#64748b')};
`
export const StyledHomeMainContainerForHome = styled.div`
  background-color: ${props => (props.backGroundColor ? '#181818' : '#f9f9f9')};

  min-height: 100vh;
  max-height: 100%;
`
export const StyledBannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  width: 100%;
  padding: 20px;
  height: 300px;
`
