import { toast } from "react-hot-toast";

const { createContext, useState, useContext } = require("react");

const Context =  createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

                

    function onAdd(product, quantity){
        const checkProductInCart = cartItems.find((item) => item._id == product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

        if(checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
              if(cartProduct._id === product._id) return {
                ...cartProduct,
                quantity: cartProduct.quantity + quantity
              }
            })
      
            setCartItems(updatedCartItems);
          } else {
            product.quantity = quantity;
            
            setCartItems([...cartItems, { ...product }]);
          }
        toast.success(`${qty} ${product.name} added to cart`)
    }

    const toogleCartItemQuantity = (id, value) => {

    }

    function increaseQuantity(){
        setQty((prevQty) => prevQty + 1 )
    }
    function decreaseQuantity(){
        setQty((prevQty) => {

            if(prevQty - 1 < 1) return 1

            return prevQty -1
        } )
    }

    return(
        <Context.Provider
        value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            increaseQuantity,
            decreaseQuantity,
            onAdd
        }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)