import {useEffect} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import CaseStudies from './pages/CaseStudies';
import XrSimulator from './pages/XrSimulator';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Scroll to top on route change.
function ScrollToTop() {
  const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/simulators" element={<XrSimulator />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
