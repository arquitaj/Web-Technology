import React, { useState } from "react";
import "../assets/styles/Dashboard.css";
import "../assets/styles/Components.css";

import Navbar from "../shared/components/layout/Navbar";
import Sidebar from "../shared/components/layout/Sidebar";

import EmployeeDocumentsToggle from "../features/components/documents/EmployeeDocumentsToggle";
import DashboardBanner from "../features/components/dashboard/DashboardBanner";

const EmployeeDashboard = () => {

  const [activeView, setActiveView] = useState<"docs" | null>(null);

  return (
    <div>

      
      <Navbar />

      <div className="m-1 side-Menu">

        <Sidebar
          onDocsClick={() => setActiveView("docs")}
          showAddUser={false}
        />

        <div className="dashboard-content">

          {activeView === "docs" && <EmployeeDocumentsToggle />}

          {activeView === null && <DashboardBanner />}

        </div>

      </div>

    </div>
  );
};

export default EmployeeDashboard;