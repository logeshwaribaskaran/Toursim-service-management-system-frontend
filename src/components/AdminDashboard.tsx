
import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Settings,
  FileText,
  Activity,
  MessageSquare
} from "lucide-react";
import DestinationManager from "./admin/DestinationManager";
import BookingManager from "./admin/BookingManager";
import Reports from "./admin/Reports";
import Feedbacks from "./admin/Feedbacks";
import Dashboard from "./admin/Dashboard";
import Queries from "./admin/Queries";

const AdminDashboard = () => {
  const [view, setView] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "destinations", label: "Manage Destinations", icon: Settings },
    { id: "bookings", label: "Manage Bookings", icon: FileText },
    { id: "reports", label: "View Reports", icon: Activity },
    { id: "feedbacks", label: "Feedbacks", icon: Users },
    { id: "queries", label: "Customer Queries", icon: MessageSquare }
  ];

  return (
    <div className="flex min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      {/* Sidebar */}
      <aside className="z-10 w-64 bg-admin-dark p-6 rounded-r-xl border-r-2 border-admin-primary shadow-lg">
        <h1 className="text-admin-primary text-2xl font-bold mb-8 text-center">
          Admin Panel
        </h1>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 
                ${view === item.id 
                  ? "bg-admin-primary text-black" 
                  : "bg-transparent text-white border border-admin-primary/50 hover:bg-admin-primary/10"}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      
      {/* Content Area */}
      <main className="z-10 flex-1 p-6 overflow-y-auto">
        <div className="bg-admin-dark rounded-xl p-6 border-l-4 border-admin-primary shadow-xl">
          {view === "dashboard" && <Dashboard />}
          {view === "destinations" && <DestinationManager />}
          {view === "bookings" && <BookingManager />}
          {view === "reports" && <Reports />}
          {view === "feedbacks" && <Feedbacks />}
          {view === "queries" && <Queries />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
