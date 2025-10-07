import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../../constants";
import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";
import { showToogleTooltib } from "../../../store/reducers/tooltibReducer";
export const Sign2 = (
  setSignLoading,
  locData,
  regData2,
  confirmPassword,
  setChangeData,
  selectedGrade,
  dispatch
) => {
  if (regData2.student_name == "") {
    toast.warn("enter Your name");
    return;
  }
  if (regData2.pass == "") {
    toast.warn("enter password");
    return;
  }
  if (confirmPassword !== regData2.pass) {
    toast.warn("Check Password and Password Confirmation");
    return;
  }
  if (regData2.uniuniversity_id == "") {
    toast.warn("Choise University");
    return;
  }
  if (selectedGrade == "") {
    toast.warn("Choise Grade");
    return;
  }
  setSignLoading(true);
  const data_send = {
    email: locData.email,
    ...regData2,
    grade_id: selectedGrade,
  };
  axios
    .post(base_url + "/user/auth/signup_2.php", JSON.stringify(data_send))
    .then((res) => {
      if (res.data.status == "success") {
        setChangeData("login");
        // localStorage.setItem('elmataryApp',JSON.stringify(res.data.message))
        // navigate
        // localStorage.setItem("tryhash",pushedData);
        // localStorage.setItem('elmataryapp',JSON.stringify({first_name:'abdu',last_name:'ali',email:'aa032@gmail.com'}))
      } else if (res.data.status == "error") {
        toast.error(res.data.message);
        if (dispatch) dispatch(showToogleTooltib());
      } else {
        toast.error("Something Went Error");
      }
    })
    .catch((e) => {
      console.log(e);
      if (dispatch) dispatch(showToogleTooltib());
    })
    .finally(() => {
      setSignLoading(false);
    });
};
