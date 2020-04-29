const backgroundPath = process.env.PUBLIC_URL + '/assets/Backgrounds/';

export const lightTheme = {
  body: 'url('+backgroundPath + 'whiteCity.jpg)',
  text: '#363537',
  toggleBorder: '#FFF',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
  header: "rgb(201, 132, 116, 0.7)",
  iheader: "rgb(201, 132, 116)",
  cBody: "rgb(255, 255, 255)",
  footer: "rgba(201, 132, 116, 0.589)",
  hComment: "rgb(167, 210, 203)",
  bComment: "rgb(241, 255, 196)",
  input: "rgb(255, 255, 255)",
  chat: "rgb(233, 233, 233)",
  chatBoxArea: "rgb(255, 255, 255)",
  chatBox: "rgb(255, 255, 255)",
  sent: "rgb(255, 179, 179)",
  received: "rgb(173, 216, 230)",
  shadow: "rgb(255, 255, 255)",
  link: "rgb(0, 0, 0)"
}

export const darkTheme = {
  body: 'url('+backgroundPath + 'blackCity.jpg)',
  text: 'rgb(179, 161, 7)',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#091236, #1E215D)',
  header: "rgb(75, 0, 0, 0.589)",
  iheader: "rgb(75, 0, 0)",
  cBody: "rgb(36, 36, 36)",
  footer: "rgba(75, 0, 0, 0.589)",
  hComment: "rgb(167, 210, 203)",
  bComment: "rgb(241, 255, 196)",
  input: "rgb(151, 151, 151)",
  chat: "rgb(36, 36, 36)",
  chatBoxArea: "rgb(187, 187, 187)",
  chatBoxColor: "rgb(20, 52, 112)",
  sent: "rgb(117, 43, 43)",
  received: "rgb(43, 69, 117)",
  shadow: "rgb(0, 0, 0)",
  link: "rgb(255, 255, 255)"
}