import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

const AdminRolesPermissions = ({ roles, adminUsers }) => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const viewRoleDetails = (role) => {
        setSelectedRole(role);
        setShowRoleModal(true);
    };

    const viewUserDetails = (user) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };

    const assignRole = (user) => {
        const availableRoles = roles.map(r => r.roleName);
        alert(`Role assignment interface for ${user.name}\n\nAvailable roles:\n${availableRoles.join('\n')}\n\n(This would open a role selection modal in full implementation)`);
    };

    const renderPermissionIcon = (hasPermission) => {
        return hasPermission ? (
            <i className="fas fa-check-circle text-green-600"></i>
        ) : (
            <i className="fas fa-times-circle text-gray-300"></i>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Admin Roles & Permissions</h2>
                <Badge variant="info">
                    <i className="fas fa-user-shield mr-2"></i>
                    {roles.length} Roles
                </Badge>
            </div>

            {/* Roles Overview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {roles.map((role) => (
                    <Card key={role.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => viewRoleDetails(role)}>
                        <div className={`w-12 h-12 ${role.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                            <i className="fas fa-user-shield text-white text-xl"></i>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 text-center mb-1">
                            {role.roleName}
                        </h3>
                        <p className="text-sm text-gray-500 text-center mb-3">
                            {role.description}
                        </p>
                        <div className="text-center">
                            <Badge variant="info">
                                {role.userCount} {role.userCount === 1 ? 'User' : 'Users'}
                            </Badge>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Permissions Matrix */}
            <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions Matrix</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 min-w-[200px]">
                                    Permission
                                </th>
                                {roles.map(role => (
                                    <th key={role.id} className="text-center py-3 px-4 font-semibold text-sm text-gray-700">
                                        {role.roleName}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Token Management Permissions */}
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <td colSpan={roles.length + 1} className="py-2 px-4 font-semibold text-sm text-gray-700">
                                    Token Management
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">View Tokens</td>
                                {roles.map(role => (
                                    <td key={role.id} className="py-3 px-4 text-center">
                                        {renderPermissionIcon(role.permissions.tokenManagement.view)}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">Create Tokens</td>
                                {roles.map(role => (
                                    <td key={role.id} className="py-3 px-4 text-center">
                                        {renderPermissionIcon(role.permissions.tokenManagement.create)}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">Edit Tokens</td>
                                {roles.map(role => (
                                    <td key={role.id} className="py-3 px-4 text-center">
                                        {renderPermissionIcon(role.permissions.tokenManagement.edit)}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">Pause/Resume Tokens</td>
                                {roles.map(role => (
                                    <td key={role.id} className="py-3 px-4 text-center">
                                        {renderPermissionIcon(role.permissions.tokenManagement.pause)}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">Burn Tokens</td>
                                {roles.map(role => (
                                    <td key={role.id} className="py-3 px-4 text-center">
                                        {renderPermissionIcon(role.permissions.tokenManagement.burn)}
                                    </td>
                                ))}
                            </tr>

                            {/* Wallet Monitoring Permissions */}
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <td colSpan={roles.length + 1} className="py-2 px-4 font-semibold text-sm text-gray-700">
                                    Wallet Monitoring
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">View Wallets</td>
                                {roles.map(role => (
                                    <td key={role.id} className="py-3 px-4 text-center">
                                        {renderPermissionIcon(role.permissions.walletMonitoring.view)}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">Export Data</td>
                                {roles.map(role => (
                                    <td key={role.id} className="py-3 px-4 text-center">
                                        {renderPermissionIcon(role.permissions.walletMonitoring.export)}
                                    </td>
                                ))}
                            </tr>

                            {/* Redemption Queue Permissions */}
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <td colSpan={roles.length + 1} className="py-2 px-4 font-semibold text-sm text-gray-700">
                                    Redemption Management
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">View Redemptions</td>
                                {roles.map(role => (
                                    <td key={role.id} className="py-3 px-4 text-center">
                                        {renderPermissionIcon(role.permissions.redemptionQueue.view)}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">Approve Redemptions</td>
                                {roles.map(role => (
                                    <td key={role.id} className="py-3 px-4 text-center">
                                        {renderPermissionIcon(role.permissions.redemptionQueue.approve)}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">Reject Redemptions</td>
                                {roles.map(role => (
                                    <td key={role.id} className="py-3 px-4 text-center">
                                        {renderPermissionIcon(role.permissions.redemptionQueue.reject)}
                                    </td>
                                ))}
                            </tr>

                            {/* Reports Permissions */}
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <td colSpan={roles.length + 1} className="py-2 px-4 font-semibold text-sm text-gray-700">
                                    Reports & Analytics
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">View Reports</td>
                                {roles.map(role => (
                                    <td key={role.id} className="py-3 px-4 text-center">
                                        {renderPermissionIcon(role.permissions.reports.view)}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">Export Reports</td>
                                {roles.map(role => (
                                    <td key={role.id} className="py-3 px-4 text-center">
                                        {renderPermissionIcon(role.permissions.reports.export)}
                                    </td>
                                ))}
                            </tr>

                            {/* User Management Permissions */}
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <td colSpan={roles.length + 1} className="py-2 px-4 font-semibold text-sm text-gray-700">
                                    User Management
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">View Users</td>
                                {roles.map(role => (
                                    <td key={role.id} className="py-3 px-4 text-center">
                                        {renderPermissionIcon(role.permissions.userManagement.view)}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">Assign Roles</td>
                                {roles.map(role => (
                                    <td key={role.id} className="py-3 px-4 text-center">
                                        {renderPermissionIcon(role.permissions.userManagement.assignRoles)}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Admin Users List */}
            <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Users</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Name</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Email</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Role</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Last Login</th>
                                <th className="text-center py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminUsers.map((user) => {
                                const roleColor = roles.find(r => r.roleName === user.role)?.color || 'bg-gray-500';

                                return (
                                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <span className="font-medium text-gray-900">{user.name}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-sm text-gray-600">{user.email}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${roleColor} text-white`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-sm text-gray-600">{user.lastLogin}</span>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                                                {user.status}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={() => viewUserDetails(user)}
                                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                    title="View Details"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                <button
                                                    onClick={() => assignRole(user)}
                                                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                                                    title="Assign Role"
                                                >
                                                    <i className="fas fa-user-tag"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Role Details Modal */}
            {showRoleModal && selectedRole && (
                <Modal
                    isOpen={showRoleModal}
                    onClose={() => setShowRoleModal(false)}
                    title={selectedRole.roleName}
                >
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Description</p>
                            <p className="text-gray-900">{selectedRole.description}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-2">Total Users</p>
                            <Badge variant="info">{selectedRole.userCount} users assigned</Badge>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-2">Permissions</p>
                            <div className="space-y-2 text-sm">
                                <p className="font-medium text-gray-900">Token Management:</p>
                                <ul className="ml-4 space-y-1">
                                    {Object.entries(selectedRole.permissions.tokenManagement).map(([key, value]) => (
                                        <li key={key} className="flex items-center gap-2">
                                            {renderPermissionIcon(value)}
                                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            {/* User Details Modal */}
            {showUserModal && selectedUser && (
                <Modal
                    isOpen={showUserModal}
                    onClose={() => setShowUserModal(false)}
                    title="Admin User Details"
                >
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium text-gray-900">{selectedUser.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium text-gray-900">{selectedUser.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Role</p>
                                <Badge variant="info">{selectedUser.role}</Badge>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <Badge variant={selectedUser.status === 'active' ? 'success' : 'secondary'}>
                                    {selectedUser.status}
                                </Badge>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-gray-500">Last Login</p>
                                <p className="font-medium text-gray-900">{selectedUser.lastLogin}</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminRolesPermissions;
