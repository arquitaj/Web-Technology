import React, { useState } from 'react'
import '../assets/Dashboard.css'
import '../assets/Components.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import DocumentsToggle from '../components/DocumentsToggle'
// import AddDocumentNo from '../components/AddDocumentNo'
import AddNewEmp from '../components/AddNewEmp'
import DashboardBanner from '../components/DashboardBanner'

const Dashboard = () => {
const [activeView, setActiveView] = useState<"docs" | "addUser" | null>(null);

  return (
    <div>
        <Navbar />
        <div className='m-1 side-Menu'>
          <Sidebar
            onDocsClick={() => setActiveView("docs")}
            onAddUserClick={() => setActiveView("addUser")}
          />
          <div className="dashboard-content">
            {activeView === "docs" && <DocumentsToggle />}
            {activeView === "addUser" && <AddNewEmp />}
            <div>
                {activeView === null && <DashboardBanner />}

            </div>
            
          </div>
            {/* <AddDocumentNo /> */}
        </div>
    </div>
  )
}

export default Dashboard