import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { supabase } from "@/utils/supabaseClient";

const UserContext = createContext();
const useUserContext = () => useContext(UserContext);

function UserContextProvider({ children }) {
  const [allUserData, setAlluserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userNameRef = useRef(null);
  const userEmailRef = useRef(null);
  const userPhoneRef = useRef(null);
  const userRoleRef = useRef(null);
  const userDescRef = useRef(null);
  const userDobRef = useRef(null);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState(0);
  async function submit(e) {
    e.preventDefault();
    console.log(userDobRef.current.value, "dob");
    console.log("submit");
    if (update) {
      updateUser(id);
    } else {
      insertUser();
    }
  }
  async function insertUser() {
    console.log("inserting");
    const { data, error } = await supabase
      .from("users")
      .insert({
        name: userNameRef.current.value,
        email: userEmailRef.current.value,
        phone: userPhoneRef.current.value,
        dob: userDobRef.current.value,
        description: userDescRef.current.value,
        role: userRoleRef.current.value,
        profile_pic: "",
      })
      .select();
    if (!error) {
      console.log(data);
      setAlluserData((pre) => [...data, ...pre]);
    } else {
      console.error(error.message);
    }
    userNameRef.current.value = "";
    userEmailRef.current.value = "";
    userPhoneRef.current.value = "";
    userDescRef.current.value = "";
    userRoleRef.current.value = "";
    userDobRef.current.value = "";
  }
  async function getData() {
    setLoading(true);
    const { data, error } = await supabase.from("users").select();
    // .eq('phone',9128382255);
    if (!error) {
      console.log(data);
      setAlluserData(data);
      setLoading(false);
    } else {
      console.error(error.message);
    }
  }

  async function deleteUser(id) {
    const { data, error } = await supabase.from("users").delete().eq("id", id);
    if (!error) {
      console.log(data);
      setAlluserData(allUserData.filter((user) => user.id != id));
    } else {
      console.error(error.message);
    }
  }
  function fillForm({ user }) {
    setUpdate(!update);
    userNameRef.current.value = user.name;
    userEmailRef.current.value = user.email;
    userPhoneRef.current.value = user.phone;
    userDobRef.current.value = user.dob;
    userRoleRef.current.value = user.role;
    userDescRef.current.value = user.description;
    setId(user.id);
  }
  async function updateUser(id) {
    console.log("updating");
    const { data, error } = await supabase
      .from("users")
      .update({
        name: userNameRef.current.value,
        email: userEmailRef.current.value,
        phone: userPhoneRef.current.value,
        dob: userDobRef.current.value,
        description: userDescRef.current.value,
        role: userRoleRef.current.value,
        profile_pic: "",
      })
      .eq("id", id);
    if (!error) {
      console.log(data);
      setUpdate(!update);
    } else {
      console.error(error.message);
    }
    const updatedUser = allUserData.map((user) => {
      if (user.id === id) {
        return {
          name: userNameRef.current.value,
          email: userEmailRef.current.value,
          phone: userPhoneRef.current.value,
          description: userDescRef.current.value,
          role: userRoleRef.current.value,
          dob: userDobRef.current.value,
        };
      }

      return user;
    });
    setAlluserData(updatedUser);
    userNameRef.current.value = "";
    userEmailRef.current.value = "";
    userPhoneRef.current.value = "";
    userDescRef.current.value = "";
    userRoleRef.current.value = "";
    userDobRef.current.value = "";
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <UserContext.Provider
      value={{
        allUserData,
        setAlluserData,
        loading,
        setLoading,
        getData,
        submit,
        userNameRef,
        userEmailRef,
        userPhoneRef,
        userRoleRef,
        userDescRef,
        userDobRef,
        deleteUser,
        update,
        setUpdate,
        updateUser,
        fillForm,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider, useUserContext };
