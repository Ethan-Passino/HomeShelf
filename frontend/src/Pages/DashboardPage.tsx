import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import Tooltip from '@mui/material/Tooltip';
import EditHomeModal from '../Components/Modals/EditHomeModal';
import InviteUserModal from '../Components/Modals/InviteUserModal';
import CreateHomeModal from '../Components/Modals/CreateHomeModal';
import HeaderBar from '../Components/Common/HeaderBar';
import { useAuth } from '../auth/AuthProvider';

interface Home {
  id: string;
  name: string;
  createdAt: string;
}

const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [homes, setHomes] = useState<Home[]>([
    { id: '1', name: 'Main House', createdAt: '2024-12-01' },
    { id: '2', name: 'Lake Cabin', createdAt: '2025-02-10' },
  ]);

  const [selectedHome, setSelectedHome] = useState<Home | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const handleEditClick = (home: Home) => {
    setSelectedHome(home);
    setEditOpen(true);
  };

  const handleInviteClick = (home: Home) => {
    setSelectedHome(home);
    setInviteOpen(true);
  };

  const handleSaveEdit = (newName: string) => {
    if (!selectedHome) return;
    setHomes((prev) =>
      prev.map((h) => (h.id === selectedHome.id ? { ...h, name: newName } : h))
    );
  };

  const handleDeleteHome = () => {
    if (!selectedHome) return;
    setHomes((prev) => prev.filter((h) => h.id !== selectedHome.id));
  };

  const handleSendInvite = (email: string) => {
    console.log(`Inviting ${email} to ${selectedHome?.name}`);
    // TODO: Implement real invite logic
  };

  const handleCreateHome = (name: string, invitedEmails: string[]) => {
    const newHome: Home = {
      id: Date.now().toString(),
      name,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setHomes((prev) => [...prev, newHome]);

    console.log('Inviting to new home:', invitedEmails);
    // TODO: Optionally invite users
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-green-400">
      {user && <HeaderBar user={user} onLogout={handleLogout} />}
      <div className="max-w-6xl mx-auto px-4 py-12 text-white">
        <h1 className="text-4xl font-extrabold mb-10 text-center drop-shadow">
          HomeShelf Dashboard
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {homes.map((home) => (
            <div
              key={home.id}
              className="h-[250px] relative bg-white/90 backdrop-blur-md text-gray-800 rounded-2xl shadow-lg p-6 flex flex-col justify-between transition hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Top-right icon buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Tooltip title="Edit Home">
                  <button
                    onClick={() => handleEditClick(home)}
                    className="p-1 rounded-full bg-white hover:bg-gray-100 shadow"
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </button>
                </Tooltip>
                <Tooltip title="Invite Members">
                  <button
                    onClick={() => handleInviteClick(home)}
                    className="p-1 rounded-full bg-white hover:bg-gray-100 shadow"
                  >
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
                  Open Home
                  <ArrowForwardIosIcon fontSize="small" />
                </Link>
              </div>
            </div>
          ))}

          {/* Add New Home Card */}
          <div className="w-full h-[250px]">
            <button
              onClick={() => setCreateOpen(true)}
              className="w-full h-full bg-white/30 border-2 border-white border-dashed rounded-2xl p-6 flex items-center justify-center text-white text-xl font-semibold hover:bg-white/40 transition backdrop-blur-md hover:scale-[1.02]"
            >
              + Add New Home
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedHome && (
        <EditHomeModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          onSave={handleSaveEdit}
          onDelete={handleDeleteHome}
          initialName={selectedHome.name}
        />
      )}

      {selectedHome && (
        <InviteUserModal
          open={inviteOpen}
          onClose={() => setInviteOpen(false)}
          onInvite={() => handleSendInvite('')}
        />
      )}

      <CreateHomeModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateHome}
      />
    </div>
  );
};

export default DashboardPage;
