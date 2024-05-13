import axiosClient from "../apiClient";

export function fetchGetLandingPage() {
    let config = {
        headers: {
            Accept: "application/json"
        },
    };
    return axiosClient.get('/landing_page', config);
}