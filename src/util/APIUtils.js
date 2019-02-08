import {
  API_BASE_URL,
  API_BASE_URL2,
  POLL_LIST_SIZE,
  ACCESS_TOKEN
} from "../constants";

const request = options => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getAllPolls(page, size) {
  page = page || 0;
  size = size || POLL_LIST_SIZE;

  return request({
    url: API_BASE_URL + "/polls?page=" + page + "&size=" + size,
    method: "GET"
  });
}

export function createVoucherUrl(data) {
  return request({
    url: API_BASE_URL + "/create",
    method: "POST",
    body: JSON.stringify(data)
  });
}
export function requestVoucher() {
  return request({
    url: API_BASE_URL + "/getall?Merchant=Enunwah",
    method: "Get",
    body: ""
  });
}
export function requestVoucher(all) {
  return request({
    url: API_BASE_URL + "/getall" + all + "?Merchant=Enunwah",
    method: "Get",
    body: ""
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL2 + "/auth/signin",
    method: "POST",
    body: JSON.stringify(loginRequest)
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL2 + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest)
  });
}

export function updateDisable(data, func) {
  return request({
    url: API_BASE_URL2 + "/" + func,
    method: "POST",
    body: JSON.stringify(data)
  });
}

export function forgotPassword(forgotPasswordRequest) {
  return request({
    url: API_BASE_URL2 + "/forgot-password/end",
    method: "POST",
    body: JSON.stringify(forgotPasswordRequest)
  });
}

export function checklastnameAvailability(lastname) {
  return request({
    url: API_BASE_URL + "/user/checklastnameAvailability?lastname=" + lastname,
    method: "GET"
  });
}

export function checkEmailAvailability(email) {
  return request({
    url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
    method: "GET"
  });
}

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/auth/user/",
    method: "GET"
  });
}

export function getUserProfile(lastname) {
  return request({
    url: API_BASE_URL + "/users/" + lastname,
    method: "GET"
  });
}
