import React, { createContext, ReactNode, useContext, useRef } from "react";

type ContactRefContextType = React.RefObject<HTMLDivElement>;

const ContactRefContext = createContext<ContactRefContextType | null>(null);
ContactRefContext.displayName = "ContactRefContext";

interface ContactRefProviderProps {
  children: ReactNode;
}

export const ContactRefProvider: React.FC<ContactRefProviderProps> = ({
  children,
}) => {
  const contactRef = useRef<HTMLDivElement>(null);
  return (
    <ContactRefContext.Provider value={contactRef}>
      {children}
    </ContactRefContext.Provider>
  );
};

export const useContactRef = () => {
  const context = useContext(ContactRefContext);
  if (!context) {
    throw new Error("useContactRef must be used within a ContactRefProvider");
  }
  return context;
};
