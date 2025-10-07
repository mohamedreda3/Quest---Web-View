import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import { booksData } from './booksData';
import "./style.css";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { base_url } from "./../../../constants/index";
import { Loader } from "rsuite";
function Books() {
  const [items, setItems] = useState(null);
  const [booksData, setBooksData] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const fetchMoreData = () => {
    if (items && items?.length) {
      if (items?.length >= booksData?.length) {
        setHasMore(false);
        return;
      }
      // Simulate fetching more data
      setTimeout(() => {
        setItems(
          items?.concat(booksData?.slice(items?.length, items?.length + 10))
        );
      }, 1500);
    }
  };
  const localData = localStorage.getItem("elmataryapp");
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, "111");
  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  const getEbooks = async () => {
    try {
      const books = await fetch(base_url + "/user/books/select_ebooks.php", {
        method: "POST",
        body: JSON.stringify({
          student_id: userData?.student_id,
          token_value: userData?.token_value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const fetchedJSON = await books?.json();
      if (fetchedJSON?.status == "success") {
        console.log(fetchedJSON?.message);
        setBooksData(fetchedJSON?.message);
      } else {
        setBooksData([]);
      }
    } catch (err) {
      setBooksData([]);
      console.log(err);
    }
  };

  useEffect(() => {
    getEbooks();
  }, []);

  useEffect(() => {
    if (booksData && booksData?.length) {
      // alert("Ebooks")
      setItems(booksData);
    }
  }, [booksData]);

  return (
    <div className="rowDiv">
      {!booksData || !items ? (
        <div
          className="div"
          style={{
            width: "min(600px, 100%)",
            minHeight: "40vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <Loader size="lg" />
        </div>
      ) : booksData?.length && items?.length ? (
        <InfiniteScroll
          dataLength={items?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          // endMessage={
          //   <p style={{ textAlign: 'center' }}>
          //     <b>Yay! You have seen it all</b>
          //   </p>
          // }
        >
          <div className="gridDiv">
            {items.map((item, index) => {
              console.log(item);
              return (
                <div className="book" key={index}>
                <img src={require("../../../assets/Matary basic media_20250220_213011_0000.svg")?.default} alt="" />

                  <div className="bookDetailsMulti">
                    <div className="topDetails">
                      <h3 className="firstFont secondColor">{item?.book_title}</h3>
                      {item?.authors && item?.authors?.length ? (
                        <p style={{ color: "var(--main-color)" }}>
                          by DR.Mohammed El-Matary
                        </p>
                      ) : null}
                    </div>
                    {item?.own ? (
                      <div
                           className="firstFont   buyNow"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(
                            "/ebook?id=" +
                              item?.book_id +
                              "&book_title=" +
                              item?.book_title
                          )
                        }
                      >
                        Open
                      </div>
                    ) : (
                      <div
                            className="firstFont   buyNow"
                        onClick={() => navigate("/SubscribeBooks")}
                        style={{ cursor: "pointer" }}
                      >
                        Buy Now
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      ) : (
        <h1>No Data</h1>
      )}
    </div>
  );
}

export default Books;
