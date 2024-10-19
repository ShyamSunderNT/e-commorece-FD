// import { Button, Container, Nav, Navbar } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { UserData } from "../context/UserContext";
// import toast from "react-hot-toast";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import React, { useState } from 'react';
// import { CartData } from "../context/CartContext";
// import "./header.css"

// const Header = () => {
//     const navigate = useNavigate();
//     const { isAuth, logout } = UserData();
//     const { totalItem } = CartData();

//     const logoutHandler = () => {
//         logout(); // Call the logout function from context
//         toast.success("Logged Out");
//         navigate("/login"); // Optionally redirect to login after logout
//       };
//       return (
//         <Navbar
//           bg="dark"
//           data-bs-theme="dark"
//           expand="lg"
//           className="lg-body-tertiary"
//         >
//           <Container fluid>
//             <Navbar.Brand>Easy Shop</Navbar.Brand>
//             <Navbar.Toggle aria-controls="navbarScroll" />
//             <Navbar.Collapse id="navbarScroll">
//               <Nav
//                 className="me-auto my-2 my-lg-0 gap-4"
//                 style={{ maxHeight: "100px" }}
//                 navbarScroll
//               >
               
//                   <Link to="/" className="nav-link">Home</Link>
                
//                   <Link to="/products" className="nav-link">Products</Link>
                
//                 {isAuth && (
                  
//                     <Link to="/account">Account</Link>
                 
//                 )}
//               </Nav>
    
//               {isAuth && (
//                         <Button variant="success" className="mx-2" style={{ fontSize: "20px" }} onClick={() => navigate("/cart")}>
//                             <AiOutlineShoppingCart />{" "}
//                             <span style={{ background: "red", padding: "3px", borderRadius: "50%", color: "white" }}>
//                                 {totalItem} {/* Display number of items in cart */}
//                             </span>
//                         </Button>
//                     )}
    
//               {isAuth ? (
//                 <Button onClick={logoutHandler} variant="danger">
//                   Logout
//                 </Button>
//               ) : (
//                 <Button onClick={() => navigate("/login")} variant="success">
//                   Login
//                 </Button>
//               )}
//             </Navbar.Collapse>
//           </Container>
//         </Navbar>
//       );
//     };
    
//     export default Header;

import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import React from 'react';
import { CartData } from "../context/CartContext";
import "./header.css";

const Header = () => {
    const navigate = useNavigate();
    const { isAuth, logout } = UserData();
    const { totalItem } = CartData();

    const logoutHandler = () => {
        logout(); // Call the logout function from context
        toast.success("Logged Out");
        navigate("/login"); // Redirect to login after logout
    };

    return (
        <Navbar
            bg="dark"
            data-bs-theme="dark"
            expand="lg"
            className="lg-body-tertiary"
        >
            <Container fluid>
                <Navbar.Brand>Easy Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 gap-4"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <Link to="/" className="nav-link">Home</Link>
                        {isAuth && (
                            <>
                                <Link to="/products" className="nav-link">Products</Link>
                                <Link to="/account" className="nav-link">Account</Link>
                            </>
                        )}
                    </Nav>

                    {isAuth && (
                        <Button variant="success" className="mx-2" style={{ fontSize: "20px" }} onClick={() => navigate("/cart")}>
                            <AiOutlineShoppingCart />{" "}
                            <span style={{ background: "red", padding: "3px", borderRadius: "50%", color: "white" }}>
                                {totalItem} {/* Display number of items in cart */}
                            </span>
                        </Button>
                    )}

                    {isAuth ? (
                        <Button onClick={logoutHandler} variant="danger">
                            Logout
                        </Button>
                    ) : (
                        <Button onClick={() => navigate("/login")} variant="success">
                            Login
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
