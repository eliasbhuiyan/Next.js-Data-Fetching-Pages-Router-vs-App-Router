// Client-Side Rendering (CSR)

import { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/users/1')
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}