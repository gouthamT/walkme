import styled from 'styled-components';

export const SideNav = styled.aside`
position: fixed;
top: 0;
left:0;
bottom: 0;
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: center;
width: 12.5rem;
background: whitesmoke;
`

export const H2 = styled.h2`
text-align: center;
font-style: italic;
font-size: x-large;
`

export const Content = styled.main`
position: fixed;
top: 0;
left: 12.5rem;
right: 0;
bottom: 0;
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: center;
`

export const Anchor = styled.a`
  background: #007bff;
  border-radius: 3px;
  border: 1px solid #007bff;
  color: white;
  margin: 1rem;
  padding: 0.25em 1em;
  cursor: pointer;
  text-align: center;
  font-size: 1.25rem;
  transition: all .3s ease-in;
  &:hover {
    background: black;
  }
`

export const Iframe = styled.iframe`
position: fixed;
width: 100%;
height: 100%;
border: none;
overflow: auto;
`