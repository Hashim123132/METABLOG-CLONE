// src/PAGES/Verify.jsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Verifying your account...');
  const [status, setStatus] = useState('loading');
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const email = searchParams.get('email');

    if (!code || !email) {
      setMessage("❌ Invalid verification link.");
      setStatus('error');
      return;
    }

    fetch(`http://localhost:5000/api/auth/verify?code=${code}&email=${email}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessage("✅ Your account has been verified successfully! Redirecting to home...");
          setStatus('success');

          // ✅ Redirect to home page instead of login
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          setMessage("❌ Verification failed: " + (data.message || "Invalid or expired link."));
          setStatus('error');
        }
      })
      .catch(() => {
        setMessage("❌ Something went wrong. Please try again.");
        setStatus('error');
      });
  }, [searchParams, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-[#1a1b2e] text-white">
      <div className="text-center max-w-md p-6 bg-[#2a2d43] rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className={status === 'success' ? "text-green-400" : "text-red-400"}>
          {message}
        </p>
        {status === 'success' && (
          <p className="text-sm text-gray-400 mt-4">Redirecting to home...</p>
        )}
      </div>
    </div>
  );
};

export default Verify;
