import styled from "styled-components";

export const Background = styled.img`
  margin-top: 55px;
  width: 30%;
  height: 30%;
  position: relative;
`;

export const Body = styled.div`
  background-color: #80d0d0;
`;

export const Display = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  background-color: #b02929;
  padding: 0.3em 0.8em;
  font-weight: bold;
  font-size: 50px;
  color: white;
  letter-spacing: 3px;
  text-shadow: -1px 1px 0px rgba(127, 30, 30, 0.8);
  font-family: "Covered By Your Grace", cursive;
  border-radius: 0.4em;
  border: 3px solid black;
  box-shadow: -0.1em 0.1em rgb(2, 2, 11);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translate(-0.05em, -0.05em);
    box-shadow: -0.15em 0.15em rgb(2, 2, 11);
  }

  &:active {
    transform: translate(0.05em, 0.05em);
    box-shadow: -0.1em 0.1em rgb(2, 2, 11);
  }
`;

export const H1 = styled.h1`
  font-size: 100px;
  font-family: "Covered By Your Grace", cursive;
  font-weight: 200;
  margin-top: 0;
`;

export const H3 = styled.h3`
  font-size: 30px;
  font-family: "Poppins", sans-serif;
  font-weight: 200;
`;
