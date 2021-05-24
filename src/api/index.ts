import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3001" });

// get requests

export const getStudentAPI = (id: number) => {
  return axiosInstance
    .get(`students/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getStudentsAPI = () => {
  return axiosInstance
    .get(`students`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getCourseAPI = (id: number) => {
  return axiosInstance
    .get(`courses/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getCoursesAPI = () => {
  return axiosInstance
    .get(`courses`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getGroupAPI = (id: number) => {
  return axiosInstance
    .get(`groups/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getGroupsAPI = () => {
  return axiosInstance
    .get(`groups`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// post requests

export const postStudentAPI = (
  firstName: string,
  lastName: string,
  email: string,
  groupId: number,
  phoneNumber: string
) => {
  return axiosInstance
    .post("students", {
      firstName,
      lastName,
      email,
      groupId,
      phoneNumber,
    })
    .then((res) => res.data);
};

export const postCourseAPI = (
  name: string,
  lecturer: string,
  credits: number
) => {
  return axiosInstance
    .post("courses", {
      name,
      lecturer,
      credits,
    })
    .then((res) => res.data);
};

// delete requests

export const deleteStudentAPI = (id: number) => {
  return axiosInstance.delete("students/" + id).then((res) => res.data);
};

export const deleteCourseAPI = (id: number) => {
  return axiosInstance.delete("courses/" + id).then((res) => res.data);
};

// patch requests (similar to put)

export const updateStudentAPI = (id: number, args: any) => {
  return axiosInstance.patch("students/" + id, args).then((res) => res.data);
};

export const updateCourseAPI = (id: number, args: any) => {
  return axiosInstance.patch("courses/" + id, args).then((res) => res.data);
};
