import React, { useState } from 'react';
import { AuthProvider } from '../context/AuthContext';
import LoginPage from '../pages/LoginAdmin';
import Sidebar from '../components/SideBar';
// import Dashboard from '../components/Dashboard/Dashboard';
import ClientList from '../components/admin-view/ClientList';
import EmployeeList from '../components/admin-view/EmployeeList';
import DishList from '../components/admin-view/DishList';
// import RestaurantProfile from '../components/RestauInfo';
import ReviewList from '../components/RviewList';
import SalesList from '../components/admin-view/SalesList';
import MessageList from '../components/admin-view/MessageList';
import ActivityLog from '../components/admin-view/Tracability';
import Navbar from '../components/NavBar';

const AppContent: React.FC = () => {
  const isAuthenticated  = localStorage.getItem('isAuthenticated') ? localStorage.getItem('isAuthenticated') : false;
  const [activeSection, setActiveSection] = useState('dashboard');
  console.log(localStorage.getItem('isAuthenticated') )
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderContent = () => {
    switch (activeSection) {
    //   case 'dashboard':
        // return <Dashboard />;
      case 'clients':
        return <ClientList />;
      case 'employees':
        return <EmployeeList />;
      case 'dishes':
        return <DishList />;
      case 'reviews':
        return <ReviewList />;
      case 'sales':
        return <SalesList />;
      case 'messages':
        return <MessageList />;
      case 'activity':
        return <ActivityLog />;
      // case 'restaurant':
      //   return <RestaurantProfile />;
      default:
        // return <Dashboard />;
        return 
        <>
            A maintenir
        </>
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F1E8' }}>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="ml-64 pt-16 flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function AdminInterf() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default AdminInterf;