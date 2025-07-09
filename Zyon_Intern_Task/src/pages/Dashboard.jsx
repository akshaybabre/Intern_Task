import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Menu, 
  Bell, 
  Search, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity 
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import RevenueChart from '../components/RevenueChart';
import UsersTable from '../components/UsersTable';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState('');
  const dashboardRef = useRef(null);

  useEffect(() => {
    const name = localStorage.getItem('Admin Name')
    setAdminName(name || 'Admin')
  },[]) 

  const getInitials = (name) => {
    if(!name) return '';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].slice(0,2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dashboard-card',
        { 
          y: 50, 
          opacity: 0,
          scale: 0.9
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 0.8, 
          ease: 'power2.out',
          stagger: 0.1
        }
      );

      gsap.fromTo(
        '.dashboard-header',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }, dashboardRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '12',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Revenue',
      value: '$45,210',
      change: '8',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Growth',
      value: '23.5%',
      change: '3',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Active Sessions',
      value: '1,234',
      change: '5',
      changeType: 'negative',
      icon: Activity,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div ref={dashboardRef} className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:ml-0">
        <header className="dashboard-header bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back! Here's what's happening.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">{getInitials(adminName)}</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{adminName}</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <DashboardCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="lg:col-span-1">
              <RevenueChart />
            </div>

            <div className="dashboard-card bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Activity chart coming soon</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <UsersTable />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="dashboard-card bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  Add New User
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  Generate Report
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  System Settings
                </button>
              </div>
            </div>

            <div className="dashboard-card bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">User John logged in</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">New user registered</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">System backup completed</span>
                </div>
              </div>
            </div>

            <div className="dashboard-card bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server Status</span>
                  <span className="text-sm text-green-600 font-medium">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="text-sm text-green-600 font-medium">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Status</span>
                  <span className="text-sm text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;