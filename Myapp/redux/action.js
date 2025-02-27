import axios from "axios";
import {
  addTaskFailure,
  addTaskRequest,
  addTaskSuccess,
  deleteTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  forgetPasswordFailure,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  loadUserFailure,
  loadUserRequest,
  loadUserSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
  resetPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  updatePasswordFailure,
  updatePasswordRequest,
  updatePasswordSuccess,
  updateProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  verificationFailure,
  verificationRequest,
  verificationSuccess,
} from "./reducer";

// const serverUrl = "http://192.168.1.100:4000/api/v1";

//const serverUrl = "https://5df7-106-210-99-4.ngrok-free.app/api/v1";

const serverUrl = "https://fd6a-38-137-14-196.ngrok-free.app/api/v1"

//const serverUrl = "http://10.0.2.2:4000/api/v1";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const { data } = await axios.post(
      `${serverUrl}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Add this if you're using cookies for auth
      }
    );

    console.log("Login response:", data); // ✅ Log API response


   // dispatch({ type: 'loginSuccess', payload: data.user });
    //dispatch(loginSuccess(data));

   dispatch(loginSuccess({
    user: data.data.user, 
    message: data.message 
   }))

   // dispatch(loadUser()); 
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${serverUrl}/me`,{
      withCredentials: true, // Add this if you're using cookies for auth
    });

    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFailure(error.response.data.message));
  }
};

export const addTask = (title, description) => async (dispatch) => {
  try {
    dispatch(addTaskRequest());

    console.log("Sending request to:", `${serverUrl}/newTask`);
    console.log("Payload:", { title, description });

    const { data } = await axios.post(
      `${serverUrl}/newTask`,
      {
        title,
        description,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Add this if you're using cookies for auth
      }
    );

    console.log("Response:", data);
    dispatch(addTaskSuccess(data.message));
  } // In action.js, update the catch block:
  catch (error) {
    console.error("Add task error:", error);
    let errorMessage = "Network Error";
    if (error.response) {
      errorMessage = error.response.data.message || "Server Error";
    } else if (error.request) {
      errorMessage = "No response from server";
    }
    dispatch(addTaskFailure(errorMessage));
  }
};


// export const addTask = (title, description) => async (dispatch) => {
//   try {
//     dispatch(addTaskRequest());
//     await axios.post(...); // Send task to backend
//     dispatch(loadUser()); // Refresh user data (including tasks)
//   } catch (error) { 
//     console.error("Add task error:", error);
//     let errorMessage = "Network Error";
//     if (error.response) {
//       errorMessage = error.response.data.message || "Server Error";
//     } else if (error.request) {
//       errorMessage = "No response from server";
//     }
//     dispatch(addTaskFailure(errorMessage));
// //   }
//    }
// };

export const updateTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: "updateTaskRequest" });

    dispatch(updateTaskRequest());

    const { data } = await axios.get(`${serverUrl}/updateTask/${taskId}`,
      { completed }, // Send completion status
      { withCredentials: true }
    );

    dispatch(updateTaskSuccess(data.message));
    dispatch(loadUser()); 
  } catch (error) {
    dispatch(updateTaskFailure(error.response.data.message));
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    dispatch(deleteTaskRequest());

    const { data } = await axios.delete(`${serverUrl}/removeTask/${taskId}`,{ withCredentials: true });
    dispatch(deleteTaskSuccess(data.message));
    dispatch(loadUser());
  } catch (error) {
    dispatch(deleteTaskFailure(error.response.data.message));
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());

    const { data } = await axios.put(`${serverUrl}/updateProfile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(updateProfileSuccess(data.message));
  } catch (error) {
    dispatch(updateProfileFailure(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());

    await axios.get(`${serverUrl}/logout`);
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure(error.response.data.message));
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const { data } = await axios.post(`${serverUrl}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("data", data);
    dispatch(registerSuccess(data.message));
  } catch (error) {
    console.log("error", error);
    dispatch(registerFailure(error.response.data.message));
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch(updatePasswordRequest());

      const { data } = await axios.put(
        `${serverUrl}/updatePassword`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(updatePasswordSuccess(data.message));
    } catch (error) {
      dispatch(updatePasswordFailure(error.response.data.message));
    }
  };

export const verify = (otp) => async (dispatch) => {
  try {
    dispatch(verificationRequest());

    const { data } = await axios.post(
      `${serverUrl}/verify`,
      { otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(verificationSuccess(data.message));
  } catch (error) {
    dispatch(verificationFailure(error.response.data.message));
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgetPasswordRequest());

    const { data } = await axios.post(
      `${serverUrl}/forgetPassword`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(forgetPasswordSuccess(data.message));
  } catch (error) {
    dispatch(forgetPasswordFailure(error.response.data.message));
  }
};

export const resetPassword = (otp, newPassword) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());

    const { data } = await axios.put(
      `${serverUrl}/resetPassword`,
      { otp, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(resetPasswordSuccess(data.message));
  } catch (error) {
    dispatch(resetPasswordFailure(error.response.data.message));
  }
};