import InventoryHeader from '../../components/droneR&D/inventory/InventoryHeader';
import InventoryOverview from '../../components/droneR&D/inventory/InventoryOverview';
import InventoryCategories from '../../components/droneR&D/inventory/InventoryCategories';
import ReorderAlerts from '../../components/droneR&D/inventory/ReorderAlerts';
import InventoryAnalytics from '../../components/droneR&D/inventory/InventoryAnalytics';
import { useGet } from '../../hooks/useGet';
import { baseUrl } from '../../utilis';
import { useState, useMemo } from 'react';

const Inventory = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    stockLevel: '',
    search: '',
  });

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (filters.category) params.append('category', filters.category);
    if (filters.location) params.append('location', filters.location);
    if (filters.stockLevel) params.append('stockLevel', filters.stockLevel);
    if (filters.search) params.append('search', filters.search);
    return params.toString();
  }, [page, filters]);

  const { data, loading, error, refetch } = useGet(`${baseUrl}/inventory?${queryParams}`);

  return (
    <>
      <InventoryHeader refetch={refetch} />
      <div className="flex flex-col lg:flex-row gap-4">
        <InventoryOverview
          data={data}
          loading={loading}
          error={error}
          page={page}
          setPage={setPage}
          filters={filters}
          setFilters={setFilters}
        />
        <InventoryCategories />
      </div>
      <ReorderAlerts />
      <InventoryAnalytics />
    </>
  );
};

export default Inventory;
