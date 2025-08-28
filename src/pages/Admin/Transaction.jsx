import React, { useEffect, useState } from "react";
import getAllUsers from "../../hooks/admin/getAllUsers";
import { useCall } from "../../Provider/Provider";

const AdminTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const { user } = useCall();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [resetFilters, setResetFilters] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterType(e.target.value);
  };

  const filteredTransactions = transactions?.filter((txn) => {
    const txnDate = new Date(txn?.createdAt); // <-- ISO string works here

    const matchesSearch =
        txn?._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn?.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn?.amount.toString().includes(searchTerm) ||
        txn?.createdAt.toString().includes(searchTerm) ||
        txn?.paymentMethod.toString().includes(searchTerm) ||
        txn?.author?.name?.toString()?.includes(searchTerm) ||
        txn?.author?.address?.toString()?.includes(searchTerm) ||
        txn?.author?.email?.toString()?.includes(searchTerm);

    const matchesType = filterType === "All" ? true : txn.status === filterType;

    // Date filter (include full day for toDate)
    const matchesDate =
      (!fromDate || txnDate >= new Date(fromDate)) &&
      (!toDate || txnDate <= new Date(toDate + "T23:59:59Z"));

    return matchesSearch && matchesType && matchesDate;
  });
  useEffect(() => {
    if (user) {
      const fetch = async () => {
        const { data: userData } = await getAllUsers(user.id, user.email);
        if (userData.success) {
          const allTransactions = userData.users
            .flatMap((u) => u.transactionHistory || [])
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setTransactions(allTransactions);
        }
      };
      fetch();
    }
  }, [user]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Admin - All Transactions
      </h1>

      {/* Search & Filter Section */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex flex-col xl:flex-row xl:items-end gap-4">
          {/* Search Input */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by ID, email, name, or amount..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition"
            />
          </div>

          {/* Status Filter */}
          <div className="flex flex-col w-full md:w-1/4">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filterType}
              onChange={handleFilter}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition">
              <option value="All">All Transactions</option>
              <option value="Completed">Completed</option>
              <option value="Cancel">Cancel</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/3">
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-sm font-medium text-transparent mb-1">
              Reset
            </label>
            <button
              className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
              onClick={() => {
                setFromDate("");
                setToDate("");
                setSearchTerm("");
                setFilterType("All");
                setResetFilters(!resetFilters);
              }}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                No.
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTransactions?.length > 0 ? (
              filteredTransactions?.map((txn, idx) => (
                <tr key={txn._id}>
                  <td className="px-6 py-4 text-sm text-gray-800">{idx + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {txn.author.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {txn.author.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {txn.createdAt.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {txn.plan}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {txn.planDuration}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    ₹{txn.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {txn.paymentMethod}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {txn.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransaction;
