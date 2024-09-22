import { useState, useEffect } from "react";
import { getUsers } from "./services/getUsers";
import { editUser } from "./services/editUser";
import { createUser } from "./services/createUser";
import { Toaster, toast } from "sonner";
import Header from "./components/Header/Header";
import FormUser from "./components/FormUser/FormUser";
import UsersList from "./components/UsersList/UsersList";
import useFormContext from "./hooks/useFormContext";
import "./App.css";

function App() {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [loadingUsers, setLoadingUsers] = useState(false);
	const { handleShowForm, initialData } = useFormContext();

	const loadUsers = async () => {
		getUsers({
			success: (data) => setUsers(data),
			error: (err) => setError(err),
			loading: (state) => setLoadingUsers(state),
		});
	};

	const handleSend = async (formData) => {
		if (initialData) {
			await editUser({ userId: formData.id, newData: formData });
			toast.success("Usuario Editado");
			await loadUsers();
			handleShowForm();
			return;
		}

		await createUser({ userData: formData });
		toast.success("Usuario creado");
		await loadUsers();
		handleShowForm();
	};

	useEffect(() => {
		loadUsers();
	}, []);

	return (
		<div className="App">
			{/* Toaster sonner */}
			<Toaster
				richColors
				position="top-right"
				expand={true}
				className="sonner"
			/>
			<Header />
			<main>
				<FormUser onSend={handleSend} />

				{loadingUsers && (
					<div className="loader__container">
						<div className="loader" />
					</div>
				)}

				{!loadingUsers && !users.length && <p>No hay ningún usuario</p>}

				{Boolean(users.length) && (
					<UsersList users={users} loadUsers={loadUsers} />
				)}
			</main>
		</div>
	);
}

export default App;
