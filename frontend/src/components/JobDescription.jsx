import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-4xl mx-auto my-8 p-8 bg-gradient-to-tr from-purple-100 via-blue-100 to-indigo-100 rounded-xl shadow-md border border-purple-200 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          {/* Updated heading style */}
          <h1 className="font-extrabold text-3xl text-[#F83002] tracking-wide mb-2">
            {singleJob?.title}
          </h1>
          <div className="flex flex-wrap gap-3 mt-3">
            <Badge className="text-purple-700 bg-purple-200 font-semibold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-red-600 bg-red-200 font-semibold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-indigo-700 bg-indigo-200 font-semibold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? undefined : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 font-semibold shadow-md transition-transform duration-200 transform ${
            isApplied
              ? 'bg-gray-400 cursor-not-allowed shadow-inner'
              : 'bg-purple-600 text-white hover:bg-purple-700 active:scale-95 shadow-purple-400/50'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <section className="mt-6 border-t border-purple-300 pt-6 space-y-4 text-sm md:text-base bg-purple-50 rounded-lg p-6 shadow-inner">
        <h2 className="text-xl font-semibold border-b border-purple-300 pb-2">Job Description</h2>
        <div className="space-y-2 leading-relaxed">
          <p><span className="font-semibold">Role:</span> {singleJob?.title}</p>
          <p><span className="font-semibold">Location:</span> {singleJob?.location}</p>
          <p><span className="font-semibold">Description:</span> {singleJob?.description}</p>
          <p><span className="font-semibold">Experience:</span> {singleJob?.experienceLevel} yrs</p>
          <p><span className="font-semibold">Salary:</span> {singleJob?.salary} LPA</p>
          <p><span className="font-semibold">Total Applicants:</span> {singleJob?.applications?.length || 0}</p>
          <p><span className="font-semibold">Posted Date:</span> {singleJob?.createdAt ? singleJob.createdAt.split('T')[0] : 'N/A'}</p>
        </div>
      </section>
    </div>
  );
};

export default JobDescription;
