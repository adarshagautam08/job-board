import { prisma } from '@/lib/prisma'
import Filter from '../component/Filter'

export default async function Jobs() {
  const jobs = await prisma.job.findMany()
  
  return (
    <div className="bg-[#1a1a1a] min-h-screen  text-white">
      
      {/* Navbar */}
      <div className="bg-black ml-5 mr-5  h-16 flex justify-between items-center px-10">
        <p className="text-[22px] font-bold text-yellow-500">WorkBoard</p>
        <div className="flex gap-6">
          <a
            href="/login"
            className="bg-[#D4A853] hover:bg-yellow-600 text-black px-6 py-2 rounded-md font-medium"
          >
            Post a Job
          </a>
          <a
            href="/login"
            className="border border-white px-6 py-2 rounded-md hover:bg-white hover:text-black transition"
          >
            Sign In
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-24">
        
        {/* Badge */}
        <div className="bg-yellow-500 text-black text-sm font-semibold px-4 py-1 rounded-full mb-6">
          1,247 new jobs this week
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl font-bold  leading-tight mb-6">
          Find Your Dream Job
          <br />
          <span className="text-yellow-500">Without the Noise</span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-lg sm:text-xl max-w-xl mb-10">
          Curated opportunities from top companies. No spam, no filler — just great careers.
        </p>

        {/* Search Bar */}
        <div className="flex w-full max-w-xl bg-white rounded-lg overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Search jobs, companies..."
            className="flex-1 px-5 py-3 text-black focus:outline-none text-sm"
          />
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 font-bold text-sm">
            Search
          </button>
        </div>

      </div>
    {/*job listing section  */}

    <Filter/>

</div>
   

  )
}