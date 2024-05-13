import axiosClient from "../apiClient";

export function fetchGetAllGallery(token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get('/gallery?is_paginate=false', config);
}

export function fetchCreateGallery(data, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json"
        },
    };

    return axiosClient.post("/gallery/insert", data, config);
}

export function fetchDeleteGallery(token, id) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };

    return axiosClient.delete(`/gallery/${id}/delete`, config);
}