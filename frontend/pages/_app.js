import 'bootstrap/dist/css/bootstrap.min.css';
import '@/src/styles/index.scss';
import '@/src/styles/layout.scss';

// import App from 'next/app';
import NavBar from '@/components/shared/NavBar/NavBar';
import Hero from '@/components/shared/Hero/Hero';
import Footer from '@/components/shared/Footer/Footer';

const MyApp = ( { Component, pageProps, } ) => {
  // console.log( 'MyApp: ', pageProps );

  return (
    <div className="portfolio-app">

      <header>
        <NavBar navItems={ pageProps.navItems }/>
      </header>

      <main>
        { Component.name === 'PageHome' && <Hero/> }
        <div className="container">
          <Component { ...pageProps }/>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

MyApp.getInitialProps = async ( context ) => {
  // const initialProps = App.getInitialProps && await App.getInitialProps( context );
  // console.log( initialProps );

  return {
    pageProps: {
      navItems: [
        { databaseId: 0, name: 'Projects', url: '/projects', },
        { databaseId: 1, name: 'Forum', url: '/forum/categories', },
        { databaseId: 2, name: 'Cv', url: '/cv', },
        { databaseId: 3, name: 'Ask me', url: '/ask-me', },
      ],
      // ...initialProps.pageProps,
    },
  };
};

export default MyApp;
