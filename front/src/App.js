import {Header} from "./components/Header/Header";
import {Main} from "./pages/Main/Main";
import {Footer} from "./components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import {Category} from "./pages/Category/Category";
import {ItemInfo} from "./components/ItemInfo/ItemInfo";


function App() {
    return (
        <div className="App">

            <Header/>
            <Routes>

                <Route path={""} element={<Main/>}/>
                {/*<Route path={"cart"} element={<Cart/>}/>*/}
                <Route path={"categories/:category"} element={<Category/>}/>
                <Route path={"items/:id"} element={<ItemInfo/>}/>

                {/*<Route path={"*"} element={<NotFound/>}/>*/}

            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
