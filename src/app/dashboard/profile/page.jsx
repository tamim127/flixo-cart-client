"use client";

import React from "react";
import { User, Mail, Phone, MapPin, CalendarCheck } from "lucide-react";
import { useUser } from "@/Context/UserContext";

export default function UserProfile() {
  const { user } = useUser();

  if (!user) return <p className="text-center py-20">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="relative h-64 w-full bg-gray-200">
        {user.coverPhoto ? (
          <img
            src={user.coverPhoto}
            alt="Cover Photo"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
            No Cover Photo
          </div>
        )}
      </div>

      {/* Profile Avatar and Name */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-20 flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center space-x-4 sm:space-x-6 relative">
            <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 border-white overflow-hidden shadow-lg">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.firstName + " " + user.lastName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-bold text-3xl">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </div>
              )}
            </div>
            <div className="mt-4 sm:mt-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
                {user?.displayName}
              </h1>
              {user.role && (
                <p className="text-gray-500 text-sm sm:text-base mt-1">
                  {user.role}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 sm:mt-0">
            <button className="px-5 py-2 sm:px-6 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Email */}
          <div className="bg-white p-3 sm:p-6 rounded-xl shadow flex items-center space-x-4">
            <Mail className="w-6 h-6 text-indigo-600 flex-shrink-0" />
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="text-gray-900 font-medium ">
                {user.email}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow flex items-center space-x-4">
            <Phone className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <p className="text-gray-900 font-medium">
                {user.phone || "Not Provided"}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow flex items-center space-x-4">
            <MapPin className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-gray-500 text-sm">Address</p>
              <p className="text-gray-900 font-medium break-words">
                {user.defaultAddress || "Not Provided"}
              </p>
            </div>
          </div>

          {/* Joined */}
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow flex items-center space-x-4">
            <CalendarCheck className="w-6 h-6 text-purple-600 flex-shrink-0" />
            <div>
              <p className="text-gray-500 text-sm">Joined</p>
              <p className="text-gray-900 font-medium">
                {user.joinedDate || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
