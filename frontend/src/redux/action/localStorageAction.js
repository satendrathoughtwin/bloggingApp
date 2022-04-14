const setLocalStorageAction = (data) => {
  return {
    type: "SET_LOCAL_STORAGE",
    payload: data,
  };
};

export { setLocalStorageAction };
