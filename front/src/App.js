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
import {Login} from "./components/Login/Login";
import {Signup} from "./components/Signup/Signup";
import {TestPage} from "./pages/TestPage";

function App() {
    const location = useLocation();
    const previousLocation = location.state?.previousLocation;


    return (
        <div className="App">

            <Header/>
            <Routes location={previousLocation || location}>

                <Route path={"/"} element={<Main/>}/>
                <Route path={"/categories/:category"} element={<Category/>}/>
                {/*<Route path={"user/:page"} element={<UserPage/>}/>*/}
                {/*<Route path={"user/auth"} element={<TestPage component={<Login/>} />}>*/}
                {/*</Route>*/}
                {/*<Route path={"user/signup"} element={<Signup/>}/>*/}


                <Route path={"searchResultsPage"} element={<SearchResultsPage/>}/>
                <Route path={"items/:id"} element={<ItemInfo/>}/>
                <Route path={"cart"} element={<CartPage/>}/>
                <Route path={"favourites"} element={<FavouritesPage/>}/>


                {/*<Route path={"*"} element={<NotFound/>}/>*/}

            </Routes>

            {/*<Routes location={previousLocation || location}>*/}

            {/*        <Route index element={<Main />} />*/}
            {/*        <Route path="/cart/" element={<CartPage />} />*/}
            {/*</Routes>*/}

            {previousLocation && (
                <Routes>
                    <Route path="/login/" element={<Login />} />

                </Routes>
            )}
            {previousLocation && (
                <Routes>
                    <Route path="/signup/" element={<Signup />} />
                </Routes>
            )}

            <Footer/>
        </div>
    );
}

export default App;
