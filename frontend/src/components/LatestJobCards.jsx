import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="p-6 rounded-2xl shadow-2xl 
                       bg-gradient-to-br from-white/90 via-purple-50/90 to-white/90
                       border border-purple-200 cursor-pointer
                       transform transition-transform duration-300 hover:scale-[1.02]"
        >
            {/* Company Info */}
            <div>
                <h1 className="font-bold text-xl text-black">{job?.company?.name}</h1>
                <p className="text-sm text-purple-700">India</p>
            </div>

            {/* Job Title & Description */}
            <div className="mt-3">
                <h1 className="font-extrabold text-lg text-[#F83002]">{job?.title}</h1>
                <p className="text-sm text-gray-700 line-clamp-2">{job?.description}</p>
            </div>

            {/* Job Details Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-5">
                <Badge className="text-purple-700 font-semibold bg-purple-100" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-pink-700 font-semibold bg-pink-100" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-indigo-700 font-semibold bg-indigo-100" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
