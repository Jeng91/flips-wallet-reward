import React from 'react';
import { Card } from '../components/ui/Card';

const Admin = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <i className="fas fa-user-shield text-primary"></i>
                Admin Dashboard
            </h1>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <i className="fas fa-users text-blue-600"></i>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">1,234</p>
                    <p className="text-sm text-gray-500">Total Users</p>
                </Card>

                <Card className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <i className="fas fa-coins text-green-600"></i>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">50M</p>
                    <p className="text-sm text-gray-500">Total Flips Issued</p>
                </Card>

                <Card className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <i className="fas fa-ticket text-purple-600"></i>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">5,678</p>
                    <p className="text-sm text-gray-500">Redemptions</p>
                </Card>
            </div>

            <Card>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <div>
                                    <p className="font-medium text-gray-900">User #{1000 + i} redeemed a privilege</p>
                                    <p className="text-sm text-gray-500">{i} hour(s) ago</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                Completed
                            </span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Admin;
