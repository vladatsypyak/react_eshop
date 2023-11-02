import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {NavLink} from "react-router-dom";
import {logout} from "../../redux/slices/userSlice";
import {useSelector} from "react-redux";
import s from "./breadCrumbs.module.scss"


const DynamicBreadcrumb = ({match}) => {
    const items = useSelector(state => state.items.items)

    let item = items.find(el => el._id === match.params.id)
    return <span>{item?.title}</span>
};
const DynamicCategoryBreadcrumb = ({match}) => {
    const category = useSelector(state => state.categories.currentCategory.value)
    return <span>{category}</span>
};

const routes = [
    {path: "/items/:id", breadcrumb: DynamicBreadcrumb,},
    {path: "/categories", breadcrumb: null,},
    {path: "/categories/:category", breadcrumb: DynamicCategoryBreadcrumb,},
    {path: "/items", breadcrumb: DynamicCategoryBreadcrumb,},
    {path: "/", breadcrumb: "Головна",},


];


export const BreadCrumbs = () => {
    const category = useSelector(state => state.categories.currentCategory.type)

    const breadcrumbs = useBreadcrumbs(routes);

    return (
        <nav aria-label="breadcrumb" className={s.breadcrumbs}>
            <ol className={"breadcrumb"}>
                {breadcrumbs.map(({match, breadcrumb}) => (
                  <li className={"breadcrumb-item"} >
                      <NavLink
                          className={({ isActive }) => (isActive ? s.active : "")}
                               key={match.pathname} to={match.pathname === "/items" ? `/categories/${category}` : match.pathname}>
                          {breadcrumb}
                      </NavLink>
                  </li>
                ))}
            </ol>


        </nav>
    );
}