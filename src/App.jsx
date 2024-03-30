import * as Sentry from '@sentry/react';

import {
  Navbar,
  Hero,
  Highlights,
  Model,
  Features,
  HowItWorks,
  Footer,
} from "./components";
import "./App.css";

function App() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}

export default Sentry.withProfiler(App);
