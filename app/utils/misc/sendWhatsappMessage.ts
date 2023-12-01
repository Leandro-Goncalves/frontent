export const sendWhatsappMessage = (number: string, message: string) => {
  const url = `https://api.whatsapp.com/send?phone=${number}&text=${message}`;
  window.open(url, "_blank");
};
