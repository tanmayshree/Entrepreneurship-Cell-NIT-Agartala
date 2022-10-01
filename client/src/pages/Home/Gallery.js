import Gallery from 'react-grid-gallery';
import { IMAGES } from './GalleryData';
import React from "react";

import './Gallery.css';
import SectionTitle from '../../components/Title';
const GalleryPage = () => {
  return (
    <div style={{ marginTop: "150px" }} className='gallery-page'>
      <SectionTitle title={"Gallery"} />
      <div className='gallery-wrapper' z>
        <Gallery images={IMAGES} enableImageSelection={false} enableKeyboardInput={true} onClickImage={{}} margin={7.5} backdropClosesModal={true} />
      </div>
    </div>
  );
}

export default GalleryPage;