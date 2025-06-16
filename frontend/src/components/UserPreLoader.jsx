import React, { useEffect, useState } from 'react';

const UserPreLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading selesai setelah 2 detik
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // bisa kamu ganti sesuai kebutuhan

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="loader">
      <div className="loader-inner">
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default UserPreLoader;
