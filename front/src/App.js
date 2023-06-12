import {Header} from "./components/Header/Header";
import {Main} from "./pages/Main/Main";
import {Footer} from "./components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import {Category} from "./pages/Category/Category";
import {ItemInfo} from "./components/ItemInfo/ItemInfo";
import {CartPage} from "./pages/Cart/CartPage";
import {FavouritesPage} from "./pages/Favourites/FavouritesPage";
import {SearchResultsPage} from "./pages/SearchResultsPage/SearchResultsPage";
import {UserPage} from "./pages/UserPage/UserPage";
import {Login} from "./components/Login/Login";
import {Signup} from "./components/Signup/Signup";


function App() {
    return (
        <div className="App">

            <Header/>
            <Routes>

                <Route path={""} element={<Main/>}/>
                {/*<Route path={"cart"} element={<Cart/>}/>*/}
                <Route path={"categories/:category"} element={<Category/>}/>
                <Route path={"user/:page"} element={<UserPage/>}/>
                <Route path={"user/login"} element={<Login/>}/>
                <Route path={"user/signup"} element={<Signup/>}/>


                <Route path={"searchResultsPage"} element={<SearchResultsPage/>}/>
                <Route path={"items/:id"} element={<ItemInfo/>}/>
                <Route path={"cart"} element={<CartPage/>}/>
                <Route path={"favourites"} element={<FavouritesPage/>}/>


                {/*<Route path={"*"} element={<NotFound/>}/>*/}

            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
