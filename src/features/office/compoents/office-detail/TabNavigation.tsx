// import { Tabs } from "antd";
// import React from "react";

// interface TabNavigationProps {
//   tabs: { key: string; label: string }[];
//   activeTab: string;
//   setActiveTab: (key: string) => void;
//   scrollToSection: (key: string) => void;
//   isSticky: boolean;
//   isHidden: boolean;
//   width: number | null;
//   tabRef: React.RefObject<HTMLDivElement>;
// }

// const TabNavigation: React.FC<TabNavigationProps> = ({
//   tabs,
//   activeTab,
//   setActiveTab,
//   scrollToSection,
//   isSticky,
//   isHidden,
//   width,
//   tabRef,
// }) => {
//   return (
//     <div ref={tabRef} className="relative">
//       <nav
//         className={`${isSticky && !isHidden ? "fixed top-16 z-50 shadow-lg" : "relative"}`}
//         style={{
//           width: isSticky && width ? `${width}px` : "auto",
//           display: isHidden ? "none" : "block",
//         }}
//       >
//         <div className="rounded-lg bg-[#3162ad]">
//           <Tabs
//             defaultActiveKey="generalInfo"
//             onChange={(key) => {
//               setActiveTab(key);
//               scrollToSection(key);
//             }}
//             centered
//             items={tabs.map((tab) => ({
//               key: tab.key,
//               label: (
//                 <div
//                   className={`px-6 py-1 text-xs font-bold ${
//                     tab.key === activeTab
//                       ? "rounded bg-white text-[#3162ad]"
//                       : "text-white transition-all hover:bg-white hover:text-[#3162ad]"
//                   }`}
//                 >
//                   {tab.label}
//                 </div>
//               ),
//             }))}
//             tabBarStyle={{
//               border: "none",
//               height: "45px",
//             }}
//           />
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default TabNavigation;
