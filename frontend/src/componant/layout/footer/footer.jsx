import React from 'react'
import appStoreIcon from '../../Images/appStoreIcon.png'
import playStoreIcon from '../../Images/playStoreIcon.png'
import './footer.css'
function footer() {
    return (
        <footer>
         <div className="leftFooter">
         <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
         < img src={appStoreIcon} alt="" />
        <img src={playStoreIcon} alt="" />
         </div>
         <div className="midFooter">
         <h1>Alpha-ECOMMERCE</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; RamVijayYadav</p>
         </div>
         <div className="rightFooter">
         <h4>Follow Us</h4>
         
         <a href="http://instagram.com/ramvijay2406">Instagram<br></br></a>
        <a href="http://youtube.com/6packprogramemr">Youtube</a><br></br>
        <a href="http://instagram.com/ram">Facebook</a>
         </div>
        </footer>
    );
}

export default footer
