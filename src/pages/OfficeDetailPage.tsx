import Banner from "../common/Banner";
import OfficeDetail from "../features/office/compoents/office-detail/OfficeDetail";
import SearchPanel from "../features/search-building/components/SearchPanel";

const OfficeDetailPage: React.FC = () => {
  return (
    <div className="w-full">
      <Banner />
      <SearchPanel />
      <OfficeDetail />
    </div>
  );
};
export default OfficeDetailPage;
