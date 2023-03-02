// navigation goes here
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  return (
    <Nav>

      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Nav.Link href="/register">See The SPICE!!</Nav.Link>
      </Nav.Item> */}

      
    </Nav>
  );
}

export default Navigation;