const { createContext, useState, useContext } = require("react");

const Context =  createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const [totalQuantities, setTotalQuantities] = useState()
    const [qty, setQty] = useState(1)

    function onAdd(product, quantity){
        
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
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            increaseQuantity,
            decreaseQuantity
        }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)