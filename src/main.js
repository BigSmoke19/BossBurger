
import './styles/main.css';

const Main = () => {

    const handleVisit = () =>{
        const link ="https://maps.app.goo.gl/65bg6Z4PtM23J3Rr5";
        window.open(link, '_blank');
    }

    return ( 
        <div className='main' id='main'>
            <div className="container">
                <div className="main-info-container">
                <img className='bg-image' src="./images/bg2.jpg" alt="BigBurger" />
                    <div className='info'>
                        <span>Being a <span className='boss'>Boss</span> is not for everyone</span>
                        <span> Dive deep into our flavorful Menu and discover a world of taste sensations!
                        Come visit us and taste the difference.</span>
                        <span>Be a <span className='boss'>Boss</span>, Eat like one</span>
                        
                    </div>
                    <div className='button' onClick={handleVisit}>
                        <p>Visit Us</p>
                        <img className='arrow' src="./images/arrow.png" alt="" />
                    </div>
                </div>
                <div className='burger'>
                    <img className='burger-image' src="./images/bg2.jpg" alt="BigBurger" />
                </div>
            </div>
        </div>
     );
}
 
export default Main;