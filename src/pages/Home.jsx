import React, { useState } from 'react';
import { Badge, Container, Row } from "react-bootstrap";
import Slider from '../components/Slider';
import Loader from '../components/Loader';
import { ProductData } from '../context/productContext';
import ProductCard from '../components/productCard';
import { UserData } from '../context/UserContext';




const Home = () => {
    
    const { topProducts, loading } = ProductData();
    const { isAuth } = UserData();
    return (
      <div className="home-background">
      <Slider />
      {!isAuth && ( // Show this message only when the user is not logged in
               <marquee>
               <h2 className='hints'> Please Login to Show all Products</h2>
           </marquee>
          )}

      <Container className="mt-4">
          <h4>
              Our Products <Badge bg="secondary">Top Selling</Badge>
          </h4>
          
          {loading ? (
              <Loader />
          ) : (
              <Row className="justify-content-center" style={{ gap: "1rem" }}>
                  {topProducts && topProducts.length > 0 ? (
                      topProducts.map((e) => <ProductCard key={e._id} product={e} />)
                  ) : (
                      <p>No Products Yet.</p>
                  )}
              </Row>
          )}
          
          
      </Container>
  </div>
    );
};

export default Home;