import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  background-image: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  transition: all 0.25s linear;
}

h1,h2,h3,h4,h5,h6,h7 {
  color: ${({ theme }) => theme.text};
  text-shadow: 2px 2px 5px ${({ theme }) => theme.shadow};
}

#header {
  background: ${({ theme }) => theme.header};
}

#footer {
  background: ${({ theme }) => theme.footer};
}

.colorHeader {
  background: ${({ theme }) => theme.iheader};
}

.colorBody {
  background: ${({ theme }) => theme.cBody};
}

.colorFooter {
  background: ${({ theme }) => theme.footer};
}

.colorHeaderComment {
  background: ${({ theme }) => theme.hComment};
}

.colorBodyComment {
  background: ${({ theme }) => theme.bComment};
}

.inputColor {
  background: ${({ theme }) => theme.input};
}

.chatBoxArea {
  background: ${({ theme }) => theme.chatBoxArea};
}

.chatBoxColor {
  background: ${({ theme }) => theme.chatBox};
}

.chatColor {
  background: ${({ theme }) => theme.chat};
}

.sent {
  background: ${({ theme }) => theme.sent};
}

.received {
  background: ${({ theme }) => theme.received};
}

.link {
  color: ${({ theme }) => theme.shadow};
  background-color: ${({ theme }) => theme.link};
  padding: 0 5px 0 5px;
  text-shadow: none;
}

.onlineTitle {
  color: ${({ theme }) => theme.link};
}
`