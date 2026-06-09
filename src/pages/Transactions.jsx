import { useState } from 'react'
import { transactions as initialData } from '../data/mockData'
import { Plus, Trash2, Calendar, Filter } from 'lucide-react'

const CATEGORIES = ['Food', 'Rent', 'Bills', 'Transport', 'Entertainment', 'Salary', 'Freelance', 'Other']

const Transactions = () => {
  const [transactions, setTransactions] = useState(initialData)
  const [filter, setFilter] = useState('ALL')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: '', amount: '', type: 'EXPENSE', category: 'Food', date: ''
  })

  const filtered = filter === 'ALL'
    ? transactions
    : transactions.filter(t => t.type === filter)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (!form.title || !form.amount || !form.date) return
    const newTransaction = {
      id: transactions.length + 1,
      ...form,
      amount: parseFloat(form.amount)
    }
    setTransactions([newTransaction, ...transactions])
    setForm({ title: '', amount: '', type: 'EXPENSE', category: 'Food', date: '' })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Transactions</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage and filter your transactional logging history.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Transaction
        </button>
      </div>

      {/* Add Form with custom sleek input states */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-700 tracking-tight">New Transaction Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title (e.g. Grocery Shop)"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            <input
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount (₹)"
              type="number"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            <input
              name="date"
              value={form.date}
              onChange={handleChange}
              type="date"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <button
              onClick={handleAdd}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-all shadow-sm"
            >
              Save Transaction
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-1.5 bg-slate-200/60 p-1 rounded-xl w-fit">
        {['ALL', 'INCOME', 'EXPENSE'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all
              ${filter === f
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Modernised Table Layout */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4 text-left font-semibold">Title</th>
                <th className="px-6 py-4 text-left font-semibold">Category</th>
                <th className="px-6 py-4 text-left font-semibold">Date</th>
                <th className="px-6 py-4 text-left font-semibold">Type</th>
                <th className="px-6 py-4 text-right font-semibold">Amount</th>
                <th className="px-6 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                  <td className="px-6 py-4 font-medium text-slate-700">{t.title}</td>
                  <td className="px-6 py-4 text-slate-500">{t.category}</td>
                  <td className="px-6 py-4 text-slate-400 font-normal">{t.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium tracking-wide
                      ${t.type === 'INCOME'
                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10'
                        : 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/10'
                      }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-semibold tracking-tight
                    ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-slate-700'}`}>
                    {t.type === 'INCOME' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-slate-400 hover:text-rose-500 font-medium transition-colors duration-150"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Transactions