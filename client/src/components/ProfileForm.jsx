import React, { useState } from 'react';

const ProfileForm = ({ initialData, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    education: initialData.education || '',
    skills: initialData.skills ? initialData.skills.join(', ') : '',
  });
  
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const { name, education, skills } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await onProfileUpdated('text', { name, education, skills });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a resume file to upload.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    const uploadData = new FormData();
    uploadData.append('resume', file);

    try {
      await onProfileUpdated('file', uploadData);
      setMessage({ type: 'success', text: 'Resume uploaded successfully!' });
      setFile(null);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to upload resume.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Status Message */}
      {message.text && (
        <div className={`p-4 rounded-xl text-sm border text-center ${
          message.type === 'success' ? 'bg-green-50 text-green-700 border-green-150' : 'bg-red-50 text-red-700 border-red-150'
        }`}>
          {message.text}
        </div>
      )}

      {/* Edit Profile Text Form */}
      <form onSubmit={handleTextSubmit} className="space-y-4">
        <h3 className="text-xl font-bold text-primary pb-2 border-b border-primary/10">Personal details</h3>
        
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Education Level</label>
          <input
            type="text"
            name="education"
            value={education}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm"
            placeholder="e.g. Bachelor of Science in Computer Science"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Skills (Comma-separated)</label>
          <input
            type="text"
            name="skills"
            value={skills}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm"
            placeholder="e.g. React, Node.js, Express, MongoDB"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 text-sm font-semibold tracking-wide uppercase disabled:opacity-50"
        >
          {loading ? 'Saving Details...' : 'Save Profile Details'}
        </button>
      </form>

      {/* Resume File Upload Form */}
      <form onSubmit={handleFileUpload} className="space-y-4 pt-6 border-t border-primary/10">
        <h3 className="text-xl font-bold text-primary pb-2">Upload Resume Document</h3>
        <p className="text-xs text-textSecondary">Supported formats: PDF, DOC, DOCX. Max size 5MB.</p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={onFileChange}
            className="w-full text-sm text-textSecondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-secondary w-full sm:w-auto py-2 px-6 text-xs font-semibold tracking-wide uppercase disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
