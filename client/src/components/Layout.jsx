import { Fragment } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"

export default function Layout() {
    return (
        <Fragment>
            <NavBar />
            <Outlet />
        </Fragment>

    )
}