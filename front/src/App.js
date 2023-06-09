import {Header} from "./components/Header/Header";
import {Main} from "./pages/Main/Main";
import {Footer} from "./components/Footer/Footer";
import {Route, Routes, useLocation} from "react-router-dom";
import {Category} from "./pages/Category/Category";
import {ItemInfo} from "./components/ItemInfo/ItemInfo";
import {CartPage} from "./pages/Cart/CartPage";
import {FavouritesPage} from "./pages/Favourites/FavouritesPage";
import {SearchResultsPage} from "./pages/SearchResultsPage/SearchResultsPage";
import {UserPage} from "./pages/UserPage/UserPage";
// import {TestPage} from "./pages/TestPage";
import {useState} from "react";
import {useSelector} from "react-redux";
import {Modal} from "./components/Auth/Modal";
import {Login} from "./components/Auth/Login/Login";
import {Signup} from "./components/Auth/Signup/Signup";
import {Profile} from "./components/Profile/Profile";
import {Orders} from "./components/Orders/Orders";
import {Favourites} from "./components/Favourites/Favourites";

function App() {
    const showLogin = useSelector(state => state.modal.showLogin)
    const showSignup = useSelector(state => state.modal.showSignup)


    return (
        <div className="App">

            <Header/>
            <Routes>

                <Route path={"/"} element={<Main/>}/>
                <Route path={"/categories/:category"} element={<Category/>}/>

                <Route path={"searchResultsPage"} element={<SearchResultsPage/>}/>
                <Route path={"items/:id"} element={<ItemInfo/>}/>
                <Route path={"cart"} element={<CartPage/>}/>
                <Route path={"favourites"} element={<FavouritesPage/>}/>
                <Route path={"user/"} element={<UserPage/>}>
                    <Route path={"profile"} element={<Profile/>}/>
                    <Route path={"orders"} element={<Orders/>}/>
                    <Route path={"favourites"} element={<FavouritesPage/>}/>

                </Route>



                {/*<Route path={"*"} element={<NotFound/>}/>*/}

            </Routes>


            <Footer/>
            {showLogin && <Login/>}
            {showSignup && <Signup/>}

        </div>
    );
}

export default App;
