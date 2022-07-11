import { Link } from "react-router-dom";
import { Body, Display, Container, H1, H3, Button, Background } from "./styles";

const Landing = () => {
  return (
    <Body>
      <Display>
        <Container>
          <H1>Welcome to API Dogs!</H1>
          <H3>Cuteness overload at the click of the Woof!</H3>
          <Link to="/home">
            <Button>WOOF!</Button>
          </Link>
        </Container>
        <Background
          src="https://roobeedoo2.files.wordpress.com/2017/08/snoopy-sticks.gif?w=352"
          alt=""
        />
      </Display>
    </Body>
  );
};

export default Landing;
