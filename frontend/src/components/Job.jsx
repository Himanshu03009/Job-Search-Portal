import React, { useState } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const BookmarkFilled = (props) => (
  <svg
    {...props}
    fill="currentColor"
    viewBox="0 0 24 24"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 4a2 2 0 0 0-2 2v16l8-5 8 5V6a2 2 0 0 0-2-2H6z" />
  </svg>
);

const Job = ({ job }) => {
  const navigate = useNavigate();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(prev => !prev);
    // Add backend save logic here if needed
  };

  const toggleSave = () => {
    setIsSaved(prev => !prev);
    // Add backend save logic here if needed
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
      {/* Posted date & Save button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button 
          variant="outline" 
          className="rounded-full" 
          size="icon" 
          onClick={toggleBookmark}
          aria-label="Bookmark Job"
        >
          {isBookmarked ? (
            <BookmarkFilled className="text-black w-5 h-5" />
          ) : (
            <Bookmark className="text-black w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-2 my-3">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-bold text-lg text-black">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-lg my-2 text-[#F83002]">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      {/* Job Badges */}
      <div className="flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary} LPA</Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
          Details
        </Button>
        <Button
          onClick={toggleSave}
          className={`transition-colors duration-200 ${
            isSaved
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-[#7209b7] text-white hover:bg-[#5e07a3]'
          }`}
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
