import axiosClient from "../apiClient";

export function fetchAllUser(token, searchKeyword, page) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/user/all?filter=${searchKeyword}&is_paginate=true&page=${page}`, config);
}

export function fetchDeleteUser(token, id) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };

    return axiosClient.delete(`/user/delete/${id}`, config);
}