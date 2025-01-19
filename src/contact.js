import './styles/contact.css'

const Contact = () => {

    const handleCopyNumber = ()=>{
            const text = "71271468";
            const textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert(`Number "${text}" copied to clipboard!`);
    }

    return ( 
        <div className="contact" id="contact">
            <div className='contact-header'>
                <h1>Visit US</h1>
                <p>Enjoy our beloved Dishes</p>
            </div>
            <div className='contact-info'>
                <div className='location'>
                    <div className='icons-container'><a href="https://maps.app.goo.gl/65bg6Z4PtM23J3Rr5" target="_blank" ><img className='icons' src="./images/location.png" alt="location" /></a></div>
                    <div className='info-container'>Mayafadoun Main street, Near Jaber Sweets</div>
                </div>
                <div className='number'>
                    <div className='icons-container'><img onClick={handleCopyNumber} className='icons' src="./images/phone.png" alt="phone" /></div>
                    <div className='info-container'>71 271 468</div>
                </div>
                <div className='social'>
                    <div className='social-icons-container'>
                        <a href="https://www.instagram.com/boss_burger_1/?igsh=d3RnMXBqc2p5dGRi#" target="_blank" ><img className='icons' src="./images/instagram.png" alt="instagram" /></a>
                        <a href="https://www.facebook.com/BossBurger1?mibextid=qi2Omg&rdid=f2dmqLOwHspjWeac&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14tEKfywH5%2F%3Fmibextid%3Dqi2Omg"  rel="noopener noreferrer"><img className='icons' src="./images/facebook.png" alt="instagram" /></a>
                    </div>
                    <div className='social-info-container'>
                        <div>Boss_burger_1</div>
                        <div>Bossburger1</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Contact;