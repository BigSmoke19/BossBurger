
import './styles/main.css';

const Main = ({arabic}) => {

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
                        Being a <span className='boss'>Boss</span> is not for everyone <br /> <br />
                        Dive deep into our flavorful Menu  <br />
                        and discover a world of taste sensations! <br />
                        Come visit us and taste the difference. <br /> <br />
                        Be a <span className='boss'>Boss</span>, Eat like one
                        
                    </div>
                    <div className='button' onClick={handleVisit}>
                        <p>{(arabic)?"زورونا":"Visit Us"}</p>
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