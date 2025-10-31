import { toast, Bounce, Slide } from "react-toastify"; 

const isMobile = window.innerWidth < 768;

const options = {
  position: isMobile ? "top-center" : "top-right",
  hideProgressBar: true,
  autoClose: 500,
  closeOnClick: true,
  progress: undefined,
  pauseOnHover: true,
  draggable: true,
  transition: isMobile ? Bounce : Slide,
} as const;
 
export const useToast = () => {
  return {
    success: (msg: string) => toast.success(msg, options),
    error: (msg:string) => toast.error(msg, options),
    info: (msg:string) => toast.info(msg, options),
    warning: (msg: string) => toast.warning(msg, options)
  };
};
