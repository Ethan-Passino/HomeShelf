import React from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import Tooltip from '@mui/material/Tooltip';

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
              className="relative bg-white/90 backdrop-blur-md text-gray-800 rounded-2xl shadow-lg p-6 flex flex-col justify-between transition hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Top-right icon buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Tooltip title="Edit Home">
                  <button className="p-1 rounded-full bg-white hover:bg-gray-100 shadow">
                    <EditOutlinedIcon fontSize="small" />
                  </button>
                </Tooltip>
                <Tooltip title="Invite Members">
                  <button className="p-1 rounded-full bg-white hover:bg-gray-100 shadow">
                    <GroupAddOutlinedIcon fontSize="small" />
                  </button>
                </Tooltip>
              </div>

              {/* Home details */}
              <div className="pt-6">
                <h2 className="text-2xl font-semibold mb-2">{home.name}</h2>
                <p className="text-sm text-gray-500">
                  Created: {new Date(home.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Bottom action */}
              <div className="mt-6">
                <Link
                  to={`/home/${home.id}`}
                  className="flex items-center justify-center gap-2 w-full py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
                >
                  <ArrowForwardIosIcon fontSize="small" />
                </Link>
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
