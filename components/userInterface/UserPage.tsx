import { useEffect, useContext } from "react";
import { Items } from "../body/Items";
import { UserHeader } from "./UserHeader";
import { DataContext } from "../../src/App";

export const UserPage = () => {
  const context = useContext(DataContext);
  if (!context) {
    return null;
  }
  const { setUserOn } = context;
  useEffect(() => {
    const userLocalData = localStorage.getItem("auth");
    if (userLocalData) {
      const parsed = JSON.parse(userLocalData);
      setUserOn({ ...parsed });
    }
  }, []);

  return (
    <div className="overflow-hidden h-[100vh] flex flex-col gap-10">
      <UserHeader />
      <Items />
    </div>
  );
};
