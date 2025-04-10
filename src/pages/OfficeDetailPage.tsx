import Banner from "../common/Banner";
import OfficeDetailOverview from "../features/office/compoents/office-detail/OfficeDetailOverview";
import SearchPanel from "../features/search-building/components/SearchPanel";

const OfficeDetailPage: React.FC = () => {
  return (
    <div className="w-full">
      <Banner />
      <SearchPanel />
      <OfficeDetailOverview />
    </div>
  );
};
export default OfficeDetailPage;
