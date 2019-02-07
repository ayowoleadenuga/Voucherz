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

export function createVoucherUrl(discountData) {
  return request({
    url: API_BASE_URL2 + "/create",
    method: "POST",
    body: JSON.stringify(discountData)
  });
}

export function castVote(voteData) {
  return request({
    url: API_BASE_URL + "/polls/" + voteData.pollId + "/votes",
    method: "POST",
    body: JSON.stringify(voteData)
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: "POST",
    body: JSON.stringify(loginRequest)
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest)
  });
}

export function forgotPassword(forgotPasswordRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
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

export function getUserCreatedPolls(lastname, page, size) {
  page = page || 0;
  size = size || POLL_LIST_SIZE;

  return request({
    url:
      API_BASE_URL +
      "/users/" +
      lastname +
      "/polls?page=" +
      page +
      "&size=" +
      size,
    method: "GET"
  });
}

export function getUserVotedPolls(lastname, page, size) {
  page = page || 0;
  size = size || POLL_LIST_SIZE;

  return request({
    url:
      API_BASE_URL +
      "/users/" +
      lastname +
      "/votes?page=" +
      page +
      "&size=" +
      size,
    method: "GET"
  });
}
