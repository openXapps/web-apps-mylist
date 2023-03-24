/**
 * https://tacomanator.medium.com/environments-with-create-react-app-7b645312c09d
 * The value of NODE_ENV is set automatically to 
 * development (when using npm start)
 * test        (when using npm test)
 * production  (when using npm build)
 * Thus, from the point of view of create-react-app, 
 * there are only three environments.
 */

export const env = {
    VERSION: process.env.REACT_APP_VERSION,
    RESET_IDB: process.env.NODE_ENV === 'development' ? true : false,
};