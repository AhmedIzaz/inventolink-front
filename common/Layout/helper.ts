import { toast } from "react-toastify";
import { isTokenExpired } from "../../store/api";
import { setPermittedMenus } from "../../store/reducers/configurationSlices/authSlice";
import { getIconForMenu } from "../../utils/iconUtils";

export const setDisplaySize = ({ window, setMediumScreen }) => {
  if (window?.innerWidth > 800) {
    setMediumScreen?.(true);
  } else {
    setMediumScreen?.(false);
  }
  window?.addEventListener("resize", (e: any) => {
    if (e.target.innerWidth > 1024) {
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
      router?.push("/auth/login");
    }
  } else {
    router?.push("/auth/login");
    toast.warn("You are not logged in, please login");
  }
  setLoading?.(false);
};

export const onGetPermittedMenuList = ({
  getUserPermittedMenu,
  userId,
  businessUnitId,
  dispatch,
}) => {
  getUserPermittedMenu?.(
    `/configuration/user/user-permitted-menu?user_id=${
      userId || 0
    }&business_unit_id=${businessUnitId || 0}`,
    (res) => {
      const modifiedUserPermittedMenu = res?.map((item) => ({
        ...item,
        icon: getIconForMenu(item?.label),
      }));
      dispatch(setPermittedMenus(modifiedUserPermittedMenu));
    }
  );
};
