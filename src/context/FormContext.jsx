import { useState, createContext } from "react";

//Creamos el contexto
export const FormContext = createContext();

//Proveedor del contexto
export const FormProvider = ({ children }) => {
	const [initialData, setInitialData] = useState(null);
	const [showForm, setShowForm] = useState(false);

	const handleShowForm = () => {
		setShowForm(!showForm);
		setInitialData(null);
	};

	const handleInitialData = (newUserData) => {
		setShowForm(!showForm);
		setInitialData(newUserData);
	};

	return (
		<FormContext.Provider
			value={{ initialData, showForm, handleInitialData, handleShowForm }}
		>
			{children}
		</FormContext.Provider>
	);
};
