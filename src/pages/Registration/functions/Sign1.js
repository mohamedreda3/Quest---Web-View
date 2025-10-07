import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../../constants";
import { showToogleTooltib } from "../../../store/reducers/tooltibReducer";

export const Sign1 = (
  signData,
  setSignLoading,
  setChangeShow,
  setCode,
  dispatch
) => {
  if (signData.email == "") {
    toast.warn("أدخل بريد إلكترونى");
    return;
  }
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10);
  }
  const data_send = {
    code,
    email: signData.email,
  };

  setSignLoading(true);
  axios
    .post(base_url + "/user/auth/sign_up_new_1.php", JSON.stringify(data_send))
    .then((res) => {
      if (res.data.status == "success") {
        setChangeShow("other");
        setCode(code);
      } else if (res.data.status == "error") {
        toast.error(res.data.message);
        if (dispatch) dispatch(showToogleTooltib());
      } else {
        toast.error("SomgThing Wen Error");
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

export const checkCode = (email, code, navigate, registData, dispatch) => {
  const data_send = {
    code,
    email: email,
  };
  axios
    .post(base_url + "/user/auth/check_code.php", data_send)
    .then((res) => {
      if (res.data.status == "success") {
        navigate('/signup2', { replace: true, state: { registData, code } });
      } else if (res.data.status == "error") {
        toast.error(res.data.message);
        if (dispatch) dispatch(showToogleTooltib());
      } else {
        toast.error("SomgThing Went Error");
        if (dispatch) dispatch(showToogleTooltib());
      }
    })
    .catch((e) => {
      console.log(e);
      if (dispatch) dispatch(showToogleTooltib());
    })
    .finally(() => {});
};
