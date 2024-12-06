import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import logo from "../assets/react.svg";
export const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
            <img src={logo}>
            </img>
            React Bootstrap</Navbar.Brand>
        
      </Container>
      <Container>
        <Button variant="success" >Login</Button>
        <Button variant="danger" >Logout</Button>
      </Container>
    </Navbar>
  );
};
//export default Header;
