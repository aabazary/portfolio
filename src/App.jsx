// App.jsx
import { lazy, Suspense } from "react";
import LazyLoad from "react-lazyload";
import BackgroundStars from "./components/stars/BackgroundStars"; // adjust the path as needed

const HomePage = lazy(() => import("./components/home/Home"));
const Portfolio = lazy(() => import("./components/portfolio/Portfolio"));
const Contact = lazy(() => import("./components/contact/Contact"));
const About = lazy(()=>  import("./components/about/About"));

const App = () => {
  return (
    <div className="container">
      {/* Global background stars */}
      <div className="background-canvas">
        <BackgroundStars />
      </div>
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="home">
            <HomePage />
          </section>
        </LazyLoad>
      </Suspense>
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="about">
            <About />
          </section>
        </LazyLoad>
      </Suspense>
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <Portfolio />
        </LazyLoad>
      </Suspense>
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="contact">
            <Contact />
          </section>
        </LazyLoad>
      </Suspense>
    </div>
  );
};

export default App;
