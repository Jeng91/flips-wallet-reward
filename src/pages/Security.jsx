import React from 'react';
import { Shield, Key, Smartphone, Monitor, LogOut, AlertTriangle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { loginActivity } from '../data/mockData';

const Security = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Shield className="w-7 h-7 text-primary" />
                Security Settings
            </h1>

            {/* Two-Factor Authentication */}
            <Card className="mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <Smartphone className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Two-Factor Authentication</h3>
                            <p className="text-sm text-gray-500">Add extra security to your account</p>
                        </div>
                    </div>
                    <Button variant="outline">Enable</Button>
                </div>
            </Card>

            {/* Change Password */}
            <Card className="mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Key className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Password</h3>
                            <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                        </div>
                    </div>
                    <Button variant="outline">Change</Button>
                </div>
            </Card>

            {/* Active Sessions */}
            <Card>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Active Sessions
                </h3>
                <div className="space-y-4">
                    {loginActivity.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                                    <Monitor className="w-5 h-5 text-gray-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {session.device}
                                        {session.current && (
                                            <span className="ml-2 text-xs text-green-600 font-semibold">• Current</span>
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-500">{session.location} • {session.lastLogin}</p>
                                </div>
                            </div>
                            {!session.current && (
                                <button className="text-red-500 hover:text-red-700 transition-colors">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Danger Zone */}
            <Card className="mt-6 border-red-200 bg-red-50">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-red-900">Delete Account</h3>
                        <p className="text-sm text-red-700">Permanently delete your account and all data</p>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">Delete</Button>
                </div>
            </Card>
        </div>
    );
};

export default Security;
