import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const dummyHomes = [
    { id: '1', name: 'Main House', createdAt: '2024-12-01' },
    { id: '2', name: 'Lake Cabin', createdAt: '2025-02-10' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-green-400 px-4 py-12 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-center drop-shadow">
          HomeShelf Dashboard
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {dummyHomes.map((home) => (
            <div
              key={home.id}
              className="bg-white/90 backdrop-blur-md text-gray-800 rounded-2xl shadow-lg p-6 flex flex-col justify-between transition hover:scale-[1.02] hover:shadow-2xl"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-2">{home.name}</h2>
                <p className="text-sm text-gray-500">
                  Created: {new Date(home.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                <Link
                  to={`/home/${home.id}`}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm text-center hover:bg-blue-700 transition"
                >
                  Open Home
                </Link>
                <button className="py-2 px-4 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Add New Home Card */}
          <Link
            to="/create-home"
            className="bg-white/30 border-2 border-white border-dashed rounded-2xl p-6 flex items-center justify-center text-white text-xl font-semibold hover:bg-white/40 transition backdrop-blur-md hover:scale-[1.02]"
          >
            + Add New Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
