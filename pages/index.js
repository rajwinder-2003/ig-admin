import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";
import { signInWithEmailAndPassword, auth } from "../firebase";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSingnUp = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      if (user) {
        Cookies.set("token", user.accessToken);
      } else {
        return;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    if (Cookies.get("token")) {
      router.push("/admin-panal");
    } else {
      router.push("/");
    }
  };

  const handelAdminLogin = (e) => {
    e.preventDefault();
    handleSingnUp();
  };

  return (
    <div>
      <Head>
        <title>IG - Admin-Panal</title>
        <meta name="description" content="IG - Admin Panal" />
        <link rel="icon" href="/android-chrome-512x512.png" />
      </Head>

      <main className="py-[4rem] lg:py-[6rem] flex justify-center">
        <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-2xl h-fit px-5 py-10 md:px-8 md:py-14 my-auto lg:px-12 lg:py-16 w-fit rounded-md flex-col">
          <h1 className=" text-3xl lg:text-6xl text-white text-center">
            Admin Panel !
          </h1>
          <div className="flex justify-center">
            <form className="justify-center mt-5 lg:mt-14">
              <div className="space-y-8">
                <div>
                  <input
                    value={email}
                    className="appearance-none outline-violet-600 px-2 py-1 rounded-lg lg:w-60 md:w-52 h-10 lg:hover:scale-x-110 lg:focus:scale-x-110 flex"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    value={password}
                    className="appearance-none outline-violet-600 px-2 py-1 rounded-lg lg:w-60 md:w-52 h-10 lg:hover:scale-x-110 lg:focus:scale-x-110 flex"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-7">
                <button
                  onClick={handelAdminLogin}
                  className=" outline-none bg-white rounded-md px-4 py-1 border-2 border-violet-600 hover:scale-95 focus:scale-95 text-violet-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
