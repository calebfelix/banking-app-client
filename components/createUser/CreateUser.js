import { useState } from "react";
import { createUser } from "../../services/user/users";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import { MessageError, MessageSuccess } from "../../error/Errors";


const CreateUser = ({handelAllUsers})=>{
  const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleCreateUser = async(e)=>{
      try {
      setIsLoading(prev=>true)
        e.preventDefault()
        if(name==""){
          throw new Error("invalid name")
        }
        if(age==""){
          throw new Error("invalid age")
        }

        if(gender==""){
          throw new Error("invalid gender")
        }
        if(email==""){
          throw new Error("invalid email")
        }
        if(username==""){
          throw new Error("invalid username")
        }
        if(password==""){
          throw new Error("invalid password")
        }


        const response = await createUser(name,Number(age),gender,email,username,password)
        console.log(response.data)
        handelAllUsers()
        MessageSuccess("user Added")
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
            Create User
            </h5>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
              type="text"
              placeholder="Jon"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Age
              </label>
              <input
              type="number"
              placeholder="20"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
              type="email"
              placeholder="jon@doe.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              ></input>
            </div><div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender
              </label>
            <select
            value={gender}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" style={{borderRadius:"5px"}}
          onChange={(e) => {
            setGender((prev) => e.target.value);
          }}
        >
          <option value="">
          select
          </option>
          <option value="male">
          male
          </option>
          <option value="female" >
          female
          </option>
          <option value="others" >
          others
          </option>
        </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
              type="text"
              placeholder="jon"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
              type="text"
              placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              ></input>
            </div>
            <button
          type="button"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleCreateUser}>
          Add User
        </button>
          </form>
        </div>
      </div>
</>
  );
}

export default CreateUser