import React from 'react';
import { Link } from 'react-router-dom';

const _404 = () => {
  return (
    <div className="page__not__found">
      <div>
        <h2>404 Page Not Found</h2>
        <h5>
          The page you are looking for is unavailable. It might have been
          removed, had its name changed or moved.
        </h5>
        <Link to="/" className='btn btn-primary px-5 mt-5'>Home</Link>
        </div>
    </div>
  );
};

export default _404;
