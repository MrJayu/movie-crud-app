import styled from "styled-components";
import { Color } from "../Helper/index";

export const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 100%;
`;
export const ItemContainer = styled.div`
height: max-content;
display: grid;
flex-direction: column;
grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
grid-gap: 8px;
`;
export const ItemWrapper = styled.div`
margin:8px 8px;
border-radius: 10px;
width: 215px;
background-size: cover;
box-shadow: 0 4px 4px 0 rgba(0,0,0,1);
background-repeat: no-repeat;
transition: 0.3s;
height: 300px;
background-color:${Color.white};
`;
export const DrawerContents = styled.div`
 width: 90%;
 background-color:aqua;
 border-radius: 10px;
 margin: 10px 10px;
 padding: 10px;
`;
export const Drawer = styled.div`
  height: 100vh;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(0, 0, 0,0.8);
  transition: all 3s ease-in-out;
  position:absolute;
`;
export const TitleText = styled.h1`
color:yellow;
text-justify: auto;
text-align: center;
font-size: small;
`;
export const Logout = styled.h1`
color:violet;
display: flex;
align-self: center;
width: max-content;
text-justify: auto;
text-align: center;
font-size: small;
`;