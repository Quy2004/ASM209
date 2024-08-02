import { Outlet } from "react-router-dom"
import Header from "../Header"
import Footers from "../Footer"


const WebsiteLayout = () => {
    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footers/>
            </footer>
        </>
    )
}
export default WebsiteLayout