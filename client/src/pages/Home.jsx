import React from 'react';

export default function Home() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold  mb-4 text-slate-800'>
       Auth Web App!
      </h1>
      <p className='mb-4 text-slate-700'>
        This is a full-stack web application built with the MERN (MongoDB,
        Express, React, Node.js) stack. It includes authentication features that
        allow users to sign up, log in, and log out, and provides access to
        protected routes only for authenticated users.
      </p>
      <p className='mb-4 text-slate-700'>
        The front-end of this web application is  based on React  and uses React
        Router for client-side routing. The back-end of this web app is built with Node.js and
        Express, and uses MongoDB atlas as the database. Authentication is implemented
        using JSON Web Tokens (JWT).
      </p>
    </div>
  );
}