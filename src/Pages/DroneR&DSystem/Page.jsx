import React, { useState } from 'react';
import {
  HomeIcon,
  CubeIcon,
  TruckIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  CogIcon,
  BellIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const SupplyChainDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { 
      label: 'Total Inventory Value', 
      value: '$2.4M', 
      icon: CubeIcon, 
      change: '+12%', 
      trend: 'up',
      color: 'text-blue-600' 
    },
    { 
      label: 'Active Orders', 
      value: '156', 
      icon: ClipboardDocumentListIcon, 
      change: '+8%', 
      trend: 'up',
      color: 'text-green-600' 
    },
    { 
      label: 'Suppliers', 
      value: '42', 
      icon: BuildingOfficeIcon, 
      change: '+3', 
      trend: 'up',
      color: 'text-purple-600' 
    },
    { 
      label: 'In Transit', 
      value: '23', 
      icon: TruckIcon, 
      change: '-2%', 
      trend: 'down',
      color: 'text-orange-600' 
    }
  ];

  const inventoryItems = [
    { id: 1, name: 'Raw Materials - Steel', quantity: 1250, unit: 'kg', reorderLevel: 500, status: 'In Stock', value: '$125,000' },
    { id: 2, name: 'Electronic Components', quantity: 45, unit: 'units', reorderLevel: 100, status: 'Low Stock', value: '$89,500' },
    { id: 3, name: 'Packaging Materials', quantity: 2850, unit: 'pieces', reorderLevel: 1000, status: 'In Stock', value: '$23,400' },
    { id: 4, name: 'Finished Products - A', quantity: 180, unit: 'units', reorderLevel: 200, status: 'Critical', value: '$456,000' }
  ];

  const orders = [
    { id: 'ORD-001', supplier: 'Acme Corp', items: 'Steel Rods', quantity: 500, status: 'Processing', date: '2025-06-08', value: '$45,000' },
    { id: 'ORD-002', supplier: 'TechSupply Inc', items: 'Sensors', quantity: 200, status: 'Shipped', date: '2025-06-10', value: '$28,500' },
    { id: 'ORD-003', supplier: 'PackPro Ltd', items: 'Boxes', quantity: 1000, status: 'Delivered', date: '2025-06-11', value: '$12,300' },
    { id: 'ORD-004', supplier: 'MetalWorks', items: 'Aluminum Sheets', quantity: 300, status: 'Pending', date: '2025-06-12', value: '$67,800' }
  ];

  const suppliers = [
    { 
      id: 1, 
      name: 'Acme Corporation', 
      contact: 'John Smith', 
      phone: '+1-555-0123', 
      email: 'john@acme.com',
      rating: 4.8, 
      orders: 24, 
      location: 'New York, NY',
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'TechSupply Inc', 
      contact: 'Sarah Johnson', 
      phone: '+1-555-0456', 
      email: 'sarah@techsupply.com',
      rating: 4.6, 
      orders: 18, 
      location: 'San Francisco, CA',
      status: 'Active'
    },
    { 
      id: 3, 
      name: 'PackPro Limited', 
      contact: 'Mike Wilson', 
      phone: '+1-555-0789', 
      email: 'mike@packpro.com',
      rating: 4.9, 
      orders: 31, 
      location: 'Chicago, IL',
      status: 'Active'
    }
  ];

  const shipments = [
    { id: 'SHP-001', order: 'ORD-002', destination: 'Warehouse A', status: 'In Transit', eta: '2025-06-13', carrier: 'FedEx' },
    { id: 'SHP-002', order: 'ORD-001', destination: 'Production Floor', status: 'Delivered', eta: '2025-06-11', carrier: 'UPS' },
    { id: 'SHP-003', order: 'ORD-004', destination: 'Warehouse B', status: 'Pending', eta: '2025-06-15', carrier: 'DHL' }
  ];

  const sidebarItems = [
    { id: 'overview', name: 'Overview', icon: HomeIcon },
    { id: 'inventory', name: 'Inventory', icon: CubeIcon },
    { id: 'orders', name: 'Orders', icon: ClipboardDocumentListIcon },
    { id: 'suppliers', name: 'Suppliers', icon: BuildingOfficeIcon },
    { id: 'logistics', name: 'Logistics', icon: TruckIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon }
  ];

  const getStockStatus = (item) => {
    if (item.quantity <= item.reorderLevel * 0.5) return { color: 'bg-red-100 text-red-800', label: 'Critical' };
    if (item.quantity <= item.reorderLevel) return { color: 'bg-yellow-100 text-yellow-800', label: 'Low Stock' };
    return { color: 'bg-green-100 text-green-800', label: 'In Stock' };
  };

  const getOrderStatus = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getShipmentStatus = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">SupplyChain</h1>
          <p className="text-sm text-gray-600 mt-1">Management Hub</p>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
      

        {/* Dashboard Content */}
        <main className="p-8 overflow-y-auto h-full">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  const TrendIcon = stat.trend === 'up' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                          <div className="flex items-center mt-1">
                            <TrendIcon className={`w-4 h-4 mr-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                            <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</p>
                          </div>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                          <Icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Inventory Alerts */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Inventory Alerts</h3>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {inventoryItems.map((item) => {
                      const stockStatus = getStockStatus(item);
                      return (
                        <div key={item.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${
                              stockStatus.label === 'Critical' ? 'bg-red-500' :
                              stockStatus.label === 'Low Stock' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></div>
                            <div>
                              <h4 className="font-medium text-gray-800">{item.name}</h4>
                              <p className="text-sm text-gray-600">{item.quantity} {item.unit} available</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                              {stockStatus.label}
                            </span>
                            <p className="text-sm text-gray-600 mt-1">{item.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <button className="w-full flex items-center justify-between p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                      <div className="flex items-center">
                        <PlusIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 mr-3" />
                        <span className="text-gray-600 group-hover:text-blue-600 font-medium">New Order</span>
                      </div>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
                      <div className="flex items-center">
                        <CubeIcon className="w-5 h-5 text-gray-400 group-hover:text-green-500 mr-3" />
                        <span className="text-gray-600 group-hover:text-green-600 font-medium">Add Inventory</span>
                      </div>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
                      <div className="flex items-center">
                        <BuildingOfficeIcon className="w-5 h-5 text-gray-400 group-hover:text-purple-500 mr-3" />
                        <span className="text-gray-600 group-hover:text-purple-600 font-medium">Add Supplier</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Orders and Shipments */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                          <h4 className="font-medium text-gray-800">{order.id}</h4>
                          <p className="text-sm text-gray-600">{order.supplier}</p>
                          <p className="text-sm text-gray-500">{order.items}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatus(order.status)}`}>
                            {order.status}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">{order.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Shipments */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Active Shipments</h3>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Track All</button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {shipments.map((shipment) => (
                      <div key={shipment.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <TruckIcon className="w-5 h-5 text-gray-400" />
                          <div>
                            <h4 className="font-medium text-gray-800">{shipment.id}</h4>
                            <p className="text-sm text-gray-600">{shipment.destination}</p>
                            <p className="text-sm text-gray-500">via {shipment.carrier}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getShipmentStatus(shipment.status)}`}>
                            {shipment.status}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">ETA: {shipment.eta}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Tab Content */}
          {activeTab === 'inventory' && (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">Inventory Management</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Add Item
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Item</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Quantity</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Value</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryItems.map((item) => {
                        const stockStatus = getStockStatus(item);
                        return (
                          <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{item.name}</td>
                            <td className="py-3 px-4">{item.quantity} {item.unit}</td>
                            <td className="py-3 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                                {stockStatus.label}
                              </span>
                            </td>
                            <td className="py-3 px-4">{item.value}</td>
                            <td className="py-3 px-4">
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <EllipsisVerticalIcon className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'suppliers' && (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">Supplier Management</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Add Supplier
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suppliers.map((supplier) => (
                    <div key={supplier.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-800">{supplier.name}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {supplier.status}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-2" />
                          {supplier.location}
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="w-4 h-4 mr-2" />
                          {supplier.phone}
                        </div>
                        <div className="flex items-center">
                          <EnvelopeIcon className="w-4 h-4 mr-2" />
                          {supplier.email}
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Rating: {supplier.rating}/5</span>
                          <span className="text-sm text-gray-600">{supplier.orders} orders</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && activeTab !== 'inventory' && activeTab !== 'suppliers' && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 capitalize">{activeTab} Section</h3>
              <p className="text-gray-600">This section is ready for your custom content implementation.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SupplyChainDashboard;