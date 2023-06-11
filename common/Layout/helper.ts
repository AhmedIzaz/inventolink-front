import { toast } from "react-toastify";
import { isTokenExpired } from "../../store/api";

export const setDisplaySize = ({ window, setMediumScreen }) => {
  if (window?.innerWidth > 800) {
    setMediumScreen?.(true);
  } else {
    setMediumScreen?.(false);
  }
  window?.addEventListener("resize", (e: any) => {
    if (e.target.innerWidth > 800) {
      setMediumScreen?.(true);
    } else {
      setMediumScreen?.(false);
    }
  });
};

export const checkIsTokenExpired = ({
  userInformation,
  dispatch,
  setUserInformation,
  router,
  setLoading,
}) => {
  if (userInformation?.token) {
    const tokenExpired = isTokenExpired(userInformation?.token);
    if (tokenExpired) {
      toast.warn("Your session has expired, please login again");
      dispatch?.(setUserInformation?.({}));
      router.push("/auth/login");
    }
  } else {
    router?.push("/auth/login");
    toast.warn("You are not logged in, please login");
  }
  setLoading?.(false);
};
