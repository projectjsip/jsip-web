import axiosClient from "../apiClient";

export function fetchLogin(data) {
    return axiosClient.post("/login", data);
}

export function fetchRegister(data, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return axiosClient.post("/register", data, config);
}

export function fetchUpdateProfile(data, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return axiosClient.post("/user/update", data, config);
}

export function fetchUpdateProfilePassword(data, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return axiosClient.post("/user/update/password", data, config);
}

export function fetchLogout(token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axiosClient.post('/logout', {}, config);
}

export function fetchLoggedUser(token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axiosClient.get('/user', config);
}

export function fetchForgotPassword(data) {
    return axiosClient.post("/forget_password", data);
}

export function fetchChangePassword(data) {
    return axiosClient.post("/change_password", data);
}