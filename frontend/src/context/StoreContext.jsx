import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, {
                    headers: { token }
                });
            } catch (err) {
                console.error("Add to cart failed:", err.message);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) - 1,
        }));
        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, {
                    headers: { token }
                });
            } catch (err) {
                console.error("Remove from cart failed:", err.message);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find(
                    (product) => String(product._id) === String(item)
                );
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            if (response.data.success) {
                setFoodList(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching food list:", error.message);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, {
                headers: { token }
            });
            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            } else {
                setCartItems({});
            }
        } catch (err) {
            console.error("Failed to load cart:", err.message);
            setCartItems({});
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
