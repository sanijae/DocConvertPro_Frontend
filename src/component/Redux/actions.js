import base_url from '../../Assets/API/Axios';

export const register = (userData) => async (dispatch) => {
  try {
    const res = await base_url.post('/register', userData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'REGISTER_FAIL' });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const res = await base_url.post('/login', userData);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'LOGIN_FAIL' });
  }
};

export const getUserById = async (userId) => {
    console.log(userId);
    try {
      const response = await base_url.get(`/user/${userId}`);
      console.log(response);
      return response.data; 
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };
  