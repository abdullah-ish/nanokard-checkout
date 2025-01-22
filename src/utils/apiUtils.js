import api from "./api";

// Example utility functions with dynamic headers

const addAuthHeader = (headers) => {
  const token = localStorage.getItem("checkout_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const get = async (url, params = {}, includeToken = true) => {
  try {
    let headers = {};
    if (includeToken) {
      headers = addAuthHeader(headers);
    }
    const response = await api.get(url, {
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postWithJSON = async (url, data, includeToken = true) => {
  let headers = { "Content-Type": "application/json" };
  if (includeToken) {
    headers = addAuthHeader(headers);
  }
  try {
    const response = await api.post(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const postWithMultipart = async (url, data, includeToken = true) => {
  let headers = { "Content-Type": "multipart/form-data" };
  if (includeToken) {
    headers = addAuthHeader(headers);
  }
  try {
    const response = await api.post(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const put = async (url, data, includeToken = true) => {
  let headers = { "Content-Type": "application/json" };
  try {
    if (includeToken) {
      headers = addAuthHeader(headers);
    }
    const response = await api.put(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patch = async (url, data, includeToken = true) => {
  let headers = { "Content-Type": "application/json" };
  try {
    if (includeToken) {
      headers = addAuthHeader(headers);
    }
    const response = await api.patch(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const del = async (url, includeToken = true) => {
  let headers = { "Content-Type": "application/json" };
  try {
    if (includeToken) {
      headers = addAuthHeader(headers);
    }
    const response = await api.delete(url, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};
