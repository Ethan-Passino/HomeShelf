import React from 'react';
import { Link } from 'react-router-dom';

import InventoryIcon from '@mui/icons-material/Inventory';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const features = [
  {
    title: 'Track Everything',
    sub: 'Full home inventory control',
    icon: <InventoryIcon className="text-5xl text-blue-500" />,
    points: [
      'Add food, supplies, and tools',
      'Organized by category and location',
      'Search & filter instantly',
    ],
  },
  {
    title: 'Smart Notifications',
    sub: 'Never let anything go bad',
    icon: <NotificationsActiveIcon className="text-5xl text-yellow-500" />,
    points: [
      'Expiration reminders before it’s too late',
      'Low-stock alerts based on quantity',
      'Customizable per item type',
    ],
  },
  {
    title: 'Multiple Homes',
    sub: 'One app, many places',
    icon: <HomeWorkIcon className="text-5xl text-green-500" />,
    points: [
      'Switch between homes instantly',
      'Perfect for landlords or families',
      'Shared access options (coming soon)',
    ],
  },
  {
    title: 'Visual Catalog',
    sub: 'Snap it, track it',
    icon: <CameraAltIcon className="text-5xl text-purple-500" />,
    points: [
      'Upload photos for easy reference',
      'Great for expiration checks',
      'Optional fields stay out of your way',
    ],
  },
];

const HomePage = () => {
  return (
    <div className="w-full bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col md:flex-row items-center justify-between gap-12 px-6 py-24 bg-gradient-to-r from-blue-500 to-green-400 text-white">
        <div className="flex-1">
          <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
            HomeShelf
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-lg">
            Simplify and track your entire home inventory — from your pantry to
            your garage — with ease.
          </p>
          <div className="flex gap-4">
            <Link to="/login">
              <button className="px-6 py-2 bg-white text-blue-600 font-semibold rounded shadow hover:bg-blue-100 transition">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-6 py-2 border border-white text-white font-semibold rounded hover:bg-white hover:text-blue-600 transition">
                Register
              </button>
            </Link>
          </div>
        </div>

        <img
          src="https://via.placeholder.com/600x400.png?text=HomeShelf+Dashboard"
          alt="App preview"
          className="flex-1 w-full max-w-xl rounded-lg shadow-2xl"
        />
      </section>

      {/* Features Section */}
      <section className="py-24 px-10 text-center bg-white">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          Why Choose HomeShelf?
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Keep your household running smoothly with real-time tracking and smart
          features.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md border hover:shadow-xl transition"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm text-blue-600 font-medium mb-4">
                {feature.sub}
              </p>
              <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                {feature.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-10 border border-blue-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Ready to get started?
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Join hundreds of households simplifying their lives with HomeShelf.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Get Started
              </button>
            </Link>
            {/*<button className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100 transition">
              Learn More
            </button>*/}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-center py-4 text-sm text-gray-300">
        &copy; {new Date().getFullYear()} HomeShelf. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
