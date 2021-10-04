import styles from './NavBar.module.scss';
import { Nav, Navbar  } from 'react-bootstrap';
import Link from 'next/link';

const NavBar = ( { navItems, } ) => {
  return (
    <div className={ `navbar-wrapper ${ styles.AppNavbar }` }>

      <Navbar expand="lg" className="navbar-dark fj-mw9">
        <Link href="/"><a className="navbar-brand mr-3 font-weight-bold">Viktor Strelianyi</a></Link>
        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="nav-left">
            { navItems && navItems.map( item => {
              return (
                <Link key={ item.databaseId } href={ item.url } >
                  <a className="nav-link mr-3">{ item.name }</a>
                </Link>
              );
            } ) }
          </Nav>

          <Nav className="nav-right">
            <Link href="/register"><a className="nav-link mr-3">Sign Up</a></Link>
            <Link href="/login"><a className="nav-link btn btn-success bg-green-2 bright mr-3">Sign In</a></Link>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    </div>
  );
};

export default NavBar;