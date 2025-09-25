import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  BarChart3, Users, Trophy, TrendingUp, User, Bell, LogOut, Search, Filter, 
  Download, Plus, ArrowUp, ArrowDown, ChevronUp, ChevronDown, Eye, Calendar, 
  Phone, Cake, UserCheck
} from 'lucide-react';

const SAIAdminSystem = () => {
  // Core state management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [notifications] = useState(3);
  
  // Authentication state
  const [authData, setAuthData] = useState({
    email: '', password: '', confirmPassword: '', fullName: '', remember: false
  });

  // Memoized data to prevent unnecessary re-renders
  const dashboardStats = useMemo(() => ([
    { title: 'Total Athletes', value: 1250, icon: Users, trend: '+12%', trendUp: true },
    { title: 'New Athletes', value: 150, icon: Plus, trend: '+8%', trendUp: true },
    { title: 'Completed Tests', value: 1000, icon: Trophy, trend: '+15%', trendUp: true },
    { title: 'Pending Evaluations', value: 250, icon: Filter, trend: '-5%', trendUp: false }
  ]), []);

  const athletesData = useMemo(() => ([
    { name: 'Ethan Carter', age: 22, gender: 'Male', location: 'Mumbai', tests: 5, score: 85 },
    { name: 'Olivia Bennett', age: 24, gender: 'Female', location: 'Delhi', tests: 4, score: 92 },
    { name: 'Noah Thompson', age: 21, gender: 'Male', location: 'Bangalore', tests: 6, score: 78 },
    { name: 'Ava Harris', age: 23, gender: 'Female', location: 'Chennai', tests: 5, score: 88 },
    { name: 'Liam Clark', age: 20, gender: 'Male', location: 'Kolkata', tests: 4, score: 80 },
    { name: 'Sophia Lewis', age: 25, gender: 'Female', location: 'Hyderabad', tests: 6, score: 95 }
  ]), []);

  const leaderboardData = useMemo(() => ([
    { rank: 1, name: 'Ethan Carter', sport: 'Swimming', score: 95 },
    { rank: 2, name: 'Olivia Bennett', sport: 'Athletics', score: 92 },
    { rank: 3, name: 'Noah Thompson', sport: 'Badminton', score: 90 },
    { rank: 4, name: 'Ava Martinez', sport: 'Gymnastics', score: 88 },
    { rank: 5, name: 'Liam Harris', sport: 'Boxing', score: 85 }
  ]), []);


  const handleLogout = useCallback(() => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsLoggedIn(false);
      setAuthData({ email: '', password: '', confirmPassword: '', fullName: '', remember: false });
      setActiveTab('dashboard');
    }
  }, []);


  // Optimized animated counter
  const AnimatedCounter = React.memo(({ value, duration = 1500 }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      const increment = value / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count.toLocaleString()}</span>;
  });

  // Optimized stat card component
  const StatCard = React.memo(({ title, value, icon: Icon, trend, trendUp }) => (
    <div className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div className={`flex items-center text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trendUp ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
          {trend}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
        <AnimatedCounter value={value} />
      </p>
    </div>
  ));

  // Optimized navigation
  const Navigation = React.memo(() => {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'athletes', label: 'Athletes', icon: Users },
      { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
      { id: 'analytics', label: 'Analytics', icon: TrendingUp },
      { id: 'profiles', label: 'Profiles', icon: User }
    ];

    return (
      <nav className="flex items-center space-x-6">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === id
                ? 'text-blue-600 bg-blue-50 shadow-sm border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    );
  });

  // Enhanced authentication page with stable input handling
  const AuthPage = () => {
    // Local state for form inputs to prevent parent re-renders from affecting input focus
    const [localAuthData, setLocalAuthData] = useState({
      email: '', 
      password: '', 
      confirmPassword: '', 
      fullName: '', 
      remember: false
    });

    // Sync local state with parent state when auth mode changes
    useEffect(() => {
      setLocalAuthData({
        email: authData.email, 
        password: authData.password, 
        confirmPassword: authData.confirmPassword, 
        fullName: authData.fullName, 
        remember: authData.remember
      });
    }, [authMode]); // Only sync when mode changes, not on every authData change

    const handleInputChange = (field, value) => {
      setLocalAuthData(prev => ({ ...prev, [field]: value }));
      // Update parent state with debounced effect to prevent excessive re-renders
      setAuthData(prev => ({ ...prev, [field]: value }));
    };

    const handleFormSubmit = (e) => {
      e.preventDefault();
      
      // Basic validation
      if (!localAuthData.email.trim() || !localAuthData.password.trim()) {
        alert('Please fill in all required fields');
        return;
      }

      if (authMode === 'signup') {
        if (!localAuthData.fullName.trim()) {
          alert('Please enter your full name');
          return;
        }
        if (localAuthData.password !== localAuthData.confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        if (localAuthData.password.length < 6) {
          alert('Password must be at least 6 characters long');
          return;
        }
      }
      
      // Simulate successful authentication
      setIsLoggedIn(true);
      setActiveTab('dashboard');
    };

    const handleModeChange = (mode) => {
      setAuthMode(mode);
    };

    const handleQuickDemo = () => {
      setIsLoggedIn(true);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20 w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl w-fit mx-auto mb-6 shadow-lg">
              <BarChart3 className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sports Authority of India</h1>
            <p className="text-gray-600">Admin Panel Access</p>
          </div>
          
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {['signin', 'signup'].map((mode) => (
              <button
                key={mode}
                onClick={() => handleModeChange(mode)}
                className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  authMode === mode ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                {mode === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <input
                type="text"
                placeholder="Full Name"
                value={localAuthData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                autoComplete="name"
                required
              />
            )}
            
            <input
              type="email"
              placeholder="Email Address"
              value={localAuthData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              autoComplete="email"
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={localAuthData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              autoComplete={authMode === 'signin' ? 'current-password' : 'new-password'}
              required
            />
            
            {authMode === 'signup' && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={localAuthData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                autoComplete="new-password"
                required
              />
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={localAuthData.remember}
                  onChange={(e) => handleInputChange('remember', e.target.checked)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                />
                {authMode === 'signin' ? 'Remember me' : 'I agree to terms'}
              </label>
              {authMode === 'signin' && (
                <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </a>
              )}
            </div>
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg"
            >
              {authMode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>

            <div className="text-center text-sm text-gray-600">
              {authMode === 'signin' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeChange('signup')}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Sign up here
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeChange('signin')}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Sign in here
                  </button>
                </>
              )}
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <button 
              onClick={handleQuickDemo}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            >
              Quick Demo Access
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard page component
  const DashboardPage = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Overview of athlete performance and system statistics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-gray-900">78</span>
              <div className="flex items-center text-green-600 font-semibold">
                <ArrowUp className="h-5 w-5 mr-1" />
                +5%
              </div>
            </div>
          </div>
        </div>
        <div className="h-64 bg-gradient-to-t from-blue-50 to-white rounded-lg"></div>
      </div>
    </div>
  );

  // Athletes page component
  const AthletesPage = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Athlete Management</h2>
        <p className="text-gray-600">Manage and monitor athlete performance data.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search athletes..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {['Location', 'Age', 'Gender'].map((filter) => (
            <select key={filter} className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>All {filter}s</option>
            </select>
          ))}
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Apply
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Name', 'Age', 'Gender', 'Location', 'Tests', 'Score', 'Action'].map((header) => (
                  <th key={header} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {athletesData.map((athlete, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{athlete.name}</td>
                  <td className="px-6 py-4 text-gray-500">{athlete.age}</td>
                  <td className="px-6 py-4 text-gray-500">{athlete.gender}</td>
                  <td className="px-6 py-4 text-gray-500">{athlete.location}</td>
                  <td className="px-6 py-4 text-center">{athlete.tests}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      athlete.score >= 90 ? 'bg-green-100 text-green-800' :
                      athlete.score >= 80 ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {athlete.score}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setActiveTab('profiles')}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Leaderboard page component
  const LeaderboardPage = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h2>
        <p className="text-gray-600">Track athlete performance across all tests.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b">
          <button className="py-2 text-sm font-semibold text-blue-600 border-b-2 border-blue-600">
            Overall Rankings
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Rank', 'Athlete Name', 'Sport/Test', 'Score'].map((header) => (
                  <th key={header} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaderboardData.map((athlete, index) => (
                <tr key={index} className={index % 2 === 1 ? 'bg-gray-50/50' : ''}>
                  <td className="px-6 py-4 font-medium">
                    <div className="flex items-center">
                      {athlete.rank <= 3 && (
                        <Trophy className={`h-5 w-5 mr-2 ${
                          athlete.rank === 1 ? 'text-yellow-500' :
                          athlete.rank === 2 ? 'text-gray-400' : 'text-orange-600'
                        }`} />
                      )}
                      {athlete.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{athlete.name}</td>
                  <td className="px-6 py-4 text-gray-500">{athlete.sport}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{athlete.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Analytics and Profiles pages (simplified for brevity)
  const AnalyticsPage = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
          <div className="h-64 bg-gradient-to-t from-blue-50 to-white rounded-lg"></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {['Speed', 'Agility', 'Strength', 'Endurance'].map((category, index) => (
              <div key={category} className="flex items-center space-x-3">
                <span className="w-16 text-sm">{category}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: `${80 + index * 5}%`}}></div>
                </div>
                <span className="text-sm font-semibold">{80 + index * 5}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ProfilesPage = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Athlete Profile</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
            AV
          </div>
          <h3 className="text-xl font-bold mb-2">Arjun Verma</h3>
          <p className="text-gray-500 mb-4">Athlete ID: AV12345</p>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center justify-center space-x-2">
              <Cake className="h-4 w-4" />
              <span>Age: 25</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+91 9876543210</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Performance History</h4>
          <div className="space-y-3">
            {['Endurance Test', 'Strength Test', 'Speed Test'].map((test, index) => (
              <div key={test} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{test}</span>
                <span className="text-green-600 font-semibold">Excellent</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Page router
  const renderPage = () => {
    const pages = {
      dashboard: DashboardPage,
      athletes: AthletesPage,
      leaderboard: LeaderboardPage,
      analytics: AnalyticsPage,
      profiles: ProfilesPage
    };
    const PageComponent = pages[activeTab] || DashboardPage;
    return <PageComponent />;
  };

  if (!isLoggedIn) return <AuthPage />;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                <BarChart3 className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">SAI Admin</h1>
            </div>
            
            <Navigation />
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">{notifications}</span>
                  </span>
                )}
              </div>
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full cursor-pointer hover:scale-110 transition-transform" />
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-200 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default SAIAdminSystem;