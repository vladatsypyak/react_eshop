import {Header} from "./components/Header/Header";
import {Main} from "./pages/Main/Main";
import {Footer} from "./components/Footer/Footer";
import {Outlet, Route, Routes, useLocation} from "react-router-dom";
import {Category} from "./pages/Category/Category";
import {ItemInfo} from "./components/ItemInfo/ItemInfo";
import {CartPage} from "./pages/Cart/CartPage";
import {FavouritesPage} from "./pages/Favourites/FavouritesPage";
import {SearchResultsPage} from "./pages/SearchResultsPage/SearchResultsPage";
import {UserPage} from "./pages/UserPage/UserPage";
// import {TestPage} from "./pages/TestPage";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "./components/Auth/Modal";
import {Login} from "./components/Auth/Login/Login";
import {Signup} from "./components/Auth/Signup/Signup";
import {Profile} from "./components/Profile/Profile";
import {Orders} from "./components/Orders/Orders";
import {Favourites} from "./components/Favourites/Favourites";
import {getUser, setUser} from "./redux/slices/userSlice";
import {OrderForm} from "./components/OrderForm/OrderForm";
import {OrderConfirm} from "./components/OrderConfirm/OrderConfirm";
import {Confirmed} from "./components/OrderConfirm/Confirmed";
import axios from "axios";
import {fetchCategories} from "./redux/slices/categoriesSlice";
// import {withAuthenticator} from "aws-amplify-react"
function App() {
    const dispatch = useDispatch()
    const showLogin = useSelector(state => state.modal.showLogin)
    const showSignup = useSelector(state => state.modal.showSignup)
    useEffect(() => {
        const token = sessionStorage.getItem("jwt_token")
        if (token) {
            dispatch(getUser(token))
        }
        dispatch(fetchCategories())


    }, [])

    const getUser1 = async () => {
        try {
            const url = `http://localhost:8080/auth/login/success`;
            const { data } = await axios.get(url, { withCredentials: true });
            console.log(data)
            sessionStorage.setItem("jwt_token", data.jwt_token)
            const token = sessionStorage.getItem("jwt_token")
            dispatch(getUser(token))

            // setUser(data.user._json);
            // dispatch(setUser(data.user))
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUser1();
    }, []);

    return (
        <div className="App">

            <Header/>
            {<Outlet/>}
            <main>
                <Routes>

                    <Route path={"/"} element={<Main/>}/>
                    {/*<Route path={"/"} element={<App/>}>*/}
                    {/*    <Route path={"login"} element={<Login/>}/>*/}
                    {/*</Route>*/}
                    {/*<Route breadcrumb={"test"} path={"/categories"} element={<Main/>}/>*/}

                    <Route path={"/categories/:category"} element={<Category/>}/>

                    <Route path={"searchResultsPage"} element={<SearchResultsPage/>}/>
                    <Route path={"items/:id"} element={<ItemInfo/>}/>
                    <Route path={"orderform/"} element={<OrderForm/>}>
                        <Route path={"confirm"} element={<OrderConfirm/>}/>
                        <Route path={"confirmed"} element={<Confirmed/>}/>
                    </Route>

                    <Route path={"cart"} element={<CartPage/>}/>
                    <Route path={"favourites"} element={<FavouritesPage/>}/>
                    <Route path={"user/"} element={<UserPage/>}>
                        <Route path={"profile"} element={<Profile/>}/>
                        <Route path={"orders"} element={<Orders/>}/>
                        <Route path={"favourites"} element={<FavouritesPage/>}/>
                    </Route>
                    {/*<Route path={"*"} element={<NotFound/>}/>*/}
                </Routes>

            </main>


            <Footer/>
            {showLogin && <Login/>}
            {showSignup && <Signup/>}

        </div>
    );
}

export default App;
