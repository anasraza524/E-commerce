import React from 'react'

import Carousel from 'react-bootstrap/Carousel';
const SlideShow = () => {
  return (
    <div>
 <Carousel >
      <Carousel.Item sx={{height:{xs:'200px',lg:'400px'}}} interval={3000}>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/premium-psd/headphone-brand-product-sale-facebook-cover-banner_161103-93.jpg?w=2000"
          alt="First slide"
        />
      
      </Carousel.Item>
      <Carousel.Item sx={{height:{xs:'200px',lg:'400px'}}}  interval={3000}>
        <img
          className="d-block w-100"
          src="https://graphicsfamily.com/wp-content/uploads/edd/2021/07/Shop-Products-Social-Media-Banner-Design-Template-scaled.jpg"
          alt="Second slide"
        />
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item sx={{height:{xs:'200px',lg:'400px'}}} interval={3000}>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/premium-psd/smoothie-healthy-drink-menu-promotion-facebook-cover-banner-template_159024-302.jpg?w=2000"
          alt="Third slide"
        />

      
      </Carousel.Item>
      {/* <Carousel.Item sx={{height:{xs:'200px',lg:'400px'}}} interval={3000}>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/id/1185615547/vector/flat-lay-sunscreen-banner-ads.jpg?s=170667a&w=0&k=20&c=v2f-TN9OFoNicAtAVkZ7T43roJh6I0hpkSKpyJGCvSI="
          alt="Third slide"
        />


      </Carousel.Item> */}
      <Carousel.Item sx={{height:{xs:'200px',lg:'400px'}}} interval={3000}>
        <img
          className="d-block w-100"
          src="https://i.ytimg.com/vi/IRD3sinNowU/maxresdefault.jpg"
          alt="Third slide"
        />


      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default SlideShow