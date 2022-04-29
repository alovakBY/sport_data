export const parseWebSocketsData = (respone) => {
  if (respone.data.startsWith("42")) {
    const arrayDataParse = JSON.parse(respone.data.substr(2));
    const data = arrayDataParse[1];
    return data.events;
  }
};
