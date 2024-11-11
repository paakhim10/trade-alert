// const [formData, setFormData] = useState({
//     fullName: "",
//     phoneNumber: "",
//     companies: [],
//     newsPartners: [],
//     alertPreferences: {
//       types: [],
//       frequency: "",
//     },
//   });

export const validateRegistrationForm = (formData) => {
  let errors = "";
  if (!formData.fullName) {
    errors = "Full Name is required";
  }
  if (!formData.phoneNumber) {
    errors = "Phone Number is required";
  }
  if (!formData.companies.length) {
    errors = "Companies is required";
  }
  if (!formData.newsPartners.length) {
    errors = "News Partners is required";
  }
  if (!formData.alertPreferences.types.length) {
    errors = "Alert Preferences Types is required";
  }
  if (!formData.alertPreferences.frequency) {
    errors = "Alert Preferences Frequency is required";
  }

  //   phone number should of digits and length 10
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(formData.phoneNumber)) {
    errors = "Phone Number should be of 10 digits";
  }
  //   for every company there should be quantity and priority
  formData.companies.forEach((company) => {
    if (!company.quantity) {
      errors = "Quantity is required for all companies";
    }
    if (!company.priority) {
      errors = "Priority is required for all companies";
    }
  });

  return errors;
};
