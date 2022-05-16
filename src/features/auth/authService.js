const register = async (userData) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`,{
        method: 'post',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    const status = response.status;
    const result = await response.json();
    if(status != 200) {
        throw new Error(result.message);
    }
    if(result) {
        localStorage.setItem('user',JSON.stringify(result));
    }
    return result;
};

const login = async (userData) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`,{
        method: 'post',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
    const status = response.status;
    const result = await response.json();
    if(status != 200) {
        throw new Error(result.message);
    }
    if(result) {
        localStorage.setItem('user',JSON.stringify(result));
    }
    return result;
};

const logout = async () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout
};

export default authService;