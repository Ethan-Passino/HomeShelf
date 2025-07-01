import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Box, Typography, Button, Divider } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InventoryTab from '../Components/Tabs/InventoryTab';
import CatalogTab from '../Components/Tabs/CatalogTab';

const HomePage: React.FC = () => {
  const { homeId } = useParams();
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const renderTabContent = () => {
    switch (tabIndex) {
      case 0:
        return <InventoryTab />;
      case 1:
        return <CatalogTab />;
      case 2:
        return <Placeholder title="Members" />;
      case 3:
        return <Placeholder title="Settings" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-green-400 px-4 py-12 text-white">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md text-gray-800 rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold">Home Name</h1>
            <p className="text-sm text-gray-600">Home ID: {homeId}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Inventory" />
          <Tab label="Catalog" />
          <Tab label="Members" />
          <Tab label="Settings" />
        </Tabs>

        <Divider className="my-4" />

        {/* Tab Content */}
        <Box>{renderTabContent()}</Box>
      </div>
    </div>
  );
};

const Placeholder: React.FC<{ title: string }> = ({ title }) => (
  <div className="text-center py-12 text-gray-500">
    <Typography variant="h6">{title} goes here.</Typography>
    <Typography variant="body2">
      This is a placeholder section for the {title.toLowerCase()} tab.
    </Typography>
  </div>
);

export default HomePage;
