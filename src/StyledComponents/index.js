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
`
