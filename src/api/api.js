

export const api = "http://localhost:6060"
const getTokenFromLocalStorage = localStorage.getItem("customer")
? JSON.parse(localStorage.getItem("customer")) : null;

export const config = {
    headers : {
        Authorization:`Bearer ${
             localStorage.token && localStorage.token
        }`,
        Accept: "application/json"
    }
}

export const adminConfig = {
    headers : {
        Authorization:`Bearer ${
             localStorage.admin && localStorage.admin
        }`,
        Accept: "application/json"
    }
}

// Authorization:`Bearer ${
//     getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
// }`