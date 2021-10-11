import styles from './NavBar.module.scss';
import { Nav, Navbar  } from 'react-bootstrap';
import Link from 'next/link';
import { useLazyGetUser } from '@/apollo/actions/';
import { useState, useEffect } from 'react';

const NavBar = ( { navItems, } ) => {
  const [ user, setUser, ] = useState( null );
  const [ hasResponse, setHasResponse, ] = useState( null );
  const [ getUser, { data, error, }, ] = useLazyGetUser();

  useEffect( () => {
    getUser();
  }, [] );

  if ( data ){
    if ( data.user && !user ) setUser( data.user );
    if ( !data.user && user ) setUser( null );
    if ( !hasResponse ) setHasResponse( true );

  }

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

          { hasResponse && (
            <Nav className="nav-right">
              { user && (
                <>
                  <span className="nav-link mr-4">Welcome { user.username }</span>
                  <Link href="/logout"><a className="nav-link mr-3 btn btn-danger">Sign Out</a></Link>
                </>
              ) }
              {
                ( error || !user ) && (
                  <>
                    <Link href="/login"><a className="nav-link mr-3">Sign In</a></Link>
                    <Link href="/register"><a className="nav-link btn btn-success bg-green-2 bright">Sign Up</a></Link>
                  </>
                )
              }
            </Nav>
          )
          }
        </Navbar.Collapse>

      </Navbar>
    </div>
  );
};

export default NavBar;