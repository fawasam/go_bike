import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { BikeContext, UserContext } from "../App";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const RenteePage = () => {
  const navigate = useNavigate();
  let access_token = useContext(UserContext)?.userAuth?.access_token || null;
  const [imageFile, setImageFile] = useState(null);

  let {
    userAuth: { username, email, phone },
    setUserAuth,
  } = useContext(UserContext);

  let { bikesData, setBikesData } = useContext(BikeContext);

  const handleImageUpload = async (img) => {
    if (img.size == 0) {
      toast.error("Missing image ");
    } else {
      var loadingToast = toast.loading("Uploading....");

      console.log(img);
      const formData = new FormData();
      formData.append("image", img);

      console.log(formData);
      await axios
        .post("http://localhost:5000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const url = response.data.imageUrl;
          setImageFile(url);
          console.log("Image URL:", url);
          toast.dismiss(loadingToast);
          toast.success("Uploaded 👍");
        })
        .catch((error) => {
          toast.dismiss(loadingToast);
          toast.error(error);
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleBikeSubmit = async (e) => {
    e.preventDefault();
    let form = new FormData(formElement);
    let formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    if (formData.image) {
      await handleImageUpload(formData.image);
    }
    const newData = { ...formData, image: imageFile };

    await axios
      .post("http://localhost:5000/api/createBike", newData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(({ data }) => {
        setBikesData({ ...bikesData, data });
        toast.success("Successfully Created👍");
        navigate("/bikes");
        console.log(data);
      })
      .catch((response) => {
        toast.error(response.response.data.error);
      });
  };

  return (
    <div className="px-20 pt-20  h-screen w-full">
      <div className="">
        <div>
          <h1 className="text-2xl font-bold text-center">Become A Rentee</h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form id="formElement">
            <div className=" grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Model
                </label>
                <div className="mt-2">
                  <input
                    id="model"
                    name="model"
                    type="text"
                    autoComplete="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Type
                </label>
                <div className="mt-2">
                  <input
                    id="type"
                    name="type"
                    type="text"
                    autoComplete="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <input
                    id="brand"
                    name="brand"
                    type="text"
                    autoComplete="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Year
                </label>
                <div className="mt-2">
                  <input
                    id="year"
                    name="year"
                    type="number"
                    autoComplete="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price/hour
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    autoComplete="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Color
                </label>
                <div className="mt-2">
                  <input
                    id="color"
                    name="color"
                    type="text"
                    autoComplete="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="condition"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Condition
                </label>
                <div className="mt-2">
                  <input
                    id="condition"
                    name="condition"
                    type="text"
                    autoComplete="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    autoComplete="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="available"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Available
                </label>
                <div className="mt-2">
                  <input
                    id="available"
                    name="available"
                    type="text"
                    autoComplete="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="file"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div className="flex items-center w-full mt-4">
              <button
                type="submit"
                className="flex w-full  items-center justify-center rounded-mdt bg-primary-green  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:green_text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleBikeSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RenteePage;
