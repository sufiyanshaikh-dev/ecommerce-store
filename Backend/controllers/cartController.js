import userModel from "../models/userModel.js";

// Add product to user cart
const addToCart = async (req, res) => {
    try {
        // authUser middleware should set req.user.id
        const userId = req.user.id;
        const { itemId, size } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) return res.json({ success: false, message: "User not found" });

        let cartData = userData.cartData || {};

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({
            success: true,
            message: "Added to Cart",
        });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

// Update user cart
const updateCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.json({ success: false, message: error.message });
    }
};

// Get user cart
const getUserCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = await userModel.findById(userId);
        const cartData = userData.cartData || {};

        res.json({ success: true, cartData });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };
