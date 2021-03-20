import 'bootstrap/dist/css/bootstrap.min.css';
import '@/src/styles/index.scss';
import '@/src/styles/layout.scss';

import Navbar from '@/components/shared/Navbar/Navbar';
import Hero from '@/components/shared/Hero/Hero';
import Footer from '@/components/shared/Footer/Footer';

const App = ( { Component, pageProps, } ) => {
  return (
    <div className="portfolio-app">
      <header>
        <Navbar navItems={ pageProps.navItems }/>
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

App.getInitialProps = async ( context ) => {

  return {
    pageProps: {
      navItems: [
        { databaseId: 0, name: 'Portfolio', url: '/portfolio', },
        { databaseId: 1, name: 'Courses', url: '/courses', },
        { databaseId: 2, name: 'Cv', url: '/cv', },
        { databaseId: 3, name: 'Ask me', url: '/ask-me', },
      ],
    },
  };
};

export default App;
