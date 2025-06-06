import React from 'react';
import InventoryHeader from '../../components/droneR&D/inventory/InventoryHeader';
import InventoryOverview from '../../components/droneR&D/inventory/InventoryOverview';
import InventoryCategories from '../../components/droneR&D/inventory/InventoryCategories';
import ReorderAlerts from '../../components/droneR&D/inventory/ReorderAlerts';
import InventoryAnalytics from '../../components/droneR&D/inventory/InventoryAnalytics';

const Inventory = () => {
  return (
    <>
      <InventoryHeader />
      <div className="flex flex-col lg:flex-row gap-4">
        <InventoryOverview  />
        <InventoryCategories />
      </div>
      <ReorderAlerts/>
      <InventoryAnalytics/>
    </>
  );
};

export default Inventory;
