import React, { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useNavigate,
  redirect,
} from "react-router-dom";
import PageTitle from "./PageTitle";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout, selectUser } from "../store/auth-slice";

export default function Profile() {
  const user = useSelector(selectUser);
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState(user || {});

  useEffect(() => {
    if (actionData?.success) {
      if (actionData.profileData.emailUpdated) {
        sessionStorage.setItem("skipRedirectPath", "true");
        dispatch(logout());
        toast.success("Logged out successfully! Login again with updated email");
        navigate("/login");
      } else {
        toast.success("Your Profile details are saved successfully!");
        setProfileData(actionData.profileData);
        // Update Redux
        if (actionData.profileData) {
          const updatedUser = {
            ...profileData,
            ...actionData.profileData,
          };
          dispatch(
            loginSuccess({
              jwtToken: localStorage.getItem("jwtToken"),
              user: updatedUser,
            })
          );
        }
      }
    }
  }, [actionData]);

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const h2Style =
    "block text-2xl font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";

  return (
    <div className="max-w-[1152px] min-h-[852px] mx-auto px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
      <PageTitle title="My Profile" />
      <Form method="PUT" className="space-y-6 max-w-[768px] mx-auto">
        <div>
          <h2 className={h2Style}>Personal Details</h2>
          <label htmlFor="name" className={labelStyle}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            className={textFieldStyle}
            value={profileData.name}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            minLength={5}
            maxLength={30}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, email: e.target.value }))
              }
              className={textFieldStyle}
              required
            />
          </div>

          <div>
            <label htmlFor="mobileNumber" className={labelStyle}>
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              required
              pattern="^\d{10}$"
              value={profileData.mobileNumber}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  mobileNumber: e.target.value,
                }))
              }
              placeholder="Your Mobile Number"
              className={textFieldStyle}
            />
          </div>
        </div>

        <div>
          <h2 className={h2Style}>Address Details</h2>
          <label htmlFor="street" className={labelStyle}>
            Street
          </label>
          <input
            id="street"
            name="street"
            type="text"
            value={profileData.address?.street}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  street: e.target.value,
                },
              }))
            }
            className={textFieldStyle}
            required
            minLength={5}
            maxLength={30}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="city" className={labelStyle}>
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={profileData.address?.city}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    city: e.target.value,
                  },
                }))
              }
              className={textFieldStyle}
              required
            />
          </div>

          <div>
            <label htmlFor="state" className={labelStyle}>
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              value={profileData.address?.state}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    state: e.target.value,
                  },
                }))
              }
              className={textFieldStyle}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="postalCode" className={labelStyle}>
              Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              value={profileData.address?.postalCode}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    postalCode: e.target.value,
                  },
                }))
              }
              className={textFieldStyle}
              required
              pattern="^\d{5}$"
            />
          </div>

          <div>
            <label htmlFor="country" className={labelStyle}>
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              value={profileData.address?.country}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    country: e.target.value,
                  },
                }))
              }
              className={textFieldStyle}
              required
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 mt-8 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </Form>
    </div>
  );
}

// 模拟从 localStorage 读取用户数据
export async function profileLoader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) throw redirect("/login");
  return user;
}

// 模拟 profile 更新逻辑（模拟返回新 profileData）
export async function profileAction({ request }) {
  const formData = await request.formData();

  const profileData = {
    name: formData.get("name"),
    email: formData.get("email"),
    mobileNumber: formData.get("mobileNumber"),
    address: {
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      postalCode: formData.get("postalCode"),
      country: formData.get("country"),
    },
  };

  // 模拟用户是否更改了 email
  const emailUpdated = formData.get("email") !== JSON.parse(localStorage.getItem("user"))?.email;

  // 更新 localStorage
  localStorage.setItem("user", JSON.stringify(profileData));

  return {
    success: true,
    profileData: {
      ...profileData,
      emailUpdated,
    },
  };
}