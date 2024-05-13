import axiosClient from "../apiClient";

export function fetchApply(data, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json"
        },
    };

    return axiosClient.post("/submission/insert", data, config);
}

export function fetchUpdateApply(data, token, id) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json"
        },
    };

    return axiosClient.post(`/submission/${id}/update`, data, config);
}

export function fetchDeleteApply(token, id) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };

    return axiosClient.delete(`/submission/${id}/delete`, config);
}

export function fetchGetAllSubmission(token, type, page) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/submission/all?type=${type}&is_paginate=true&page=${page}`, config);
}

export function fetchGetSubmission(token, id) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/submission/${id}`, config);
}

export function fetchSendSubmission(token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get('/submission/submit_to_verifier', config);
}

export function fetchHistories(npsn, page) {
    let config = {
        headers: {
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/history?npsn=${npsn}&page=${page}`, config);
}

export function fetchHistory(batchId) {
    let config = {
        headers: {
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/history/${batchId}`, config);
}

export function fetchConfirmReviewStatus(data, token, id) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };

    return axiosClient.post(`/submission/verifier/${id}/confirm_review`, data, config);
}

export function fetchConfirmFundProof(data, token, id) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json"
        },
    };

    return axiosClient.post(`/submission/verifier/${id}/confirm_fund`, data, config);
}

export function fetchProceedFundDistribution(token, batchId) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/submission/verifier/${batchId}/fund_distribution`, config);
}

export function fetchFinishSubmission(token, batchId) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/submission/verifier/${batchId}/finish_submission`, config);
}