// App.js
import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Main from './main';
import Menu from './menu';
import Contact from './contact';
import Order from './order';

const Home = () => {

  const [cartScroll,setCartScroll] = useState(false);
  
  window.addEventListener('beforeunload', () => {
    localStorage.clear();
  });
  


  useEffect(() => {
    const event = new WheelEvent('wheel',
       { deltaY: 1, bubbles: true, cancelable: true });
     window.dispatchEvent(event);

    const mainLink = document.getElementById('main-link');
    //const mainSection = document.getElementById('main');

    const menuLink = document.getElementById('menu-link');
    const menuSection = document.getElementById('menu');

    const contactLink = document.getElementById('contact-link');
    const contactSection = document.getElementById('contact');

    const handleScroll = () => {

      //const mainPosition = mainSection.getBoundingClientRect().top;
      const menuPosition = menuSection.getBoundingClientRect().top;
      const contactPosition = contactSection.getBoundingClientRect().top;

      //console.log(mainPosition, menuPosition, contactPosition);

      if (menuPosition > 250 && contactPosition > 250) {
        mainLink.style.backgroundColor = 'rgb(230,37,37)';
        menuLink.style.backgroundColor = '';
        contactLink.style.backgroundColor = '';
      } else if (contactPosition <= 250) {
        contactLink.style.backgroundColor = 'rgb(230,37,37)';
        mainLink.style.backgroundColor = '';
        menuLink.style.backgroundColor = '';
      } else {
        menuLink.style.backgroundColor = 'rgb(230,37,37)';
        contactLink.style.backgroundColor = '';
        mainLink.style.backgroundColor = '';
      }
};

// Mouse wheel event listener
window.addEventListener('wheel', (event) => {
  //event.preventDefault(); // Prevent the default scroll behavior
  window.scrollBy(0, event.deltaY); // Adjust the scroll position manually
  handleScroll(); // Call the handleScroll function
});

// Touch move event listener
let touchStartY = 0;

window.addEventListener('touchstart', (event) => {
  touchStartY = event.touches[0].clientY;
});

window.addEventListener('touchmove', (event) => {
  //event.preventDefault(); // Prevent the default scroll behavior
  const touchEndY = event.touches[0].clientY;
  const deltaY = touchStartY - touchEndY;
  window.scrollBy(0, deltaY); // Adjust the scroll position manually
  touchStartY = touchEndY; // Update the touch start position
  handleScroll(); // Call the handleScroll function
});

//console.log("event attached");

/*return ()=>{
  window.removeEventListener("scroll",handleScroll);
  console.log("event removed");
}*/

  }, []);

  const handleCart = ()=>{
    setCartScroll(!cartScroll);
  }

  return (
    <div className="home" id='home'>
      <Navbar handleCart={handleCart}/>
      <Order scroll={cartScroll} handleCart={handleCart}/>
      <Main />
      <Menu />
      <Contact />
    </div>
  );
};

export default Home;
