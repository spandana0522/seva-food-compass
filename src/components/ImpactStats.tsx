
const ImpactStats = () => {
  const stats = [
    {
      value: "5,000+",
      label: "Meals Shared",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-seva-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    },
    {
      value: "1,200+",
      label: "Active Donors",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-seva-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      value: "800+",
      label: "Families Helped",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-seva-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      value: "2.5 tons",
      label: "Food Saved",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-seva-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Together, our community is making a real difference in fighting hunger and reducing food waste.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center opacity-0 animate-fade-in ${index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : index === 3 ? 'delay-3' : ''}`}
            >
              <div className="mx-auto w-16 h-16 bg-seva-50 rounded-full flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
