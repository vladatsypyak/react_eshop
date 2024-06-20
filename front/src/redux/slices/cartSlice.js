import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

const fetchCartItems = async () => {
    const instance = axios.create({
        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("jwt_token")}
    });
    const {data} = await instance.get(`https://react-eshop-9tge.onrender.com/api/carts/current/items/`);
    console.log(data)
    return data.items;
};

const fetchUserOrders = async () => {
    const instance = axios.create({
        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("jwt_token")}
    });
    const {data} = await instance.get(`https://react-eshop-9tge.onrender.com/api/orders/`);
    return data;
};

export const putToCart = createAsyncThunk('items/putToCart', async (params) => {
    const instance = axios.create({
        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("jwt_token")}
    });
    await instance.post(`https://react-eshop-9tge.onrender.com/api/carts/current/items/${params.itemId}`, {quantity: params.quantity})
    return await fetchCartItems()
})
export const createOrder = createAsyncThunk('items/createOrder', async (params) => {
    const instance = axios.create({
        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("jwt_token")}
    });
    await instance.post(`https://react-eshop-9tge.onrender.com/api/orders/`, params)
    await instance.delete(`https://react-eshop-9tge.onrender.com/api/carts/current/`)

})

export const getUserOrders = createAsyncThunk('orders/getUserOrders', async () => {
    return await fetchUserOrders()
})
export const removeOneFromCart = createAsyncThunk('items/removeOneFromCart', async (params) => {
    const instance = axios.create({
        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("jwt_token")}
    });
    await instance.patch(`https://react-eshop-9tge.onrender.com/api/carts/current/items/${params.itemId}`)
    return await fetchCartItems()
})

export const getAllCartItems = createAsyncThunk('items/getAllCartItems', async (params) => {
    return await fetchCartItems()
})

export const deleteCartItem = createAsyncThunk('items/deleteCartItem', async (params) => {
    const instance = axios.create({
        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("jwt_token")}
    });
    console.log(params)
    await instance.delete(`https://react-eshop-9tge.onrender.com/api/carts/current/items/${params.itemId}`)
    return await fetchCartItems()

})

const initialState = {
    items: null,
    total: 0,
    orderData: {},
    orders: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },
        setTotal: (state, action) => {
            state.total = state.items?.reduce((acc, el) => {
                return acc + (el.item.price * el.quantity)
            }, 0)
        },
        setOrderData: (state, action)=>{
            console.log(action.payload)
            state.orderData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(putToCart.fulfilled, (state, action) => {
            state.items = action.payload
        });
        builder.addCase(getAllCartItems.fulfilled, (state, action) => {
            console.log(action.payload)
            state.items = action.payload
        });
        builder.addCase(removeOneFromCart.fulfilled, (state, action) => {
            state.items = action.payload
        });
        builder.addCase(deleteCartItem.fulfilled, (state, action) => {
            state.items = action.payload
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.items = []
        });
        builder.addCase(getUserOrders.fulfilled, (state, action) => {
            state.orders = action.payload
        });

    },

})

export const {setItems, setTotal, setOrderData} = cartSlice.actions

export default cartSlice.reducer