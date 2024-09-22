import { useContext } from "react";
import { FormContext } from "../context/FormContext";

const useFormContext = () => {
	const context = useContext(FormContext);

	if (!context) {
		throw new Error("useFormContext debe usarse dentro de un formProvider");
	}

	return context;
};

export default useFormContext;
