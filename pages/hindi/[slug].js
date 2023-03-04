import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  db,
  collection,
  getDocs,
  query,
  orderBy,
  where,
  deleteDoc,
  doc,
} from "../../firebase";

const slug = ({ HindiSubCaption }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { slug } = router.query;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [captionData, setCaptionData] = useState(HindiSubCaption);

  const handelDeleteCaption = async (docId) => {
    const docRef = doc(db, "caption", docId);
    await deleteDoc(docRef);
  };

  const back = () => {
    router.push("/admin-panal");
  };

  return (
    <>
      <Head>
        <title>IG - Admin-Panal</title>
        <meta name="description" content="IG - Admin Panal" />
        <link rel="icon" href="/android-chrome-512x512.png" />
      </Head>

      <div>
        <h1 className="text-fuchsia-600 text-center my-10 lg:text-4xl">
          Hindi {slug} captiondata
        </h1>
        <button
          onClick={back}
          className="bg-violet-600 text-white px-2 py-1 ml-6 rounded-md hover:scale-90 focus:scale-90"
        >
          Back
        </button>
        <div className="flex justify-center px-2 mb-8 lg:px-32 py-2">
          <div className="flex bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-2xl rounded-md w-full ">
            <table className="w-full">
              <tbody className="flex-col">
                <tr className="text-white border-b-2 border-white space-x-1 space-y-1">
                  <th className="border-r-2 text-xs px-1 lg:text-base lg:px-2 py-1">
                    Caption
                  </th>
                  <th className="border-r-2 text-xs px-1 lg:text-base lg:px-2 py-1">
                    Category
                  </th>
                  <th className="border-r-2 text-xs px-1 lg:text-base lg:px-2 py-1">
                    SubCategory
                  </th>
                  <th className="lg:px-2 py-1 text-xs lg:text-base">Delete</th>
                </tr>
                {captionData.map((cdata) => {
                  return (
                    <>
                      <tr key={cdata.docId} className="text-white">
                        <td className="border-r-2 border-t-2 text-xs px-1 lg:text-base lg:px-2 py-1 text-center">
                          {cdata.caption}
                        </td>
                        <td className="border-r-2 border-t-2 text-xs px-1 lg:text-base lg:px-2 py-1 text-center">
                          {cdata.category}
                        </td>
                        <td className="border-r-2 border-t-2 text-xs px-1 lg:text-base lg:px-2 py-1 text-center">
                          {cdata.subCategory}
                        </td>
                        <td className="border-t-2 px-1 lg:px-2 py-3 flex justify-center">
                          <button
                            onClick={() => handelDeleteCaption(cdata.docId)}
                            className="bg-white text-fuchsia-500 text-xs px-1 lg:text-base lg:px-3 py-1 rounded-md focus:scale-90 outline-none lg:hover:scale-90 lg:focus:scale-90"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const data = collection(db, "caption");
  const qec = query(
    data,
    where("category", "==", "Hindi"),
    where("subCategory", "==", `${slug}`),
    orderBy("createdAt", "desc")
  );
  const snapShot = await getDocs(qec);
  const HindiSubCaption = snapShot.docs.map((docSnap) => {
    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      docId: docSnap.id,
    };
  });

  return {
    props: { HindiSubCaption }, // will be passed to the page component as props
  };
}

export default slug;
