import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className="flex bg-[#f5f6fa] min-h-screen">
      <Sidebar />
      <main className="ml-60 flex-1 p-8 max-w-[1200px]">
        {children}
      </main>
    </div>
  )
}

export default Layout