import { transactions, monthlyData, categoryData } from '../data/mockData'
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Cell, PieChart, Pie
} from 'recharts'

const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-lg text-xs">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: ₹{Number(p.value).toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const Dashboard = () => {
  const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === 'EXPENSE').reduce((s, t) => s + t.amount, 0)
  const balance = totalIncome - totalExpenses
  const savingsRate = Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
  const recent = transactions.slice(0, 5)

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Track your income, expenses and savings</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Income</p>
              <h2 className="text-2xl font-bold mt-1 text-emerald-600">₹{totalIncome.toLocaleString()}</h2>
              <p className="text-xs text-gray-400 mt-1">This month</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
              <TrendingUp size={17} className="text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Expenses</p>
              <h2 className="text-2xl font-bold mt-1 text-red-500">₹{totalExpenses.toLocaleString()}</h2>
              <p className="text-xs text-gray-400 mt-1">This month</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <TrendingDown size={17} className="text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Net Balance</p>
              <h2 className="text-2xl font-bold mt-1 text-indigo-600">₹{balance.toLocaleString()}</h2>
              <p className="text-xs text-gray-400 mt-1">Available</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Wallet size={17} className="text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Savings Rate</p>
              <h2 className="text-2xl font-bold mt-1 text-violet-600">{savingsRate}%</h2>
              <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-violet-500" style={{ width: `${savingsRate}%` }} />
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center ml-3">
              <PiggyBank size={17} className="text-violet-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-gray-700">Monthly Overview</h2>
              <p className="text-xs text-gray-400 mt-0.5">Income vs Expenses</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />Income
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />Expenses
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={monthlyData} barGap={4} barCategoryGap="30%">
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={45} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
              <Bar dataKey="income" fill="#10b981" radius={[5, 5, 0, 0]} />
              <Bar dataKey="expenses" fill="#f87171" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart — fixed */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-700">Spending Distribution</h2>
            <p className="text-xs text-gray-400 mt-0.5">Category breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={categoryData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Radar name="Spending" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-700">Recent Transactions</h2>
            <p className="text-xs text-gray-400 mt-0.5">Last 5 entries</p>
          </div>
          <div className="space-y-1">
            {recent.map(t => (
              <div key={t.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold
                    ${t.type === 'INCOME' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                    {t.type === 'INCOME' ? '+' : '-'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{t.title}</p>
                    <p className="text-xs text-gray-400">{t.category} · {t.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold tabular-nums
                  ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {t.type === 'INCOME' ? '+' : '-'}₹{t.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-700">By Category</h2>
            <p className="text-xs text-gray-400 mt-0.5">Spending share</p>
          </div>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={3}>
                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {categoryData.map((cat, i) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-xs text-gray-500">{cat.name}</span>
                </div>
                <span className="text-xs font-medium text-gray-700">₹{cat.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard