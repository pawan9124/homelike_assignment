import React, { Component } from "react";
import PropTypes from "prop-types";

class Gallery extends Component {
  componentDidMount() {
    let imageData = document.getElementsByClassName("galleryImage");
    imageData[0].click();
  }
  showImage = imgs => {
    let expandImg = document.getElementById("expandedImg");
    let imgText = document.getElementById("imgtext");
    expandImg.src = imgs.target.src;
    imgText.innerHTML = imgs.target.alt;
    expandImg.parentElement.style.display = "block";
  };
  render() {
    let image = "http://localhost:9000/images/apartments/";
    const images = this.props.images;
    return (
      <div>
        <div className="container">
          <img id="expandedImg" style={{ width: "70%" }} />
          <div id="imgtext" />
        </div>
        <div className="row-gallery">
          {images.map((src, index) => {
            return (
              <div className="column-gallery" keys={"indexGallery" + index}>
                <img
                  src={image + src}
                  alt={src}
                  className="galleryImage grow"
                  style={{ width: "100%" }}
                  onClick={this.showImage}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
Gallery.propTypes = {
  images: PropTypes.array.isRequired
};
export default Gallery;
