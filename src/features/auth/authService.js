const API_URL = '/api/auth'

const register = async (userData) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`,{
        method: 'post',
        body: userData
    });
    if(response) {
        localStorage.setItem('user',JSON.stringify(response));
    }
    return response;
};

const authService = {
    register
};

export default authService;