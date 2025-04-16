import { Store } from 'lucide-react'; // Import the specific icon

const DashboardCards = () => {
  return (
    <div className="flex flex-wrap justify-between gap-6 p-2 mt-2 rounded-lg">
      {/* First row of three components */}
      <div className="relative flex flex-col h-32 w-60 items-center justify-center p-2 text-orange-500 bg-[#2B2623] rounded-lg">
        <div className="flex items-center gap-2 text-5xl bg-[#4D423E] px-8 py-4 rounded-lg font-thin">
          <span>fgdg</span>
          <Store className="absolute top-4 right-4 w-5 h-5 text-gray-400" /> {/* Use the Store icon here */}
        </div>
        <div className="mt-2 text-gray-300 text-md">dfgbd</div>
      </div>
 
      <div className="relative flex flex-col h-32 w-60 items-center justify-center p-2 text-orange-500 bg-[#2B2623] rounded-lg">
        <div className="flex items-center gap-2 text-5xl bg-[#4D423E] px-8 py-4 rounded-lg font-thin">
          <span>fgdg</span>
          <Store className="absolute top-4 right-4 w-5 h-5 text-gray-400" /> {/* Use the Store icon here */}
        </div>
        <div className="mt-2 text-gray-300 text-md">dfgbd</div>
      </div>

      <div className="relative flex flex-col h-32 w-60 items-center justify-center p-2 text-orange-500 bg-[#2B2623] rounded-lg">
        <div className="flex items-center gap-2 text-5xl bg-[#4D423E] px-8 py-4 rounded-lg font-thin">
          <span>fgdg</span>
          <Store className="absolute top-4 right-4 w-5 h-5 text-gray-400" /> {/* Use the Store icon here */}
        </div>
        <div className="mt-2 text-gray-300 text-md">dfgbd</div>
      </div>

      {/* Second row of components */}
      <div className="relative flex flex-col h-32 w-60 items-center justify-center p-2 text-orange-500 bg-[#2B2623] rounded-lg">
        <div className="flex items-center gap-2 text-5xl bg-[#4D423E] px-8 py-4 rounded-lg font-thin">
          <span>fgdg</span>
          <Store className="absolute top-4 right-4 w-5 h-5 text-gray-400" /> {/* Use the Store icon here */}
        </div>
        <div className="mt-2 text-gray-300 text-md">dfgbd</div>
      </div>

      {/* Add more components as needed */}
    </div>
  );
};

export default DashboardCards;
