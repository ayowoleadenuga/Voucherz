import {
  API_BASE_URL,
  API_BASE_URL2,
  ACCESS_TOKEN,
  // EMAIL,
  API_BASE_URL3
  // CURRENT_USER
} from "../constants";

const email = localStorage.getItem("currentUser");
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

export function createVoucherUrl(data) {
  console.log(JSON.stringify(data));
  return request({
    url: API_BASE_URL + "/create",
    method: "POST",
    body: JSON.stringify(data)
  });
}
export function updateProfile(data) {
  console.log(JSON.stringify(data));
  return request({
    url: API_BASE_URL2 + "/auth/update/" + email,
    method: "PATCH",
    body: JSON.stringify(data)
  });
}
export function updateVoucher(voucher, date) {
  return request({
    url:
      API_BASE_URL +
      "/update/" +
      voucher +
      "?Merchant=" +
      email +
      "&ExpirationDate=" +
      date,
    method: "PUT"
  });
}
export function requestVoucher() {
  return request({
    url: API_BASE_URL + "/getall?Merchant=" + email,
    method: "Get"
  });
}
export function requestUsers() {
  return request({
    url: API_BASE_URL2 + "/auth/users?name",
    method: "Get"
  });
}
export function requestOtherVoucher(all) {
  return request({
    url: API_BASE_URL + "/getall" + all + "?Merchant=" + email,
    method: "Get"
  });
}
export function activateUser(bool, email) {
  return request({
    url: API_BASE_URL2 + "/auth/status?active=" + bool + "&email=" + email,
    method: "Patch"
  });
}
export function requestEvent() {
  return request({
    url: API_BASE_URL3 + "/audit/events",
    method: "Get"
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
    url: API_BASE_URL + "/" + func + "/" + data + "?Merchant=" + email,
    method: "POST"
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
