import css from "styled-jsx/css";
import { fonts, colors, breakpoints } from "../../styles/theme";
import { addOpacityColor } from "../../styles/utilis";
const backgroundColor = addOpacityColor(colors.primary, 0.3);
export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }
  main {
    background: #fff;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: auto;
  }
  @media (min-width: ${breakpoints.mobile}) {
    main {
      height: 90vh;
      width: ${breakpoints.mobile};
      padding-left: 14px;
    }
  }
`;
export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${backgroundColor} 1px, #fdfdfd 1px),
      radial-gradient(${backgroundColor} 1px, #fdfdfd 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    font-family: ${fonts.base};
  }
  * {
    box-sizing: border-box;
  }
  textarea,
  input {
    font-family: ${fonts.base};
  }
  h1 a {
    color: ${colors.primary};
  }
`;
