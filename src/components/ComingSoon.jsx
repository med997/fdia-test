import { Construction } from 'lucide-react';

const ComingSoon = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="bg-indigo-50 p-6 rounded-full mb-6">
        <Construction className="w-16 h-16 text-indigo-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title || 'Coming Soon'}</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        We're working hard to bring you this feature. Stay tuned for updates!
      </p>
      <button className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
        Notify Me
      </button>
    </div>
  );
};

export default ComingSoon;
