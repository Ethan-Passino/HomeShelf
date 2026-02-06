import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Tabs,
  Tab,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import InventoryTab from '../Components/Tabs/InventoryTab';
import CatalogTab from '../Components/Tabs/CatalogTab';
import MembersTab from '../Components/Tabs/MembersTab';
import InfoTab from '../Components/Tabs/InfoTab';

const HomePage: React.FC = () => {
  const { homeId } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        return (
          <MembersTab
            memberIds={[
              'user_abc123',
              'user_def456',
              'user_ghi789',
              'user_xyz101',
              'user_jkl234',
              'user_mno567',
              'user_pqr890',
              'user_stu321',
              'user_vwx654',
              'user_yza987',
              'user_bcd210',
              'user_efg543',
              'user_hij876',
            ]}
          />
        );
      case 3:
        return <InfoTab />;
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
        <Box sx={{ overflowX: 'auto' }}>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons={isMobile ? 'auto' : false}
            allowScrollButtonsMobile
            visibleScrollbar
          >
            <Tab label="Inventory" sx={{ minWidth: isMobile ? 'auto' : 120 }} />
            <Tab label="Catalog" sx={{ minWidth: isMobile ? 'auto' : 120 }} />
            <Tab label="Members" sx={{ minWidth: isMobile ? 'auto' : 120 }} />
            <Tab label="Info" sx={{ minWidth: isMobile ? 'auto' : 120 }} />
          </Tabs>
        </Box>

        <Divider className="my-4" />

        {/* Tab Content */}
        <Box>{renderTabContent()}</Box>
      </div>
    </div>
  );
};

export default HomePage;
