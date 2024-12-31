import Banner from "../common/Banner";
import OfficeList from "../features/office/compoents/OfficeList";
import SearchPanel from "../features/search-building/components/SearchPanel";

const OfficeListPage: React.FC = () => {
  return (
    <div className="w-full">
      <Banner />
      <SearchPanel />
      <OfficeList />
    </div>
  );
};
export default OfficeListPage;
