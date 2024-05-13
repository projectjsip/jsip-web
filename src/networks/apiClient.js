import axios from "axios";
const axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-apikey": "3QQ1OehINwG5II51iZ5xtorIQGrCNkI76Q0nTxMqFKIHBWVu8QVALDRN413sskuD9gzvlnNfZZSaYV6FBY4skILRCUakbQ91wy5XtPsWpS4PMw8Jl529XYDO55YSWNKo",
    },
});

export default axiosClient;
