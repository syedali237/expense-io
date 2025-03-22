import Feature from "../components/LandingPage/Feature"
import Product from "../components/LandingPage/Product"
import Footer from "../components/Layout/Footer"
import Navbar from "../components/Layout/Navbar"

function LandingPage() {
    return (
        <div>
            <Navbar />
            <Product />
            <Feature />
            <Footer />
        </div>
    )
}

export default LandingPage