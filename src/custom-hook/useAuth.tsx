import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Note: Capitalized import

const useAuth = () => {
  const isLogin = Cookies.get("isLogin") === "true";

  return isLogin;
};

export default useAuth;
