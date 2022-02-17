import styled from "styled-components";
import { Color } from "../Helper/index";

export const Container = styled.div`
height: max-content;
display: grid;
flex-direction: column;
padding: 1em;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
grid-gap: 5px;
`;
