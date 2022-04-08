const localStorageData = async()=>{
    const locatStorageData = await localStorage.getItem("loginUserData");
    const localStorageObjectData = await JSON.parse(locatStorageData);
    return localStorageObjectData;
}

export {localStorageData}