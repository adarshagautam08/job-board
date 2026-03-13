import Apply from '@/app/component/Apply'
import { prisma } from '@/lib/prisma'

export default async function JobDetails({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({
    where: { id: params.id }
  })

  if (!job) {
    return (
      <div className="bg-[#1a1a1a] min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Job not found</p>
      </div>
    )
  }

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white">


      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Back Button */}
        <a
          href="/jobs"
          className="text-gray-400 hover:text-yellow-500 text-sm mb-8 inline-block transition"
        >
          ← Back to Jobs
        </a>

        {/* Job Header */}
        <div className="bg-[#2a2a2a] border border-gray-700 rounded-2xl p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {job.title}
              </h1>
              <p className="text-gray-400 text-lg">{job.company}</p>
            </div>
            <span className="bg-yellow-500 text-black px-4 py-1.5 rounded-full text-sm font-bold">
              {job.type}
            </span>
          </div>

          {/* Job Info */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-[#1a1a1a] px-4 py-2 rounded-lg text-sm">
              📍 {job.location}
            </div>
            <div className="bg-[#1a1a1a] px-4 py-2 rounded-lg text-sm">
              🏷️ {job.category}
            </div>
            <div className="bg-[#1a1a1a] px-4 py-2 rounded-lg text-sm text-yellow-500 font-medium">
              💰 ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-[#2a2a2a] border border-gray-700 rounded-2xl p-8 mb-6">
          <h2 className="text-xl font-bold mb-4 text-yellow-500">
            Job Description
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Apply Button */}
        <div className="bg-[#2a2a2a] border border-gray-700 rounded-2xl p-8 flex justify-between items-center">
          <div>
            <p className="text-white font-bold text-lg">Ready to apply?</p>
            <p className="text-gray-400 text-sm mt-1">
              Sign in to submit your application
            </p>
          </div>
          {/* <a
            href={`/login?callbackUrl=/jobs/${job.id}`}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold transition text-sm"
          >
            Apply Now →
          </a> */}
          <Apply jobId={job.id} />
        </div>

      </div>
    </div>
  )
}
