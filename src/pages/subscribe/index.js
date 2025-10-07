import React, { useState } from 'react';
import "./style.css";
import axios from 'axios';
import { base_url } from '../../constants';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';
import { handleLogOut } from '../../App';
import { Loader } from 'rsuite';
import { WhatsApp, subscripeIcon } from './svg';
import Modal from './modal';
import { showToogleTooltib } from '../../store/reducers/tooltibReducer';
import { useDispatch } from 'react-redux';
const Subscribe = () => {
  const localData = localStorage.getItem('elmataryapp');
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, '111');
  const dispatch = useDispatch();

  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  const [visible, setVisible] = useState(true);
  const [buyLoading, setBuyLoading] = useState(false);
  const [code, setCode] = useState('');
  const handleBuy = () => {
    if (userData == null) {
      toast.warn('Please Sign First');
      return;
    }
    if (code == '') {
      toast.warn('Enter Code');
      return;
    }
    setBuyLoading(true);
    const data_send = {
      code,
      student_id: userData?.student_id,
      token_value: userData?.token_value
    };
    axios
      .post(
        base_url + "/user/courses/subscribe_by_code.php",
        JSON.stringify(data_send)
      )
      .then(async (res) => {
        if (res.data.status == 'success') {
          toast.success(res.data.message);
          window.location.href = "/MyCourses";
        } else if (res.data.status == 'error') {
          dispatch(showToogleTooltib());
          toast.error(res.data.message);
        } else if (res.data.status == 'out') {
          localStorage.clear();
          await handleLogOut();
          window.location.reload();
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(showToogleTooltib());
      })
      .finally(() => {
        setBuyLoading(false);
      });
  };
  return (
    <div class="subscribe">
      <h1 className={"firstFont firstColor"}>Join Courses With Subscription Code</h1>
      <b class="subscribe__title secondFont" style={{ color: "#ff005c" }}>
        Empower Yourself with Our Cutting-Edge Courses
      </b>
      <b class="subscribe__copy thirdFont firstColor">
        Stay at the forefront of knowledge with our dynamic courses and instant
        updates.
      </b>
      <div
        class="form"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap"
        }}
      >
        <input
          type="number"
          class="form__email"
          placeholder="Enter 14-digit Code"
          maxLength={14}
          max={14}
          onWheel={(e) => e?.target?.blur()}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          class="form__button"
          onClick={() => (buyLoading ? null : handleBuy())}
        >
          {buyLoading ? <Loader size="md" /> : "Join Now"}
        </button>
      </div>

      <p
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "17px",
          marginTop: "auto",
          justifyContent: "center",

          flexWrap: "wrap"
        }}
      >
        <span className='thirdFont firstColor'> If You Don't Have Subscription Code Just Contact With </span>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "5px 14px",
            border: "0.1px solid green",
            cursor: "pointer",
            justifyContent: "center",
            borderRadius: "6px"
          }}
          className="greenHover"
          onClick={() => window.open("https://wa.me/+201008906010", "_blanck")}
          role="button"
        >
          <span style={{ color: "green" }}>+201008906010</span>{" "}
          <a style={{ fontSize: "23px" }} href="https://wa.me/+201008906010">
            {WhatsApp}
          </a>
        </p>
      </p>
      <Modal visible={visible}>
        <span style={{ margin: "0 auto 20px", color: "#ff005c" }}>
          {subscripeIcon}
        </span>
        <h1
          style={{ textAlign: "center", color: "#ff005c" }}
          className={"firstFont"}
        >
          Subscription Instruction!
        </h1>
        <b
          style={{
            textAlign: "center",
            fontSize: "15px",
            width: "70%",
            margin: "auto"
            // color: "darkgrey",
          }}
          className={"thirdFont firstColor"}
        >
          Subscription Code is 14-digit number is used to join all your courses
          - You Need Just One Code
        </b>
        <div style={{ marginTop: "70px", textAlign: "center " }}>
          <p
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "17px",
              marginTop: "auto",
              marginBottom: "0",
              textAlign: "center",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <span className={"secondFont secondColor"}>
              {" "}
              If You Don't Have Subscription Code Just Contact With{" "}
            </span>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px 14px",
                border: "0.1px solid green",
                cursor: "pointer",
                justifyContent: "center",
                borderRadius: "6px"
              }}
              className="greenHover firstFont"
              onClick={() =>
                window.open("https://wa.me/+201008906010", "_blanck")
              }
              role="button"
            >
              <span style={{ color: "green" }} className='firstFont'>+201008906010</span>{" "}
              <a
                style={{ fontSize: "23px" }}
                href="https://wa.me/+201008906010"
              >
                {WhatsApp}
              </a>
            </p>
          </p>
          <p
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "17px",
              marginTop: "auto",
              marginBottom: "0",
              textAlign: "center",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
            className="firstFont firstColor"
          >
            <span> If You already Have A Code </span>

            <button
              className="btn btn-success"
              onClick={() => setVisible(false)}
            >
              Proccess To Subscribe
            </button>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Subscribe;
