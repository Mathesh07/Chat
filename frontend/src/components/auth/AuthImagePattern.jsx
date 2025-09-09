const AuthImagePattern = ({ title = "Join our community", subtitle = "Connect with friends and colleagues in real-time" }) => {
  return (
    <div className="relative h-full bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-12 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 gap-4 h-full">
          {[...Array(64)].map((_, i) => (
            <div
              key={i}
              className={`rounded-lg bg-white ${
                i % 3 === 0 ? "animate-pulse" : i % 5 === 0 ? "animate-bounce" : ""
              }`}
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${2 + (i % 3)}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-md text-center text-white">
        <div className="mb-8">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-blue-100 text-lg leading-relaxed">{subtitle}</p>
        
        {/* Feature highlights */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Real-time messaging</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Secure & private</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Cross-platform support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
