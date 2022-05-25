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
    if(status != 201) {
        throw new Error(result.message);
    }
    if(result) {
        localStorage.setItem('user',JSON.stringify(result));
    }
    return result;
};

const login = async (userData) => {
    if((userData["type"] === 1 && !userData["code"]) && (userData["type"] === 2 && !(userData["email"] && userData["password"]))) {
        throw new Error("AuthError: Please fill in all fields");
    }
    let api_url;
    if(userData["code"]) {
        api_url = process.env.REACT_APP_API_URL + "/api/auth/loginWithCode";
    } else {
        api_url = process.env.REACT_APP_API_URL + "/api/auth/login";
    }
    const response = await fetch(api_url,{
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

const refresh = async (userData) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/refresh`,{
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userData.token}`
        }
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
    refresh,
    logout
};

export default authService;