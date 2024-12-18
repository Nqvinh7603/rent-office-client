import Banner from "../common/Banner";
import PrivacyPolicyContent from "../common/Footers/PrivacyPolicyContent";
import SearchPanel from "../features/search-building/components/SearchPanel";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="w-full">
      <Banner />
      <SearchPanel />
      <PrivacyPolicyContent />
    </div>
  );
};
export default PrivacyPolicy;
