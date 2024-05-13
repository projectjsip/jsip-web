import axiosClient from "../apiClient";

export function fetchAllSchoolNoPaginate(token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/school?is_paginate=false`, config);
}

export function fetchAllSchool(token, filter, page) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/school?filter=${filter}&is_paginate=true&page=${page}`, config);
}

export function fetchCreateSchool(data, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };

    return axiosClient.post("/school/insert", data, config);
}

export function fetchUpdateSchool(data, token, id) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };

    return axiosClient.post(`/school/${id}/update`, data, config);
}

export function fetchAllSchoolWithFilter(filter) {
    let config = {
        headers: {
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/school?filter=${filter}&is_paginate=false`, config);
}

export function fetchTrackingBySchoolId({ NPSN }) {
    let config = {
        headers: {
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/tracking/${NPSN}`, config);
}

export function fetchStatistic(token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get('/statistic', config);
}
