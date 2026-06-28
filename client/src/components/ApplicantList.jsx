import React, { useState, useEffect } from 'react';
import recruiterService from '../services/recruiterService';

const ApplicantList = ({ jobId, jobTitle }) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!jobId) return;
      try {
        setLoading(true);
        const res = await recruiterService.getJobApplicants(jobId);
        setApplicants(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load applicants.');
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  if (loading) {
    return <div className="text-center py-6 text-sm text-textSecondary">Loading candidates...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-sm text-red-600 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-primary/10 flex justify-between items-center">
        <h3 className="text-lg font-bold text-primary">
          Candidates for <span className="text-accent">{jobTitle}</span>
        </h3>
        <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full">
          {applicants.length} Applicant{applicants.length !== 1 ? 's' : ''}
        </span>
      </div>

      {applicants.length === 0 ? (
        <p className="text-sm italic text-textMuted py-4">No candidates have applied for this position yet.</p>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {applicants.map((app, index) => {
            const resumeDownloadUrl = app.seeker.resumeUrl 
              ? `${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000'}${app.seeker.resumeUrl}`
              : null;

            return (
              <div key={index} className="p-5 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                  <div>
                    <h4 className="font-bold text-primary text-base">{app.seeker.name}</h4>
                    <p className="text-xs text-textSecondary">{app.seeker.email}</p>
                  </div>
                  
                  {app.seeker.education && (
                    <p className="text-xs text-textSecondary">
                      <span className="font-semibold text-primary">Education: </span>
                      {app.seeker.education}
                    </p>
                  )}

                  {app.seeker.skills && app.seeker.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {app.seeker.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 bg-accent/20 text-primary text-[10px] font-bold rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-full md:w-auto">
                  {resumeDownloadUrl ? (
                    <a
                      href={resumeDownloadUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary text-xs py-2 px-4 text-center block w-full"
                    >
                      Download Resume
                    </a>
                  ) : (
                    <span className="text-[10px] uppercase font-bold text-red-500 bg-red-50 px-2 py-1.5 rounded-lg border border-red-100 block text-center">
                      No Resume Provided
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ApplicantList;
