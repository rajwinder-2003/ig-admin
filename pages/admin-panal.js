import React, { useState } from "react";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";
import { v4 as uuid4 } from "uuid";
import {
  signOut,
  auth,
  db,
  addDoc,
  collection,
  serverTimestamp,
} from "../firebase";
import { useRouter } from "next/router";
import Head from "next/head";

const AdminPanel = () => {
  const router = useRouter();
  const [showHome, setShowHome] = useState(false);
  const [showAddCaption, setShowAddCaption] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEnglishSub, setShowEnglishSub] = useState(false);
  const [showHindiSub, setShowHindiSub] = useState(false);
  const [showPunjabiSub, setShowPunjabiSub] = useState(false);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [caption, setCaption] = useState("");

  const handelHome = () => {
    setShowHome(!showHome);
    setShowAddCaption((showAddCaption = false));
    setShowDelete((showDelete = false));
  };

  const handelAddCaption = () => {
    setShowAddCaption(!showAddCaption);
    setShowHome((showHome = false));
    setShowDelete((showDelete = false));
  };

  const handelDelete = () => {
    setShowDelete(!showDelete);
    setShowHome((showHome = false));
    setShowAddCaption((showAddCaption = false));
  };

  const handelLogout = async () => {
    await Cookies.remove("token", { path: "/" });
    await signOut(auth);
    router.push("/");
  };

  const AddCaption = async () => {
    try {
      await addDoc(collection(db, "caption"), {
        category,
        subCategory,
        caption,
        id: uuid4(),
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      alert(err);
    }
    await alert("Sucessfully add");
    await setCategory((category = "")),
      setSubCategory((subCategory = "")),
      setCaption((caption = ""));
  };

  const handelPost = (e) => {
    e.preventDefault();
    AddCaption();
  };

  const navigate = () => {
    router.push(filter);
  };

  return (
    <>
      <Head>
        <title>IG - Admin-Panal</title>
        <meta name="description" content="IG - Admin Panal" />
        <link rel="icon" href="/android-chrome-512x512.png" />
      </Head>
      
      <div className="">
        <div className="flex justify-center mx-2 my-10 lg:mx-8">
          <nav className="space-y-14">
            <h1 className="text-center text-4xl md:text-5xl text-fuchsia-500 lg:text-6xl shadow-transparent">
              IGCaption!
            </h1>
            <ul className="flex space-x-4 md:space-x-14 lg:space-x-32">
              <li
                onClick={handelHome}
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-2xl md:text-2xl lg:text-2xl text-white px-2 py-1 md:px-8 md:py-4 lg:px-14 lg:py-6 rounded-lg hover:cursor-pointer lg:hover:scale-150 lg:focus:scale-105"
              >
                Home
              </li>
              <li
                onClick={handelAddCaption}
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-2xl md:text-2xl lg:text-2xl text-white px-2 py-1 md:px-8 md:py-4 lg:px-14 lg:py-6 rounded-lg hover:cursor-pointer lg:hover:scale-150 lg:focus:scale-105"
              >
                Add Caption
              </li>
              <li
                onClick={handelDelete}
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-2xl md:text-2xl lg:text-2xl text-white px-2 py-1 md:px-8 md:py-4 lg:px-14 lg:py-6 rounded-lg hover:cursor-pointer lg:hover:scale-150 lg:focus:scale-105"
              >
                Delete Caption
              </li>
            </ul>
            <div>
              <button
                onClick={handelLogout}
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-2xl md:text-2xl lg:text-2xl text-white px-2 py-1 md:px-8 md:py-4 lg:px-14 lg:py-6 rounded-lg hover:cursor-pointer lg:hover:scale-150 lg:focus:scale-105"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>

        <div
          className={
            showHome ? "flex justify-center py-16 mx-2 lg:mx-10" : "hidden"
          }
        >
          <div className="space-y-4">
            <h1 className="text-center text-xl md:text-2xl lg:text-3xl">
              IGCaption - Admin panal for Add instagram caption
            </h1>
            <p className="text-center  text-xl md:text-2xl lg:text-xl">
              IGCaption - controlPanal
            </p>
            <div className="justify-center flex">
              <button
                onClick={handelAddCaption}
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-2xl rounded-md px-6 py-3 mt-2 hover:scale-90 focus:scale-90 outline-none text-white"
              >
                Get Start
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            showAddCaption ? "flex justify-center mx-1 lg:mx-10 py-8" : "hidden"
          }
        >
          <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-2xl h-fit px-5 py-10 md:px-8 md:py-14 my-auto lg:px-12 lg:py-16 w-fit rounded-md flex-col">
            <h1 className=" text-3xl lg:text-6xl text-white text-center">
              Add Caption
            </h1>
            <div className="flex justify-center">
              <form className="justify-center mt-5 lg:mt-14" action="">
                <div className="space-y-8">
                  <div>
                    <select
                      value={category}
                      className="appearance-none outline-violet-600 px-2 py-1 w-48 rounded-lg lg:w-60 md:w-52 h-10 lg:hover:scale-x-110 hover:cursor-pointer lg:focus:scale-x-110 flex"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Category Select</option>
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Punjabi</option>
                    </select>
                  </div>
                  <div>
                    <select
                      value={subCategory}
                      className="appearance-none outline-violet-600 px-2 py-1 w-48 rounded-lg lg:w-60 md:w-52 h-10 lg:hover:scale-x-110 hover:cursor-pointer lg:focus:scale-x-110 flex"
                      onChange={(e) => setSubCategory(e.target.value)}
                    >
                      <option>SubCategory Select</option>
                      <option>love</option>
                      <option>sad</option>
                      <option>alone</option>
                      <option>breakup</option>
                      <option>attitude</option>
                      <option>friends</option>
                      <option>funny</option>
                      <option>motivational</option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      value={caption}
                      className="appearance-none outline-violet-600 px-2 py-1 w-48 h-24 rounded-lg lg:w-60 md:w-52 lg:hover:scale-x-110 lg:focus:scale-x-110 flex"
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Caption"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-7">
                  <button
                    onClick={handelPost}
                    className=" outline-none bg-white rounded-md px-4 py-1 border-2 border-violet-600 hover:scale-95 focus:scale-95 text-violet-600"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className={
            showDelete ? "flex justify-center mx-2 my-10 lg:mx-8" : "hidden"
          }
        >
          <nav className="space-y-14">
            <h1 className="text-center text-4xl md:text-5xl text-fuchsia-500 lg:text-6xl shadow-transparent">
              Select category
            </h1>
            <ul className="flex space-x-4 md:space-x-14 lg:space-x-32">
              <li
                onClick={() => setShowEnglishSub(!showEnglishSub)}
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-2xl md:text-2xl lg:text-2xl text-white px-2 py-1 md:px-8 md:py-4 lg:px-14 lg:py-6 rounded-lg hover:cursor-pointer lg:hover:scale-150 lg:focus:scale-105"
              >
                English
              </li>
              <li
                onClick={() => setShowHindiSub(!showHindiSub)}
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-2xl md:text-2xl lg:text-2xl text-white px-2 py-1 md:px-8 md:py-4 lg:px-14 lg:py-6 rounded-lg hover:cursor-pointer lg:hover:scale-150 lg:focus:scale-105"
              >
                Hindi
              </li>
              <li
                onClick={() => setShowPunjabiSub(!showPunjabiSub)}
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-2xl md:text-2xl lg:text-2xl text-white px-2 py-1 md:px-8 md:py-4 lg:px-14 lg:py-6 rounded-lg hover:cursor-pointer lg:hover:scale-150 lg:focus:scale-105"
              >
                Punjabi
              </li>
            </ul>
          </nav>
        </div>

        <div
          className={
            showEnglishSub ? "flex justify-center mx-2 my-10 lg:mx-8" : "hidden"
          }
        >
          <select
            value={filter}
            className="appearance-none outline-violet-600 border-2 border-violet-600 px-2 py-1 w-48 rounded-lg lg:w-60 md:w-52 h-10 lg:hover:scale-x-110 hover:cursor-pointer lg:focus:scale-x-110 flex"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>SubCategory Select</option>
            <option>/english/love</option>
            <option>/english/sad</option>
            <option>/english/alone</option>
            <option>/english/breakup</option>
            <option>/english/attitude</option>
            <option>/english/friends</option>
            <option>/english/funny</option>
            <option>/english/motivational</option>
          </select>
          <button
            onClick={navigate}
            className="bg-violet-600 text-white px-2 py-1 ml-6 rounded-md hover:scale-90 focus:scale-90"
          >
            SUBMIT
          </button>
        </div>

        <div
          className={
            showHindiSub ? "flex justify-center mx-2 my-10 lg:mx-8" : "hidden"
          }
        >
          <select
            value={filter}
            className="appearance-none outline-violet-600 border-2 border-violet-600 px-2 py-1 w-48 rounded-lg lg:w-60 md:w-52 h-10 lg:hover:scale-x-110 hover:cursor-pointer lg:focus:scale-x-110 flex"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>SubCategory Select</option>
            <option>/hindi/love</option>
            <option>/hindi/sad</option>
            <option>/hindi/alone</option>
            <option>/hindi/breakup</option>
            <option>/hindi/attitude</option>
            <option>/hindi/friends</option>
            <option>/hindi/funny</option>
            <option>/hindi/motivational</option>
          </select>
          <button
            onClick={navigate}
            className="bg-violet-600 text-white px-2 py-1 ml-6 rounded-md hover:scale-90 focus:scale-90"
          >
            SUBMIT
          </button>
        </div>

        <div
          className={
            showPunjabiSub ? "flex justify-center mx-2 my-10 lg:mx-8" : "hidden"
          }
        >
          <select
            value={filter}
            className="appearance-none outline-violet-600 border-2 border-violet-600 px-2 py-1 w-48 rounded-lg lg:w-60 md:w-52 h-10 lg:hover:scale-x-110 hover:cursor-pointer lg:focus:scale-x-110 flex"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>SubCategory Select</option>
            <option>/punjabi/love</option>
            <option>/punjabi/sad</option>
            <option>/punjabi/alone</option>
            <option>/punjabi/breakup</option>
            <option>/punjabi/attitude</option>
            <option>/punjabi/friends</option>
            <option>/punjabi/funny</option>
            <option>/punjabi/motivational</option>
          </select>
          <button
            onClick={navigate}
            className="bg-violet-600 text-white px-2 py-1 ml-6 rounded-md hover:scale-90 focus:scale-90"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/" });
    res.end();
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default AdminPanel;
