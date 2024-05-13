import axiosClient from "../apiClient";

export function fetchGetAllGoverment(token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get('/regent', config);
}

export function fetchGetGoverment(token, id) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/regent/${id}`, config);
}

export function fetchCreateUpdateRegent(data, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json"
        },
    };

    return axiosClient.post("/regent/create_or_update", data, config);
}

