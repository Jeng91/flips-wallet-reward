import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

const AdminReports = ({ reports }) => {
    const [selectedFilm, setSelectedFilm] = useState('all');

    const filteredReports = selectedFilm === 'all'
        ? reports
        : reports.filter(r => r.filmId === parseInt(selectedFilm));

    // Calculate totals
    const totals = reports.reduce((acc, report) => ({
        targetFunding: acc.targetFunding + report.targetFunding,
        raisedFund: acc.raisedFund + report.raisedFund,
        tokensSold: acc.tokensSold + report.tokensSold,
        redemptionCost: acc.redemptionCost + report.redemptionCost,
        activeHolders: acc.activeHolders + report.activeHolders
    }), { targetFunding: 0, raisedFund: 0, tokensSold: 0, redemptionCost: 0, activeHolders: 0 });

    const exportToCSV = () => {
        const headers = ['Film Name', 'Symbol', 'Target Funding', 'Raised Fund', 'Tokens Sold', 'Total Supply', 'Utilization Rate', 'Redemption Cost', 'Redemption Count', 'Active Holders', 'Status'];
        const rows = filteredReports.map(r => [
            r.filmName,
            r.tokenSymbol,
            r.targetFunding,
            r.raisedFund,
            r.tokensSold,
            r.totalSupply,
            r.utilizationRate,
            r.redemptionCost,
            r.redemptionCount,
            r.activeHolders,
            r.status
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `funding_report_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert('CSV report exported successfully!');
    };

    const exportToExcel = () => {
        // Simulated Excel export (in real implementation, use library like xlsx)
        alert('Excel export functionality would be implemented here using a library like SheetJS (xlsx)');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Reports & Export</h2>
                <div className="flex gap-2">
                    <Button onClick={exportToCSV} className="bg-green-600 hover:bg-green-700 text-white">
                        <i className="fas fa-file-csv mr-2"></i>
                        Export CSV
                    </Button>
                    <Button onClick={exportToExcel} className="bg-blue-600 hover:bg-blue-700 text-white">
                        <i className="fas fa-file-excel mr-2"></i>
                        Export Excel
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-4">
                <Card className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <i className="fas fa-bullseye text-blue-600"></i>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                        ${(totals.targetFunding / 1000000).toFixed(2)}M
                    </p>
                    <p className="text-sm text-gray-500">Target Funding</p>
                </Card>

                <Card className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <i className="fas fa-dollar-sign text-green-600"></i>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                        ${(totals.raisedFund / 1000000).toFixed(2)}M
                    </p>
                    <p className="text-sm text-gray-500">Total Raised</p>
                    <Badge variant="success" className="mt-1">
                        {((totals.raisedFund / totals.targetFunding) * 100).toFixed(1)}% of target
                    </Badge>
                </Card>

                <Card className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <i className="fas fa-coins text-purple-600"></i>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                        {totals.tokensSold.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">Tokens Sold</p>
                </Card>

                <Card className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <i className="fas fa-users text-orange-600"></i>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                        {totals.activeHolders.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">Active Holders</p>
                </Card>
            </div>

            {/* Film Filter */}
            <Card>
                <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700">Filter by Film:</label>
                    <select
                        value={selectedFilm}
                        onChange={(e) => setSelectedFilm(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        <option value="all">All Films</option>
                        {reports.map(report => (
                            <option key={report.filmId} value={report.filmId}>
                                {report.filmName} ({report.tokenSymbol})
                            </option>
                        ))}
                    </select>
                    {selectedFilm !== 'all' && (
                        <button
                            onClick={() => setSelectedFilm('all')}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Clear Filter
                        </button>
                    )}
                </div>
            </Card>

            {/* Detailed Reports Table */}
            <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Funding Report (Per Film)</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Film Name</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Target Funding</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Raised Fund</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Progress</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Tokens Sold</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Utilization Rate</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Redemption Cost</th>
                                <th className="text-center py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReports.map((report) => {
                                const fundingProgress = (report.raisedFund / report.targetFunding) * 100;
                                const profitMargin = ((report.raisedFund - report.redemptionCost) / report.raisedFund) * 100;

                                return (
                                    <tr key={report.filmId} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4 px-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{report.filmName}</p>
                                                <p className="text-sm text-gray-500">{report.tokenSymbol}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right text-gray-700">
                                            ${report.targetFunding.toLocaleString()}
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="font-semibold text-green-600">
                                                ${report.raisedFund.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${fundingProgress >= 100 ? 'bg-green-600' :
                                                                fundingProgress >= 75 ? 'bg-blue-600' :
                                                                    fundingProgress >= 50 ? 'bg-yellow-600' :
                                                                        'bg-orange-600'
                                                            }`}
                                                        style={{ width: `${Math.min(fundingProgress, 100)}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {fundingProgress.toFixed(1)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="text-gray-900">
                                                {report.tokensSold.toLocaleString()}
                                            </span>
                                            <span className="text-gray-500 text-sm">
                                                /{report.totalSupply.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <Badge variant={report.utilizationRate >= 80 ? 'success' : report.utilizationRate >= 50 ? 'info' : 'warning'}>
                                                {report.utilizationRate.toFixed(1)}%
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <div>
                                                <p className="font-medium text-red-600">
                                                    ${report.redemptionCost.toLocaleString()}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {report.redemptionCount} redemptions
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <Badge variant={
                                                report.status === 'Sold Out' ? 'success' :
                                                    report.status === 'Active' ? 'info' :
                                                        'warning'
                                            }>
                                                {report.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Token Utilization & ROI Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-chart-pie text-purple-600"></i>
                        Token Utilization Rate
                    </h3>
                    <div className="space-y-4">
                        {filteredReports.map(report => (
                            <div key={report.filmId}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-gray-700">{report.filmName}</span>
                                    <span className="text-sm font-semibold text-gray-900">
                                        {report.utilizationRate.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${report.utilizationRate >= 80 ? 'bg-green-500' :
                                                report.utilizationRate >= 60 ? 'bg-blue-500' :
                                                    report.utilizationRate >= 40 ? 'bg-yellow-500' :
                                                        'bg-orange-500'
                                            }`}
                                        style={{ width: `${report.utilizationRate}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-chart-line text-green-600"></i>
                        Redemption Cost vs Raised Fund
                    </h3>
                    <div className="space-y-4">
                        {filteredReports.map(report => {
                            const costPercentage = (report.redemptionCost / report.raisedFund) * 100;
                            const profit = report.raisedFund - report.redemptionCost;

                            return (
                                <div key={report.filmId} className="border-b border-gray-100 pb-3 last:border-0">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">{report.tokenSymbol}</span>
                                        <span className={`text-sm font-semibold ${profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            Net: ${profit.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                            <span className="text-gray-500">Raised:</span>
                                            <span className="ml-1 font-medium text-gray-900">
                                                ${report.raisedFund.toLocaleString()}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Cost:</span>
                                            <span className="ml-1 font-medium text-red-600">
                                                ${report.redemptionCost.toLocaleString()} ({costPercentage.toFixed(1)}%)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminReports;
