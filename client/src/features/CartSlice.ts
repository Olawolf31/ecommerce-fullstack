import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cartItems: any[];
  total: number;
  productCount: number;
}

// Load cart state from localStorage
const cartData = () => {
  const cartState = localStorage.getItem("cartState");
  return cartState
    ? JSON.parse(cartState)
    : { cartItems: [], total: 0, productCount: 0 };
};

// Define initial state
const initialState: CartState = cartData();

// Set the idle duration (5 minutes in milliseconds)
/* const idleDuration = 5 * 60 * 1000;
let idleTimer: ReturnType<typeof setTimeout>; */

// Function to reset the idle timer
/* const resetIdleTimer = () => {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(clearLocalStorage, idleDuration);
}; */

// Function to clear the local storage
/* const clearLocalStorage = () => {
  localStorage.removeItem("cartState");
}; */

/* document.addEventListener("mousemove", resetIdleTimer);
document.addEventListener("keydown", resetIdleTimer); */

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { singleProduct, qty } = action.payload;

      // Check if item already exists in cart
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.singleProduct._id === singleProduct._id
      );

      // If item exists in cart, update qty else add item to cart
      if (existingItem) {
        existingItem.qty += qty;
      } else {
        state.cartItems.push({ singleProduct, qty });
        state.productCount += 1;
      }

      // Calculate total price
      const total = state.cartItems
        .reduce(
          (acc, cartItem) => acc + cartItem.qty * cartItem.singleProduct.price,
          0
        )
        .toFixed(2);

      // Update the cart state with the new total
      state.total = parseFloat(total);

      // Store cart state in localStorage
      localStorage.setItem("cartState", JSON.stringify(state));
    },

    removeCartItem: (state, action) => {
      const id = action.payload;

      // Remove item from cart
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.singleProduct._id !== id
      );

      // Update product count
      state.productCount -= 1;

      // Calculate total price
      const total = state.cartItems
        .reduce(
          (acc, cartItem) => acc + cartItem.qty * cartItem.singleProduct.price,
          0
        )
        .toFixed(2);

      // Update the cart state with the new total
      state.total = parseFloat(total);

      // Store cart state in localStorage
      localStorage.setItem("cartState", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
      state.productCount = 0;
      localStorage.removeItem("cartState");
    },

    updateCartItemQty: (
      state,
      action: PayloadAction<{ itemId: string; newQty: number }>
    ) => {
      const { itemId, newQty } = action.payload;

      // Find the cart item by ID
      const cartItem = state.cartItems.find(
        (item) => item.singleProduct._id === itemId
      );

      if (cartItem) {
        // Update the quantity of the cart item
        cartItem.qty = newQty;

        // Calculate the new total
        state.total = state.cartItems
          .reduce((acc, item) => acc + item.qty * item.singleProduct.price, 0)
          .toFixed(2);

        // Save the updated cart state to localStorage
        localStorage.setItem("cartState", JSON.stringify(state));
      }
    },
  },
});

export const { addToCart, removeCartItem, clearCart, updateCartItemQty } =
  cartSlice.actions;

export default cartSlice.reducer;
