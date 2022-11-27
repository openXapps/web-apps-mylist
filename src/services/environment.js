
export const env = {
    VERSION: process.env.REACT_APP_VERSION,
    RESET_IDB: process.env.NODE_ENV === 'development' ? true : false,
};