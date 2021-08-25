import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="fj-hero">
      <div className="fj-hero-wrapper row">
        <div className="hero-left col-md-6">
          <h1 className="white hero-title">Hi, I'm Viktor. Experienced Full-Stack Developer</h1>
          <h2 className="white hero-subtitle">Check my portfolio and video tutorials</h2>
          <div className="button-container">
            <Link href="/portfolio">
              <a className="btn btn-main bg-blue ttu">See my work</a>
            </Link>
          </div>
        </div>
        <div className="hero-right col-md-6">
          <div className="hero-image-container">
            <Link href="/portfolio">
              <a className="grow hero-link">
                <Image
                  className="hero-image"
                  src="https://i.udemycdn.com/course/750x422/1652608_662b_8.jpg"
                  layout="fill"
                  quality="75"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;