import Navbar from '../components/Layout/Navbar'
import Footer from '../components/Layout/Footer'
import ExpenseManagement from '../components/Dashboard/ExpenseManagement'

function DashboardPage() {

  return (
    <div>
        <Navbar />
        <ExpenseManagement  />
        <Footer />
    </div>
  )
}

export default DashboardPage
