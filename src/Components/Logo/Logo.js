import React from 'react';
import Tilt from 'react-tilt';
import Detective from'./Logo.png';
import './Logo.css';

const Logo = () => {
	return(
		<div className='ma4 mto'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 150, width: 150 }} >
			<div className="Tilt-inner pa3"> 
			<img styel ={{paddingTop: '5px'}} alt='Logo' src={Detective}/> </div>
			</Tilt>
		</div>
		);
}
		
export default Logo;
