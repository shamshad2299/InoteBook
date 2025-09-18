const Loading = ({data}) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 font-sans">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full bg-white bg-opacity-10"
            style={{
              animation: `float 3s ${i * 0.2}s infinite ease-in-out`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              transform: `
                translate(-50%, -50%) 
                rotate(${Math.random() * 360}deg) 
                translateX(${Math.random() * 100 + 50}px)
              `
            }}
          ></div>
        ))}
      </div>
      
      {/* Loading content */}
      <div className="text-center z-10 bg-white bg-opacity-5 backdrop-blur-lg rounded-2xl p-10 shadow-2xl border border-white border-opacity-10 w-11/12 max-w-md">
        {/* Spinner */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="w-full h-full rounded-full p-2 bg-conic-to-r from-orange-400 via-pink-600 to-purple-600 via-blue-500 to-orange-400 animate-spin">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-purple-900"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
            </svg>
          </div>
        </div>
        
        {/* Text */}
        <div className="mb-6 text-white">
          <h3 className="font-semibold text-xl mb-2 bg-gradient-to-r from-orange-400 via-pink-600 to-blue-400 bg-clip-text text-transparent">
            {data}
          </h3>
          <p className="opacity-80 text-sm">Preparing your experience...</p>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-white bg-opacity-10 h-1.5 rounded-full overflow-hidden">
          <div className="h-full w-2/5 bg-gradient-to-r from-orange-400 to-pink-600 rounded-full animate-loading"></div>
        </div>
      </div>
      
      {/* Custom styles for animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .animate-loading {
          animation: loading 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Loading;