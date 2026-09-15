import { useCallback } from "react";
import { toast } from "react-toastify";

const useToast = () => {
    const showToast = useCallback((msg, status = null) => {
        const options = {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
        };

        if (status === "error") {
            toast.error(msg, options);
        } else {
            toast.success(msg, options);
        }
    }, []); // [] garante que a função não é recriada a cada render

    return showToast; // agora sim retorna uma função utilizável
};

export default useToast;