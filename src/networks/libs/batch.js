import axiosClient from "../apiClient";

export function fetchAllBatch(token, schoolId, page) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/submission/all/batch?is_paginate=true&page=${page}${schoolId ? `&school_id=${schoolId}` : ''}`, config);
}

export function fetchAllSubmissionByBatchId(token, batchId, page) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/submission/all/${batchId}?is_paginate=true&page=${page}`, config);
}

export function fetchBatchDetail(token, batchId) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/submission/batch/${batchId}`, config);
}