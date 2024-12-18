import React from "react";
import ContactForm from "../features/Contact/components/ContactForm";

const Contact: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-0">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
