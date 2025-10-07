import axios from "axios";
import { base_url } from "../../../constants";
import { showToogleTooltib } from "../../../store/reducers/tooltibReducer";

export const getSupsData = (setPageLoading, setSups, dispatch) => {
  setPageLoading(true);
  axios
    .get(base_url + "/user/setting/select_call_center.php")
    .then((res) => {
      if (res.data.status == "success") {
        setSups(res.data.message);
      } else {
        if (dispatch) showToogleTooltib();
      }
    })
    .catch((e) => console.log(e))
    .finally(() => {
      setPageLoading(false);
    });
};
