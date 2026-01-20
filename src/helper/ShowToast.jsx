import { toast } from "react-toastify";
import Notify from "../Components/Notify";


export const showToast = (message, type = "info") => {
  toast(<Notify message={message} type={type} />);
}