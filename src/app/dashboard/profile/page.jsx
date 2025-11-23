"use client";

import React from "react";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";

// ডামি ডেটা (প্রোডাকশনে API থেকে ফেচ করা হবে)
const userProfile = {
  firstName: "Md. Hasibul",
  lastName: "Islam",
  email: "hasibul.islam@example.com",
  phone: "01XXXXXXXXX",
  defaultAddress: "House 12, Road 3, Dhanmondi, Dhaka",
};

const ProfileSettingsPage = () => {
  // প্রোডাকশনে, আপনি ফর্ম স্টেট পরিচালনার জন্য useState এবং ফর্ম সাবমিট হ্যান্ডলিং এর জন্য
  // একটি async ফাংশন ব্যবহার করবেন।
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile data submitted!");
    // এখানে API কল করে ডেটা সেভ করার লজিক যুক্ত হবে।
  };

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 flex items-center mb-6 border-b pb-4">
        <User className="h-7 w-7 mr-3 text-indigo-600" />
        Profile Settings
      </h2>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* নাম (First Name & Last Name) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  defaultValue={userProfile.firstName}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  defaultValue={userProfile.lastName}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
                  required
                />
              </div>
            </div>
          </div>

          {/* ইমেইল (Email) */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 flex items-center"
            >
              <Mail className="h-4 w-4 mr-2 text-gray-500" /> Email Address
              (Cannot be changed)
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={userProfile.email}
                readOnly
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-3 bg-gray-50 text-gray-500 border"
              />
            </div>
          </div>

          {/* ফোন নম্বর (Phone Number) */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 flex items-center"
            >
              <Phone className="h-4 w-4 mr-2 text-gray-500" /> Phone Number
            </label>
            <div className="mt-1">
              <input
                type="tel"
                name="phone"
                id="phone"
                defaultValue={userProfile.phone}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
              />
            </div>
          </div>

          {/* ডিফল্ট এড্রেস (Default Address - Read-only here) */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 flex items-center"
            >
              <MapPin className="h-4 w-4 mr-2 text-gray-500" /> Default Shipping
              Address
            </label>
            <div className="mt-1">
              <textarea
                id="address"
                name="address"
                rows="3"
                defaultValue={userProfile.defaultAddress}
                readOnly
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-3 bg-gray-50 text-gray-500 border"
              />
              <p className="mt-2 text-xs text-gray-500">
                To change the address, please go to the{" "}
                <a
                  href="/dashboard/addresses"
                  className="text-indigo-600 hover:underline"
                >
                  Addresses
                </a>{" "}
                page.
              </p>
            </div>
          </div>

          {/* সেভ বাটন (Save Button) */}
          <div className="pt-5 border-t mt-6">
            <button
              type="submit"
              className="inline-flex justify-center items-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
