"use client";

import React from "react";
import { Settings, Lock, Bell, Trash2, Save } from "lucide-react";

const AccountSettingsPage = () => {
 
  const handlePasswordChange = (e) => {
    e.preventDefault();
    console.log("Password change form submitted!");
 
  };

  const handleNotificationToggle = (e) => {
    console.log(`Email Notifications: ${e.target.checked}`);

  };

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 flex items-center mb-6 border-b pb-4">
        <Settings className="h-7 w-7 mr-3 text-indigo-600" />
        Account Settings
      </h2>

      {/* --- Password Change Section --- */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-4 pb-2 border-b">
          <Lock className="h-5 w-5 mr-2 text-indigo-500" /> Change Password
        </h3>
        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
            >
              <Save className="h-5 w-5 mr-2" />
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* --- Notification Settings Section --- */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-4 pb-2 border-b">
          <Bell className="h-5 w-5 mr-2 text-indigo-500" /> Notification
          Preferences
        </h3>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-medium text-gray-700">
            Receive email notifications for order status updates.
          </span>
          <label
            htmlFor="emailNotifications"
            className="relative inline-flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id="emailNotifications"
              defaultChecked
              onChange={handleNotificationToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>

      {/* --- Delete Account Section --- */}
      <div className="bg-red-50 border border-red-200 p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold text-red-800 flex items-center mb-4 pb-2 border-b border-red-200">
          <Trash2 className="h-5 w-5 mr-2" /> Danger Zone
        </h3>
        <p className="text-sm text-red-700 mb-4">
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>
        <button
          className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition duration-150"
          onClick={() =>
            confirm("Are you sure you want to delete your account?")
          }
        >
          Deactivate Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
