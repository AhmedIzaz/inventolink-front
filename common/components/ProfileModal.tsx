import { EditOutlined } from "@ant-design/icons";
import { Image } from "antd";
import {
  setAuthSlice,
  setUserInformation,
} from "../../store/reducers/configurationSlices/authSlice";
import { useAppDispatch } from "../../store/store";
import CommonButton from "./CommonButton";
import Axios from "axios";

const ProfileComponent = ({ employeeInformation, onClose }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="container mt-4">
        <div className="flex place-content-center justify-start">
          <Image
            className="rounded-full"
            width={50}
            height={50}
            src={
              employeeInformation?.profile_picture_id
                ? ``
                : `https://www.w3schools.com/howto/img_avatar.png`
            }
          />
          <div className="ml-2">
            <h3 className=" text-lg">{employeeInformation?.employee_name}</h3>
            <p>{employeeInformation?.designation?.designation_name || "N/A"}</p>
          </div>
          <div className="flex-1">
            <CommonButton
              className="py-0 px-1 rounded-full float-right"
              type="ghost"
            >
              <EditOutlined className="text-xl text-slate-400" />
            </CommonButton>
          </div>
        </div>
        <CommonButton
          className="w-full mt-4"
          type="primary"
          danger
          onClick={() => {
            dispatch(setUserInformation({}));
            dispatch(setAuthSlice({}));
            Axios.defaults.headers.head.Authorization = "";
            onClose?.();
          }}
        >
          Sign Out
        </CommonButton>
      </div>
    </>
  );
};

export default ProfileComponent;
