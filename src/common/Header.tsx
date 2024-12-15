const Header: React.FC = () => {
  return (
    <header className="grid grid-cols-3 items-center border-b bg-white p-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {/* <img src="your-logo-url.png" alt="Cyber Real Logo" className="h-10"> */}
          <div className="text-xl font-semibold text-gray-700">
            <span>Cyber Real</span>
            <p className="text-sm leading-none text-gray-500">
              The Best Choice For You
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <i className="anticon anticon-clock-circle text-lg text-gray-600"></i>
          <div className="text-sm">
            <span className="text-gray-500">Thời gian làm việc</span>
            <br />
            <span className="font-bold">24/7</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <i className="anticon anticon-phone text-lg text-gray-600"></i>
          <div className="text-sm">
            <span className="text-gray-500">Hotline</span>
            <br />
            <span className="font-bold text-black">0932.020.099</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <i className="anticon anticon-mail text-lg text-gray-600"></i>
          <div className="text-sm">
            <span className="text-gray-500">Email tư vấn</span>
            <br />
            <span className="font-bold text-black">info@cyberreal.vn</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="rounded bg-yellow-400 px-4 py-2 text-white hover:bg-yellow-500">
          Kí gửi
        </button>
      </div>
    </header>
  );
};

export default Header;
