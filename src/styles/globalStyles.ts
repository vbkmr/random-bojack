import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN", "Hiragino Sans", Meiryo, "メイリオ", Helvetica, Arial, Sans-Serif;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${({ theme }) => theme.body.background};
    color: ${({ theme }) => theme.body.color};
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
