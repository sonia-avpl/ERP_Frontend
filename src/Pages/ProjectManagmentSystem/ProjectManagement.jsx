import React, { useState } from 'react';
import {
  HomeIcon,
  FolderIcon,
  UsersIcon,
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  BellIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const ProjectManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const projects = [
    { id: 1, name: 'E-commerce Platform', progress: 75, status: 'In Progress', dueDate: '2025-06-25', team: 5 },
    { id: 2, name: 'Mobile App Redesign', progress: 45, status: 'In Progress', dueDate: '2025-07-15', team: 3 },
    { id: 3, name: 'Website Migration', progress: 90, status: 'Review', dueDate: '2025-06-20', team: 4 },
    { id: 4, name: 'API Integration', progress: 30, status: 'Planning', dueDate: '2025-08-01', team: 2 }
  ];

  const tasks = [
    { id: 1, title: 'Update user authentication', priority: 'High', assignee: 'John Doe', status: 'In Progress' },
    { id: 2, title: 'Design payment gateway', priority: 'Medium', assignee: 'Jane Smith', status: 'To Do' },
    { id: 3, title: 'Test mobile responsiveness', priority: 'Low', assignee: 'Mike Johnson', status: 'Done' },
    { id: 4, title: 'Deploy to staging', priority: 'High', assignee: 'Sarah Wilson', status: 'In Progress' }
  ];

  const stats = [
    { label: 'Total Projects', value: '24', icon: FolderIcon, change: '+12%', color: 'text-blue-600' },
    { label: 'Active Tasks', value: '156', icon: CheckCircleIcon, change: '+8%', color: 'text-green-600' },
    { label: 'Team Members', value: '18', icon: UserGroupIcon, change: '+2', color: 'text-purple-600' },
    { label: 'Completed', value: '89%', icon: ArrowTrendingUpIcon, change: '+5%', color: 'text-orange-600' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'To Do': return 'bg-gray-100 text-gray-800';
      case 'Review': return 'bg-purple-100 text-purple-800';
      case 'Planning': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    
     
        <main className="p-4">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                          <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                          <Icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

             
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Projects */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Recent Projects</h3>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{project.name}</h4>
                          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <UsersIcon className="w-4 h-4 mr-1" />
                              {project.team} members
                            </span>
                            <span className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              Due {project.dueDate}
                            </span>
                          </div>
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="text-gray-800 font-medium">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Tasks */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Recent Tasks</h3>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <PlusIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            task.status === 'Done' ? 'bg-green-500' : 
                            task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-300'
                          }`}></div>
                          <div>
                            <h4 className="font-medium text-gray-800">{task.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">Assigned to {task.assignee}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <EllipsisVerticalIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6 ">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                    <div className="text-center">
                      <PlusIcon className="w-8 h-8 mx-auto text-gray-400 group-hover:text-blue-500 mb-2" />
                      <span className="text-gray-600 group-hover:text-blue-600 font-medium">New Project</span>
                    </div>
                  </button>
                  <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
                    <div className="text-center">
                      <DocumentTextIcon className="w-8 h-8 mx-auto text-gray-400 group-hover:text-green-500 mb-2" />
                      <span className="text-gray-600 group-hover:text-green-600 font-medium">Create Task</span>
                    </div>
                  </button>
                  <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
                    <div className="text-center">
                      <UsersIcon className="w-8 h-8 mx-auto text-gray-400 group-hover:text-purple-500 mb-2" />
                      <span className="text-gray-600 group-hover:text-purple-600 font-medium">Invite Team</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

       
        </main>
     
   
  );
};

export default ProjectManagement;