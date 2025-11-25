"use client";

import React from "react";
import { MapPin, Plus, Edit, Trash2, CheckCircle } from "lucide-react";


const addresses = [
  {
    id: 1,
    name: "Home Address",
    addressLine1: "House 12, Road 3",
    city: "Dhanmondi",
    zip: "1205",
    country: "Bangladesh",
    isDefault: true,
  },
  {
    id: 2,
    name: "Office Address",
    addressLine1: "Apartment 4B, Gulshan Tower",
    city: "Gulshan 1",
    zip: "1212",
    country: "Bangladesh",
    isDefault: false,
  },
];

const AddressesPage = () => {

  const handleEdit = (id) => console.log(`Editing address: ${id}`);
  const handleDelete = (id) => console.log(`Deleting address: ${id}`);
  const handleSetDefault = (id) =>
    console.log(`Setting default address: ${id}`);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
          <MapPin className="h-7 w-7 mr-3 text-indigo-600" />
          My Saved Addresses
        </h2>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
         
          onClick={() => console.log("Open Add Address Modal")}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`p-6 rounded-xl border ${
              address.isDefault
                ? "border-indigo-600 shadow-lg bg-indigo-50"
                : "border-gray-200 shadow-sm bg-white"
            }`}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900">
                {address.name}
              </h3>
              {address.isDefault && (
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-indigo-200 text-indigo-800 rounded-full">
                  <CheckCircle className="h-3 w-3 mr-1" /> Default
                </span>
              )}
            </div>

            <address className="mt-3 text-gray-700 text-sm not-italic space-y-1">
              <p>{address.addressLine1}</p>
              <p>
                {address.city}, {address.zip}
              </p>
              <p>{address.country}</p>
            </address>

            <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-3">
              <button
                onClick={() => handleEdit(address.id)}
                className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                <Edit className="h-4 w-4 mr-1" /> Edit
              </button>
              <button
                onClick={() => handleDelete(address.id)}
                className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </button>
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800"
                >
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed mt-6">
          <p className="text-gray-500">No addresses saved yet.</p>
        </div>
      )}
    </div>
  );
};

export default AddressesPage;
