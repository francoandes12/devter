export const getElementsFiltered = (devits, userName = "") => {
  if (userName === "") {
    return [];
  }
  userName = userName.toLocaleLowerCase();
  return devits.filter((dev) =>
    dev.userName.toLocaleLowerCase().includes(userName)
  );
};
