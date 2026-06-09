import { useState } from 'react'
import { Plus, Trash2, ShoppingCart, Home, Zap, Car, Film, Briefcase, Monitor, Heart, BookOpen, Plane, Coffee, Gamepad2 } from 'lucide-react'

const ICON_OPTIONS = [
  { key: 'ShoppingCart', Icon: ShoppingCart },
  { key: 'Home', Icon: Home },
  { key: 'Zap', Icon: Zap },
  { key: 'Car', Icon: Car },
  { key: 'Film', Icon: Film },
  { key: 'Briefcase', Icon: Briefcase },
  { key: 'Monitor', Icon: Monitor },
  { key: 'Heart', Icon: Heart },
  { key: 'BookOpen', Icon: BookOpen },
  { key: 'Plane', Icon: Plane },
  { key: 'Coffee', Icon: Coffee },
  { key: 'Gamepad2', Icon: Gamepad2 },
]

const COLOR_OPTIONS = [
  { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: '#10b981' },
  { bg: 'bg-indigo-50', text: 'text-indigo-600', dot: '#6366f1' },
  { bg: 'bg-amber-50', text: 'text-amber-600', dot: '#f59e0b' },
  { bg: 'bg-red-50', text: 'text-red-500', dot: '#ef4444' },
  { bg: 'bg-violet-50', text: 'text-violet-600', dot: '#8b5cf6' },
  { bg: 'bg-cyan-50', text: 'text-cyan-600', dot: '#06b6d4' },
  { bg: 'bg-pink-50', text: 'text-pink-600', dot: '#ec4899' },
  { bg: 'bg-orange-50', text: 'text-orange-600', dot: '#f97316' },
]

const initialCategories = [
  { id: 1, name: 'Food', iconKey: 'ShoppingCart', color: COLOR_OPTIONS[0], count: 12 },
  { id: 2, name: 'Rent', iconKey: 'Home', color: COLOR_OPTIONS[1], count: 2 },
  { id: 3, name: 'Bills', iconKey: 'Zap', color: COLOR_OPTIONS[2], count: 8 },
  { id: 4, name: 'Transport', iconKey: 'Car', color: COLOR_OPTIONS[3], count: 15 },
  { id: 5, name: 'Entertainment', iconKey: 'Film', color: COLOR_OPTIONS[4], count: 6 },
  { id: 6, name: 'Salary', iconKey: 'Briefcase', color: COLOR_OPTIONS[5], count: 4 },
  { id: 7, name: 'Freelance', iconKey: 'Monitor', color: COLOR_OPTIONS[6], count: 3 },
]

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', iconKey: 'ShoppingCart', color: COLOR_OPTIONS[0] })

  const getIcon = (key) => ICON_OPTIONS.find(i => i.key === key)?.Icon || ShoppingCart

  const handleAdd = () => {
    if (!form.name.trim()) return
    setCategories([...categories, {
      id: Date.now(),
      name: form.name,
      iconKey: form.iconKey,
      color: form.color,
      count: 0
    }])
    setForm({ name: '', iconKey: 'ShoppingCart', color: COLOR_OPTIONS[0] })
    setShowForm(false)
  }

  const handleDelete = (id) => setCategories(categories.filter(c => c.id !== id))

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Categories</h1>
          <p className="text-sm text-gray-400 mt-0.5">Organize your transactions by category</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#0e1726] hover:bg-gray-800 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
        >
          <Plus size={15} />
          Add Category
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">New Category</h2>

          <div className="space-y-4">
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Category name"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-gray-400"
            />

            {/* Icon Picker */}
            <div>
              <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wider">Icon</p>
              <div className="flex flex-wrap gap-2">
                {ICON_OPTIONS.map(({ key, Icon }) => (
                  <button
                    key={key}
                    onClick={() => setForm({ ...form, iconKey: key })}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all border
                      ${form.iconKey === key
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-600'
                        : 'bg-gray-50 border-gray-200 text-gray-400 hover:border-gray-300'
                      }`}
                  >
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div>
              <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wider">Color</p>
              <div className="flex gap-2">
                {COLOR_OPTIONS.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setForm({ ...form, color })}
                    className={`w-7 h-7 rounded-full transition-all border-2
                      ${form.color.dot === color.dot ? 'border-gray-700 scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: color.dot }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleAdd}
                className="bg-[#0e1726] hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="border border-gray-200 text-gray-500 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Total</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{categories.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">Categories</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Most Used</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {categories.sort((a, b) => b.count - a.count)[0]?.name}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">By transaction count</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Tagged</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">
            {categories.reduce((s, c) => s + c.count, 0)}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Total transactions</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Least Used</p>
          <p className="text-2xl font-bold text-violet-600 mt-1">
            {[...categories].sort((a, b) => a.count - b.count)[0]?.name}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">By transaction count</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {categories.map(cat => {
          const Icon = getIcon(cat.iconKey)
          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between hover:border-gray-200 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color.bg} ${cat.color.text}`}>
                  <Icon size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">{cat.name}</p>
                  <p className="text-xs text-gray-400">{cat.count} transactions</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(cat.id)}
                className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all"
              >
                <Trash2 size={13} />
              </button>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Categories