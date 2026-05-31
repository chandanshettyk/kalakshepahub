import "./Dashboard.css";


import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import FeatureCards from "./FeatureCards";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />
        <FeatureCards />
      </div>
    </div>
  );
}