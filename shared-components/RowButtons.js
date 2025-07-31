import React from "react";

const RowButtons = ({
  handleUpdate,
  handleDelete,
  handleView,
  itemData,
  isUpdateButton,
  isDeleteButton,
  isViewButton,

  isDeposite,
  isWithdraw,
  isTransfer,
  handleDeposite,
  handleWithdraw,
  handleTransfer,
}) => {
  let Blist = [];

  if (isUpdateButton) {
    Blist.push(
      <button
      key={1}
        type="button"
        className="text-white mr-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        style={{ margin: "0.5rem" }}
        onClick={() => {
          handleUpdate(itemData);
        }}
      >
        Update
      </button>
    );
  }
  if (isDeleteButton) {
    Blist.push(
      <button
      key={2}
        type="button"
        className="text-white mr-5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        style={{ margin: "0.5rem" }}
        onClick={() => {
          handleDelete(itemData);
        }}
      >
        Delete
      </button>
    );
  }
  if (isViewButton) {
    Blist.push(
      <button
      key={3}
        type="button"
        className="text-white mr-5 bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
        style={{ margin: "0.5rem" }}
        onClick={() => {
          handleView(itemData);
        }}
      >
        View
      </button>
    );
  }
  if (isDeposite) {
    Blist.push(
      <button
      key={4}
        type="button"
        className="text-white mr-5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        style={{ margin: "0.5rem" }}
        onClick={() => {
          handleDeposite(itemData);
        }}
      >
        Deposite
      </button>
    );
  }
  if (isWithdraw) {
    Blist.push(
      <button
      key={5}
        type="button"
        className="text-white mr-5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        style={{ margin: "0.5rem" }}
        onClick={() => {
          handleWithdraw(itemData);
        }}
      >
        Withdraw
      </button>
    );
  }
  if (isTransfer) {
    Blist.push(
      <button
      key={6}
        type="button"
        className="text-white mr-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        style={{ margin: "0.5rem" }}
        onClick={() => {
          handleTransfer(itemData);
        }}
      >
        Transfer
      </button>
    );
  }

  return (
    <>
      <div>{Blist}</div>
    </>
  );
};

export default RowButtons;
