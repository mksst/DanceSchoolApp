import axios from "axios";

import { URLS } from "../consts";

export const getTeachers = async () => {
  const { data } = await axios.get(URLS.TEACHERS);
  return data;
};

export const getAllUsers = async () => {
  const { data } = await axios.get(URLS.ALLUSERS);
  return data;
};

export const getTrainingTypes = async () => {
  const { data } = await axios.get(URLS.TRAINING_TYPES);
  return data;
};
