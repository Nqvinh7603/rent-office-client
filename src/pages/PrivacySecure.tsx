import Banner from "../common/Banner";
import PrivacySecureContent from "../common/Footers/PrivacySecureContent";
import SearchPanel from "../features/search-building/components/SearchPanel";

const PrivacySecure: React.FC = () => {
  return (
    <div className="w-full">
      <Banner />
      <SearchPanel />
      <PrivacySecureContent />
    </div>
  );
};
export default PrivacySecure;
