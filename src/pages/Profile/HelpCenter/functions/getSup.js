import axios from "axios";
import { base_url } from "../../../../constants";

export const getSups = (setPageLoading, setSups) => {
  setPageLoading(true);
  axios
    .get(base_url + "/user/setting/select_call_center.php")
    .then((res) => {
      console.log("res.data.message", res.data.message)
      if (res.data.status == "success") {
        setSups(res.data.message);
      }
    })
    .catch((e) => console.log(e))
    .finally(() => {
      setPageLoading(false);
    });
};
