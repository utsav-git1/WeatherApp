import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
    backgroundColor: '#e6faff',
    fontColor: 'black'
}

export const darkTheme = {
    backgroundColor: '#00004d',
    fontColor: 'white'
}

export const GlobalStyles = createGlobalStyle`
body{
    background-color:${props => props.theme.backgroundColor};
    color: ${props => props.theme.fontColor};
    transition: 0.5s all;
}
`