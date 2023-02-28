// navigation goes here
import Nav from 'react-bootstrap/Nav';

function Navigation() {
  return (
    <Nav
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/register">Register</Nav.Link>
      </Nav.Item>
      
    </Nav>
  );
}

export default Navigation;