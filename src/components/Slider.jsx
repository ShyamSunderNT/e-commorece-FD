import { Carousel } from "react-bootstrap";
import './Slider.css';// Import the CSS file

const Slider = () => {
  return (
    <Carousel className="custom-carousel">
      <Carousel.Item>
        <img src="https://sparepartsonline.in/wp-content/uploads/2018/08/mobile-phone-accessories-banner.jpg" alt="img" className="d-block w-100" />
      </Carousel.Item>
      
      <Carousel.Item>
        <img src="https://marketplace.canva.com/EAFIMHQ5yhE/1/0/1600w/canva-orange-and-teal-summer-sale-kids-fashion-bright-website-banner-L6kUMOWkkho.jpg" alt="img" className="d-block w-100" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://printnew.in/wp-content/uploads/2021/11/Printed-Graphic-T-shirt-Banner-For-Print-New-India-1-1024x441-1.png" alt="img" className="d-block w-100" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://i.pinimg.com/originals/d4/a8/fa/d4a8faa6147ef48adf272d83e2eb279e.jpg" alt="img" className="d-block w-100" />
      </Carousel.Item>
      {/* <Carousel.Item>
        <img src="https://indiater.com/wp-content/uploads/2021/03/free-online-shopping-mobile-application-promotion-banner-vector-template-990x559.jpg" alt="img" className="d-block w-100" />
      </Carousel.Item> */}
      <Carousel.Item>
        <img src="https://stitchsway.com/wp-content/uploads/2024/07/Summer-Sale-Website-Banner-1-01-scaled.jpg" alt="img" className="d-block w-100" />
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
