import axiosClient from "../apiClient";

export function fetchGetAllJumbotron(token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get('/jumbotron?is_paginate=false', config);
}

export function fetchCreateJumbotron(data, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json"
        },
    };

    return axiosClient.post("/jumbotron/insert", data, config);
}

export function fetchDeleteJumbotron(token, id) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };

    return axiosClient.delete(`/jumbotron/${id}/delete`, config);
}