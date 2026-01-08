import React from 'react';
import { Card } from '../ui/Card';
import { users } from '../../data/adminExtendedData';

const AdminNewUsers = () => {
    // Get users from last 7 days
    const getNewUsers = (days = 7) => {
        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - days);

        return users.filter(user => {
            const regDate = new Date(user.registrationDate);
            return regDate > daysAgo;
        }).sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
    };

    const newUsers7Days = getNewUsers(7);
    const newUsers30Days = getNewUsers(30);
    const newUsers90Days = getNewUsers(90);

    const [selectedPeriod, setSelectedPeriod] = React.useState('7');

    const displayUsers = selectedPeriod === '7' ? newUsers7Days :
        selectedPeriod === '30' ? newUsers30Days : newUsers90Days;

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900">ผู้ใช้ใหม่</h2>
                <p className="text-gray-600 mt-1">ผู้ลงทะเบียนใหม่ในระบบ</p>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-4">
                <Card className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{newUsers7Days.length}</p>
                    <p className="text-sm text-gray-600">7 วันล่าสุด</p>
                </Card>
                <Card className="text-center">
                    <p className="text-2xl font-bold text-green-600">{newUsers30Days.length}</p>
                    <p className="text-sm text-gray-600">30 วันล่าสุด</p>
                </Card>
                <Card className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{newUsers90Days.length}</p>
                    <p className="text-sm text-gray-600">90 วันล่าสุด</p>
                </Card>
            </div>

            {/* Period Filter */}
            <Card>
                <div className="flex gap-4">
                    <button
                        onClick={() => setSelectedPeriod('7')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${selectedPeriod === '7' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        7 วัน
                    </button>
                    <button
                        onClick={() => setSelectedPeriod('30')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${selectedPeriod === '30' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        30 วัน
                    </button>
                    <button
                        onClick={() => setSelectedPeriod('90')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${selectedPeriod === '90' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        90 วัน
                    </button>
                </div>
            </Card >

            {/* New Users List */}
            < Card >
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                    ผู้ใช้ใหม่ {selectedPeriod} วันล่าสุด ({displayUsers.length} คน)
                </h3>
                <div className="space-y-3">
                    {displayUsers.length > 0 ? (
                        displayUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold text-lg">
                                            {user.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-sm text-gray-600">{user.email} • {user.phone}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">ลงทะเบียนเมื่อ</p>
                                    <p className="text-sm text-gray-600">{user.registrationDate}</p>
                                    <div className="mt-1">
                                        {user.hasTokens ? (
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                มี {user.totalTokens} tokens
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                                ยังไม่มี tokens
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            ไม่มีผู้ใช้ใหม่ในช่วงเวลาที่เลือก
                        </div>
                    )}
                </div>
            </Card >
        </div >
    );
};

export default AdminNewUsers;
