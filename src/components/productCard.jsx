import React, { useState } from 'react';
import { Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { ProductData } from '../context/productContext';


const ProductCard = ({ product, admin }) => {
    const [loading , setLoading]=useState()
    const navigate = useNavigate();
   
    const { fetchAdminProducts } = ProductData();

    const deleteHandler = async () => {
        if (confirm("Are you sure you want to delete this product")) {
          try {
            const { data } = await axios.delete(
              `${"https://e-commorce-bd.onrender.com"}/api/product/${product._id}`,
              {
                headers: {
                  token: localStorage.getItem("token"),
                },
              }
            );
    
            toast.success(data.message);
            fetchAdminProducts();
          } catch (error) {
            toast.error(error.response.data.message);
          }
        }
      };

      const imageUrl = `${"https://e-commorce-bd.onrender.com"}/${product.image}`;
    console.log(`Image URL: ${imageUrl}`);

    return (
        <Card style={{ width: "18rem",  minHeight: "100%", marginTop: "20px" }} >
        <Card.Img
          variant="top"
          src={imageUrl}
          style={{ height: "300px", objectFit: 'cover' }}
          className="mt-2"
        />

        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
  
        <ListGroup className="list-group-flush text-secondary" style={{ border: 'none' }}>
          <ListGroup.Item> Price ₹ : {product.price}</ListGroup.Item>
        </ListGroup>
  
        <Card.Body>
          <Button onClick={() => navigate(`/product/${product._id}`)}>
            View Product
          </Button>
          {admin && (
            <Button onClick={deleteHandler} className="mx-2" variant="danger">
              Delete
            </Button>
          )}
        </Card.Body>
      </Card>
    );
};

export default ProductCard;