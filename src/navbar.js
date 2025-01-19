
import './styles/navbar.css';
import { useSelector } from 'react-redux';

const NavBar = ({handleCart}) => {

    const cartCount = useSelector(state=>state.cart.count);

    const handleLinkChange = (link)=>{
        
    const mainLink = document.getElementById('main-link');
    const menuLink = document.getElementById('menu-link');
    const contactLink = document.getElementById('contact-link');

        if (link === "main") {
            mainLink.style.backgroundColor = 'rgb(230,37,37)';
            menuLink.style.backgroundColor = '';
            contactLink.style.backgroundColor = '';
          } else if (link === "contact") {
            contactLink.style.backgroundColor = 'rgb(230,37,37)';
            mainLink.style.backgroundColor = '';
            menuLink.style.backgroundColor = '';
          } else {
            menuLink.style.backgroundColor = 'rgb(230,37,37)';
            contactLink.style.backgroundColor = '';
            mainLink.style.backgroundColor = '';
          }
    }

    return ( 
        <div className="navbar">
            <div className='left'>
                Boss<span className='title2'> Burger</span>
            </div>
            <div className='mid'>
                <img className='logo' src="./images/logos.png" alt="" />
            </div>
            <div className='right'>
                <a id='main-link' className='link' href="#main" onClick={()=>handleLinkChange("main")}>Home</a>
                <a id='menu-link' className='link' href="#menu" onClick={()=>handleLinkChange("menu")}>Menu</a>
                <a id='contact-link' className='link' href="#contact" onClick={()=>handleLinkChange("contact")}>Contact</a>
                <div className='cart-container' onClick={handleCart}>
                    <img className='nav-cart-logo' src="./images/cartw.png" alt="cart" />
                    <span className='cart-count'>{cartCount}</span>
                </div>
            </div>
        </div>
     );
}
 
export default NavBar;