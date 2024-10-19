import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './context/UserContext.jsx'
import { ProductContextProvider } from './context/productContext.jsx'
import { CartContextProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
<StrictMode>
    <UserContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
    <App />
    </CartContextProvider>
    </ProductContextProvider>
    </UserContextProvider>
  </StrictMode>,
)


