import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Button, Image, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserData } from '../context/UserContext';
import toast from "react-hot-toast";
import { CartData } from '../context/CartContext';



const ProductDetails = () => {
    const [product, setProduct] = useState([]);
    const [stock, setStock] = useState("");

    const params = useParams();

    const { isAuth, user } = UserData();
    const { addToCart } = CartData();

    async function fetchProduct() {
      try {
          const token = localStorage.getItem("token"); // Retrieve the token
  
          const config = {
              headers: {
                  Authorization: `Bearer ${token}` // Set the authorization header
              }
          };
  
          const { data } = await axios.get(`${"https://e-commorce-bd.onrender.com"}/api/product/${params.id}`, config);
  
          setProduct(data.product);
      } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || "Failed to fetch product");
      }
  }
  

      async function updateStock() {
        try {
            const token = localStorage.getItem("token"); // Retrieve the token
    
            const { data } = await axios.put(
                `${"https://e-commorce-bd.onrender.com"}/api/product/${params.id}`,
                { stock },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Set Authorization header
                    },
                }
            );
    
            toast.success(data.message);
            fetchProduct(); // Fetch updated product data
            setStock(""); // Reset stock input
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update stock");
        }
    }
    
    
      useEffect(() => {
        fetchProduct();
      }, []);

      const addToCartHandler = async (product) => {
        await addToCart(product);
      };
    

    return (
        <Container className="mt-4">
        {product && (
          <Row className="mt-5">
            <Col md={6}>
              <Image src={`${"https://e-commorce-bd.onrender.com"}/${product.image}`} alt="" fluid />
            </Col>
            <Col md={6}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>category - {product.category}</p>
              <p>Price - ₹ {product.price}</p>
              {user.role === "admin" && <p>stock - {product.stock}</p>}
              {user.role === "admin" && (
                <>
                  <input
                    type="number"
                    placeholder="update Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                  <Button className="mx-2" onClick={updateStock}>
                    Update Stock
                  </Button>
                </>
              )}{" "}
              <br />
              {product.stock === 0 ? (
                <p className="text-danger">Out of Stock</p>
              ) : (
                <>
                  {isAuth ? (
                    <Button
                       onClick={() => addToCartHandler(product._id)}
                      variant="secondary"
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <p className="text-danger">
                      Please Login to Add this product in your cart
                    </p>
                  )}
                </>
              )}
            </Col>
          </Row>
        )}
      </Container>
    );
  };

export default ProductDetails;