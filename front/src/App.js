import {Header} from "./components/Header/Header";
import {Main} from "./pages/Main/Main";
import {Footer} from "./components/Footer/Footer";
import { Route, Routes} from "react-router-dom";
import {Category} from "./pages/Category/Category";
import {ItemInfo} from "./components/ItemInfo/ItemInfo";
import {CartPage} from "./pages/Cart/CartPage";
import {FavouritesPage} from "./pages/Favourites/FavouritesPage";
import {SearchResultsPage} from "./pages/SearchResultsPage/SearchResultsPage";
import {UserPage} from "./pages/UserPage/UserPage";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Profile} from "./components/Profile/Profile";
import {Orders} from "./components/Orders/Orders";
import {getUser} from "./redux/slices/userSlice";
import {OrderForm} from "./components/OrderForm/OrderForm";
import {OrderConfirm} from "./components/OrderConfirm/OrderConfirm";
import {Confirmed} from "./components/OrderConfirm/Confirmed";
import axios from "axios";
import {fetchCategories} from "./redux/slices/categoriesSlice";
import {Signup} from "./components/Auth/Signup/Signup";
import {Login} from "./components/Auth/Login/Login";
import {apiUrl} from "./config";

console.log(apiUrl)
console.log(process.env.REACT_APP_API_URL)
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
            const url = `${apiUrl}/auth/login/success`;
            const { data } = await axios.get(url, { withCredentials: true });
            console.log(data)
            sessionStorage.setItem("jwt_token", data.jwt_token)
            const token = sessionStorage.getItem("jwt_token")
            dispatch(getUser(token))
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
                <main>
                    <Routes>
                        <Route path={"/"} element={<Main/>}/>
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
                    </Routes>
                </main>
                <Footer/>
                {showLogin && <Login/>}
                {showSignup && <Signup/>}
        </div>
    );
}

export default App;
