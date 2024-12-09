import { useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { UserContext } from "../appContext/appContext";

const Login = () => {
  const myuser = useContext(UserContext);
  // define the schema
  // define the formik
  const userLogin = () => {
    alert("Sucess");
    console.log(myuser.isLoggedIn);
  
    console.log(myuser.isLoggedIn);
    
  };
  return (
    <Container className="mt-5">
      <h1>Login</h1>
      <Form className="mt-5" onSubmit={userLogin}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>password</Form.Label>
          <Form.Control type="password" placeholder="enter password" />
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  );
};

export default Login;
