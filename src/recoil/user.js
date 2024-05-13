import { atom } from "recoil";

const user = {}
export const userState = atom({
    key: "userState", // unique ID (with respect to other atoms/selectors)
    default: user, // default value (aka initial value)
});

export const isUserLoadingState = atom({
    key: "isUserLoadingState", // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});