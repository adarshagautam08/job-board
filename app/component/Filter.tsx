'use client'
export default function Filter ()
{
    const filter=['All','Remote','Internship','Design','Marketing']

    return(
        <div className="bg-white text-black h-screen ml-5 mr-5 " >
            <div className="flex flex-row w-[600px]  justify-evenly " >
                <p className="text-center font-bold h-8 mt-2">Filter:</p>
                {filter.map((item)=>
                (
                    <button className=" mt-2 rounded-lg bg-gray-100 border border-yellow-600 h-8 w-20" key={item} >{item}</button>
                ))}
            </div>
        </div>
    );
}