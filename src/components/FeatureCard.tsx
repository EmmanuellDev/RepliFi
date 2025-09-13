const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg hover:shadow-2xl hover:border-blue-500 transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="text-blue-400 mr-3 scale-110">{icon}</div>
        <h3 className="text-xl font-bold text-white tracking-tight drop-shadow-lg">{title}</h3>
      </div>
      <p className="text-gray-300 text-base leading-relaxed">{description}</p>
    </div>
  );
};
export default FeatureCard;