import {NavLink} from "react-router-dom";
import s from "./sidebar.module.scss"

export const Sidebar = () => {


    return <div className={s.navbar}>

           <NavLink
               to={"profile"}
               className= {({isActive}) => isActive ? `${s.link} ${s.active}` : s.link}

           >
               Профіль
           </NavLink>
           <NavLink
               to={"favourites"}
               className= {({isActive}) => isActive ? `${s.link} ${s.active}` : s.link}

           >Збережені </NavLink>
           <NavLink
               to={"orders"}
               className= {({isActive}) => isActive ? `${s.link} ${s.active}` : s.link}

           >Замовлення</NavLink>

    </div>

}