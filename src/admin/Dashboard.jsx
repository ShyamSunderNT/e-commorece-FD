// import React from 'react';
// import { Container, Tab, Tabs } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Home from '../pages/Home';
// import AdminOrders from './pages/AdminOrders';
// import AllData from './pages/AllData';
// import { ProductData } from '../context/productContext';


// const Dashboard = ({ user }) => {

//     const navigate = useNavigate();
//   if (user.role !== "admin") return navigate("/");

//   const { adminProducts } = ProductData();
//     return (
//         <Container>
//         <Tabs
//           defaultActiveKey="home"
//           id="uncontrolled-tab-example"
//           className="mb-3"
//         >
//           <Tab eventKey={"home"} title={"Dashboard"}>
//             <Home products={adminProducts} />
//           </Tab>
//           <Tab eventKey={"data"} title={"All Data"}>
//             <AllData products={adminProducts} />
//           </Tab>
//           <Tab eventKey={"orders"} title={"Orders"}>
//             <AdminOrders />
//           </Tab>
//         </Tabs>
//       </Container>
//     );
// };

// export default Dashboard;

import React, { useEffect } from 'react';
import { Container, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Home from '../pages/Home';
import AdminOrders from './pages/AdminOrders';
import AllData from './pages/AllData';
import { ProductData } from '../context/productContext';
import ProductForm from './pages/Addproduct';


const Dashboard = ({ user }) => {
    const navigate = useNavigate();
    const { adminProducts } = ProductData();

    useEffect(() => {
        if (user.role !== "admin") {
            navigate("/");
        }
    }, [user.role, navigate]);

    return (
        <Container>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="Dashboard">
                    <Home products={adminProducts} />
                </Tab>
                <Tab eventKey="data" title="All Data">
                    <AllData products={adminProducts} />
                </Tab>
                <Tab eventKey="orders" title="Orders">
                    <AdminOrders />
                </Tab>
                <Tab eventKey="addProduct" title="Add Product">
                    <ProductForm /> {/* Add ProductForm tab */}
                </Tab>
            </Tabs>
        </Container>
    );
};

export default Dashboard;
