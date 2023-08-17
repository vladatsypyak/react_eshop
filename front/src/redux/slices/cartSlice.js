import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

const fetchCartItems = async (userId) => {
    const {data} = await axios.get(`http://localhost:8080/api/app/cart/${userId}`);
    return data;
};

const fetchUserOrders = async (userId) => {
    const {data} = await axios.get(`http://localhost:8080/api/app/orders/${userId}`);
    return data;
};

export const putToCart = createAsyncThunk('items/putToCart', async (params) => {
    await axios.post(`http://localhost:8080/api/app/cart`, params)
    return await fetchCartItems(params.userId)
})
export const createOrder = createAsyncThunk('items/createOrder', async (params) => {

    await axios.post(`http://localhost:8080/api/app/orders/add`, params)
    await axios.delete(`http://localhost:8080/api/app/cart/clear/${params.userId}`)

})

export const getUserOrders = createAsyncThunk('orders/getUserOrders', async (params) => {
    console.log(params)
    return await fetchUserOrders(params.userId)
})
export const removeOneFromCart = createAsyncThunk('items/removeOneFromCart', async (params) => {
    await axios.post(`http://localhost:8080/api/app/cart/remove`, params)
    return await fetchCartItems(params.userId)
})

export const getAllCartItems = createAsyncThunk('items/getAllCartItems', async (params) => {
    return await fetchCartItems(params.userId)
})

export const deleteCartItem = createAsyncThunk('items/deleteCartItem', async (params) => {
    await axios.delete(`http://localhost:8080/api/app/cart`, {data: params})
    return await fetchCartItems(params.userId)

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