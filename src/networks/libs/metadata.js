import axiosClient from "../apiClient";

export function fetchAllMetadata(token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get('/metadata', config);
}

export function fetchUpdateMetadata(data, token, meta_type) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };

    return axiosClient.post(`/metadata/${meta_type}/update`, data, config);
}