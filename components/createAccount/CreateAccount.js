import { useEffect, useState } from "react";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import { MessageError, MessageSuccess } from "../../error/Errors";
import { createAccount } from "../../services/account/accounts.js";
import BankList from "./BankList.js";

const CreateAccount = ({ handelAllAccounts }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bankId, setBankId] = useState("");

  const handleCreateAccount = async (d) => {
    try {
      setIsLoading((prev) => true);
      if (bankId == "") {
        throw new Error("invalid bank");
      }

      let userId = localStorage.getItem("id");
      const response = await createAccount(userId, { bankId });
      console.log(response.data);
      handelAllAccounts();
      MessageSuccess("Account Added");
      return;
    } catch (error) {
      MessageError(error.message);
    } finally {
      setIsLoading((prev) => false);
    }
  };

  return (
    <>
      <Spinner isLoading={isLoading} />
      <div className="mx-auto w-[25%]">
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Create Account
              </h5>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select Bank
                </label>
                <BankList setBankId={setBankId} />
              </div>
              <button
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleCreateAccount}
              >
                Add Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
