import React from 'react';
import './FaceRecognition.css';

const faceRecognition = ({imageUrl, box}) => {
	return(
		<div className = 'center'>
		 	<div className = 'absolute mt2'>
				<img id='inputImage' alt='testImage' src={imageUrl} width='500px' height='auto'/>
				<div className = 'bounding_box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
		);
}
		
export default faceRecognition;

