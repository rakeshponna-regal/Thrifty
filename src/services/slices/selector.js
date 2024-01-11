const { createSelector } = require("@reduxjs/toolkit");

const cartSelector = (state) => state.cart;
const favoriteSelector = (state) => state.favorite;

// Define a selector to get the list of cart items
export const selectCartItems = createSelector([cartSelector], (cart) => cart);

// Define a selector to check if an item with a specific cart_id already exists
export const selectCartItemExists = (id) =>
    createSelector([selectCartItems], (cart) =>
        cart.some((item) => item.id === id)
    );

// Define a selector to get the list of cart items
export const selectFavoriteItems = createSelector([favoriteSelector], (cart) => cart);

// Define a selector to check if an item with a specific cart_id already exists
export const selectFavoriteItemExists = (id) =>
    createSelector([selectFavoriteItems], (cart) =>
        cart.some((item) => item.id === id)
    );

export const cartTotalSelector = createSelector([cartSelector], (cart) =>
    cart.reduce((total, current) => (total += current.quantity), 0)
);

export const cartQtySelector = createSelector([cartSelector], (cart) =>
    cart.reduce((quantity, current) => (quantity += current.quantity), 0)
);

export const checkProductAddedTocartSelector = createSelector([cartSelector], (cart) =>
    cart.reduce((quantity, current) => (quantity += current.quantity), 0)
);

export const cartTotalPriceSelector = createSelector([cartSelector], (cart) =>
    cart.reduce(
        (total, current) => (total += current.price * current.quantity),
        0
    )
);