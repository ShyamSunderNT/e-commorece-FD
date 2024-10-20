// import React, { useState } from 'react';
// import axios from 'axios';
   

// const ProductForm = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [price, setPrice] = useState('');
//   const [stock, setStock] = useState('');
//   const [image, setImage] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('category', category);
//     formData.append('price', price);
//     formData.append('stock', stock);
//     formData.append('image', image);

//     try {
//       const response = await axios.post("http://localhost:5000/api/product/new", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setMessage(response.data.message);
//       // Reset form fields
//       setTitle('');
//       setDescription('');
//       setCategory('');
//       setPrice('');
//       setStock('');
//       setImage(null);
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Error creating product');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Create Product</h2>
//       {message && <div className="alert alert-info">{message}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Title</label>
//           <input
//             type="text"
//             className="form-control"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea
//             className="form-control"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Category</label>
//           <input
//             type="text"
//             className="form-control"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Price</label>
//           <input
//             type="number"
//             className="form-control"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Stock</label>
//           <input
//             type="number"
//             className="form-control"
//             value={stock}
//             onChange={(e) => setStock(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Image</label>
//           <input
//             type="file"
//             className="form-control"
//             onChange={(e) => setImage(e.target.files[0])}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Create Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProductForm;


import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

const ProductForm = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    
    Object.keys(formData).forEach(key => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      const response = await axios.post("https://e-commorce-bd.onrender.com/api/product/new", formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.imageUrl) {
        setUploadedImageUrl(response.data.imageUrl); // Update state with the uploaded image URL
      }

      alert('Product created successfully!');
      // Reset the form after successful submission
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        image: null,
      });
      setUploadedImageUrl(''); // Reset the uploaded image URL
    } catch (error) {
      console.error("Error creating product:", error);
      alert('Error creating product. Please try again.'); // Inform the user about the error
    }
  };

  return (
    <Container>
      <h2>Create Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
        </Form.Group>
        
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required />
        </Form.Group>
        
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} required />
        </Form.Group>

        {uploadedImageUrl && (
          <div>
            <h3>Uploaded Image:</h3>
            <img src={uploadedImageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}

        <Button variant="primary" type="submit">Create Product</Button>
      </Form>
    </Container>
  );
};

export default ProductForm;
