import React, { useEffect, useState } from 'react';
import { booksData } from './data';
import './books.css';
import Footer from '../../components/Footer/Footer';
import { Axios } from '../../components/axios';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import ContentLoader from 'react-content-loader';
import PDFViewer from './PDFViewer.js';
const Books = () => {
  const [books, setBooks] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const getBooks = () => {
    setBooks(booksData);
    Axios({
      method: 'POST',
      // url: BASE_URL + BASES_ROUTES?.admin + API_ROUTES?.pdf?.BASE_ROUTE + API_ROUTES?.pdf?.ROUTES?.select,
    })
      .then((res) => {
        if (res.status == 'success') {
          // setBooks(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .finally(() => {
        setPageLoading(false);
      });
  };
  useEffect(() => {
    getBooks();
  }, []);
  return (
    <>
      <div className="books_page">
        <div className="books">
          <PDFViewer document={require("./2.pdf")} />
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Books;
