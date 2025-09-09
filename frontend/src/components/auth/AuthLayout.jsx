import AuthImagePattern from './AuthImagePattern';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex min-h-screen">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-200 dark:border-gray-600 p-8 animate-fade-in">
              {children}
            </div>
          </div>
        </div>
        
        {/* Right side - Image Pattern */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <AuthImagePattern />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
