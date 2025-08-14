import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const query = searchedQuery.toLowerCase();

            const filteredJobs = allJobs.filter((job) =>
                (job.title && job.title.toLowerCase().includes(query)) ||
                (job.description && job.description.toLowerCase().includes(query)) ||
                (job.location && job.location.toLowerCase().includes(query))
            );

            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="bg-gradient-to-b from-white via-purple-50/40 to-white min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto mt-8 px-4">
                <div className="flex gap-6">

                    {/* Filter Sidebar */}
                    <div className="w-1/5">
                        <FilterCard />
                    </div>

                    {/* Job List */}
                    {filterJobs.length <= 0 ? (
                        <div className="flex-1 flex items-center justify-center text-center">
                            <span className="text-gray-500 text-lg font-semibold">
                                No jobs found matching your search.
                            </span>
                        </div>
                    ) : (
                        <div className="flex-1 h-[88vh] overflow-y-auto pb-5 pr-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
