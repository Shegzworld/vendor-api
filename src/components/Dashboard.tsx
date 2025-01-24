import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Menu,
  RefreshCcw,
  Power,
  History,
  TrendingUp,
  Wallet,
  Users,
  ShoppingCart,
  UserPlus,
  Pill,
  Newspaper,
  Mic
} from 'lucide-react';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg">
        {/* Dashboard screen */}
        <section className="p-6 bg-blue-600 text-white rounded-t-xl">
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <User className="w-6 h-6" />
              <Menu className="w-6 h-6" />
            </div>
            <div className="flex gap-4">
              <RefreshCcw className="w-6 h-6" />
              <Power className="w-6 h-6 cursor-pointer" onClick={() => navigate('/login')}  />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">₦50,000</h1>
            <p className="text-blue-100">Fullmoon Pharmacy</p>
          </div>
        </section>

        {/* Wallet section */}
        <section className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-6">Wallet</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div onClick={() => navigate('/account')} className="cursor-pointer p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3 text-gray-700">
                <History className="w-5 h-5" />
                <span>Account</span>
              </div>
            </div>
            <div onClick={() => navigate('/earnings')} className="cursor-pointer p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3 text-gray-700">
                <TrendingUp className="w-5 h-5" />
                <span>Earnings</span>
              </div>
            </div>
            <div onClick={() => navigate('/withdraw')} className="cursor-pointer p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3 text-gray-700">
                <Wallet className="w-5 h-5" />
                <span>Withdraw</span>
              </div>
            </div>
          </div>
        </section>

        {/* Directory section */}
        <section className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-6">Directory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div onClick={() => navigate('/benfeks')} className="cursor-pointer p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3 text-gray-700">
                <Users className="w-5 h-5" />
                <span>Benfeks</span>
              </div>
            </div>
            <div onClick={() => navigate('/purchases')} className="cursor-pointer p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3 text-gray-700">
                <ShoppingCart className="w-5 h-5" />
                <span>Purchases</span>
              </div>
            </div>
            <div onClick={() => navigate('/add-benfek')} className="cursor-pointer p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3 text-gray-700">
                <UserPlus className="w-5 h-5" />
                <span>Add benfek</span>
              </div>
            </div>
          </div>
        </section>

        {/* Publish section */}
        <section className="p-6">
          <h2 className="text-xl font-semibold mb-6">Publish</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div onClick={() => navigate('/supplements')} className="cursor-pointer p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3 text-gray-700">
                <Pill className="w-5 h-5" />
                <span>Supplements</span>
              </div>
            </div>
            <div onClick={() => navigate('/articles')} className="cursor-pointer p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3 text-gray-700">
                <Newspaper className="w-5 h-5" />
                <span>Articles</span>
              </div>
            </div>
            <div onClick={() => navigate('/podcasts')} className="cursor-pointer p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3 text-gray-700">
                <Mic className="w-5 h-5" />
                <span>Podcasts</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;