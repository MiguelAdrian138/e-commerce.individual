
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]{5,}$/;
  return nameRegex.test(name);
};

export const validateAddress = (address: string): boolean => {
  return address.length >= 4;
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{9,}$/;
  return phoneRegex.test(phone);
};
