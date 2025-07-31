import { useState } from "react";
import { createUser } from "../../services/user/users";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import { MessageError, MessageSuccess } from "../../error/Errors";
import { createBank } from "../../services/bank/banks";


const CreateBank = ({handelAllBanks})=>{
  const [isLoading, setIsLoading] = useState(false)
    const [bankName, setBankName] = useState("")

    const handleCreateBank = async(e)=>{
      try {
      setIsLoading(prev=>true)
        e.preventDefault()
        if(bankName==""){
          throw new Error("invalid bank Name")
        }


        const response = await createBank(bankName)
        console.log(response.data)
        handelAllBanks()
        MessageSuccess("Bank Added")
        return
      } catch (error) {
        MessageError(error.message)
      }finally{
        setIsLoading(prev=>false)
      }
    }

  return (
<>
<Spinner isLoading={isLoading} />
<div className="flex justify-center mt-10">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Create Bank
            </h5>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Bank Name</label>
              <input
              type="text"
              placeholder="myBank"
                onChange={(e) => {
                  setBankName(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              ></input>
            </div>
            <button
          type="button"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleCreateBank}>
          Add Bank
        </button>
          </form>
        </div>
      </div>
    {/* <div className="card mx-auto mt-5 mb-5" style={{ width: "20rem" }}>
    <div className="card-body">
      <h4 className="card-title mt-2">Create Bank</h4>
      <form>
        <div className="form-group mt-2">
          <label>Bank Name</label>
          <input
            onChange={(e) => {
              setBankName(e.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="my Bank"
          ></input>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleCreateBank}>
          Add Bank
        </button>
     </form>
    </div>
  </div> */}
</>
  );
}

export default CreateBank