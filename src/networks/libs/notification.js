import axiosClient from "../apiClient";

export function fetchAllNotification(token, page, per_page) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return axiosClient.get(`/user/notification?page=${page}&per_page=${per_page}`, config);
}

export function fetchReadNotification(token, notificationId) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };

    return axiosClient.post(`/user/notification/read/${notificationId}`, {}, config);
}