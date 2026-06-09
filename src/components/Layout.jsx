import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className="flex bg-[#f5f6fa] dark:bg-[#0d1117] min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-10">
        {children}
      </main>
    </div>
  )
}

export default Layout