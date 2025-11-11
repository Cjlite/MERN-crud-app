import React, { useEffect, useState } from "react";
import { bookBaseUrl } from "../../exiosEnstance";

const Home = () => {
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
  });
  const [bookList, setBookList] = useState();
  console.log("bookList--", bookList);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getAllBookList = async () => {
    try {
      const { data } = await bookBaseUrl.get("bookLists");
      setBookList(data?.BookList);
      console.log("Booklist", data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    getAllBookList();
  }, []);

  const handleSubmit = async () => {
    try {
      if (
        !bookForm.BookName ||
        !bookForm.BookTitle ||
        !bookForm.Author ||
        !bookForm.SellingPrice
      ) {
        alert("All fields are require!");
      }

      const { data } = await bookBaseUrl.post("addbook", bookForm);
      if (data?.Success) {
        alert(data?.message);
        setBookForm({
          BookName: "",
          BookTitle: "",
          Author: "",
          SellingPrice: "",
        });
      }
      console.log("Book added successfully:", data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("bookform", bookForm);

  return (
    <div className="w-full px-5 min-h[cal(100vh-60px)]">
      <div className="w-full grid grid-cols-5 gap-3 my-4">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Book Name</label>
          <input
            type="text"
            placeholder="Book Name"
            className="w-full border-2 text-gray-800 border-gray-400 rounded-sm outline-none  h-8 px-2"
            name="BookName"
            value={bookForm.BookName}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Book Title</label>
          <input
            type="text"
            placeholder="Book Title"
            className="w-full border-2 text-gray-800 border-gray-400 rounded-sm outline-none  h-8 px-2"
            name="BookTitle"
            value={bookForm.BookTitle}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Author</label>
          <input
            type="text"
            placeholder="Author"
            className="w-full border-2 text-gray-800 border-gray-400 rounded-sm outline-none  h-8 px-2"
            name="Author"
            value={bookForm.Author}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Selling Price</label>
          <input
            type="text"
            placeholder="Selling Price"
            className="w-full border-2 text-gray-800 border-gray-400 rounded-sm outline-none  h-8 px-2"
            name="SellingPrice"
            value={bookForm.SellingPrice}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Publish Date</label>
          <input
            type="date"
            placeholder="Publish Date"
            className="w-full border-2 text-gray-800 border-gray-400 rounded-sm outline-none  h-8 px-2"
            name="PublishDate"
            value={bookForm.PublishDate}
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          className="bg-gray-700 text-white h-9 w-22 rounded-md cursor-pointer"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </div>

      <div className="w-full mt-10">
        <div className="w-full">
          <table className="w-full text-gray-800 divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Name
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Title
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Author
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Selling Price
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Publish Date
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-white divide-y divide-gray-200">
              {bookList?.map((book, index) => (
                <tr className="hover:bg-gray-200" key={index}>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {book.BookName}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {book.BookTitle}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">{book.Author}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {book.SellingPrice}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {book.PublishDate}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">Action</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
