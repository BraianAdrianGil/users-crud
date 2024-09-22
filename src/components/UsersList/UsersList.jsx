import { toast } from "sonner";
import UserCard from "../UserCard/UserCard";
import "./UsersList.css";
import { deleteUser } from "../../services/deleteUser";

const UsersList = ({ users, loadUsers }) => {
	const handleDeleteUser = async (userId) => {
		await deleteUser({ userId });
		toast.success("Usuario eliminado correctamente");
		await loadUsers();
	};
	return (
		<section className="users__list__container">
			{users.map((user) => (
				<UserCard
					key={user.id}
					user={user}
					handleDeleteUser={handleDeleteUser}
				/>
			))}
		</section>
	);
};

export default UsersList;
