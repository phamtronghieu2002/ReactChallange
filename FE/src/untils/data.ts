export const getPhoneNumber = (data: {
  countryCode: string;
  phoneNumber: string;
  areaCode: string;
}) => {
  return `${data.countryCode}${data.areaCode}${data.phoneNumber}`;
};



