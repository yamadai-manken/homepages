import Header from './header/Header'
import Body from './body/Body'
import Footer from './footer/Footer'
import About from './sections/About'
import { useState } from 'react'



export default function Layout() {
  const pages = [<Body />, <About />]
  const [pageIndex, setPageIndex] = useState(0);
  
  const nextPage = () => {
    setPageIndex((prev) => (prev + 1) % pages.length); // ループ表示
  };

  return (
    <>
      <Header />
      {pages[pageIndex]}

      
      <Footer />
    </>
  );
}

