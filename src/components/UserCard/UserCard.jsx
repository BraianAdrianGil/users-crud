import { useState } from "react";
import useFormContext from "../../hooks/useFormContext";
import {
	CakeIcon,
	EditIcon,
	EmailIcon,
	PadLockIcon,
	TrashIcon,
} from "../Icons/Icons";
import questionMarkImage from "../../assets/img/question-mark.png";
import "./UserCard.css";

const UserCard = ({ user, handleDeleteUser }) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { handleInitialData } = useFormContext();

	const userBirthday = user.birthday;
	const date = new Date(userBirthday);

	const formatNumber = (number) => number.toString().padStart(2, 0);

	const day = formatNumber(date.getDate() + 1);
	const month = formatNumber(date.getMonth() + 1);
	const year = date.getFullYear();
	const userBirthdayFormatted = `${day}-${month}-${year}`;

	const handleDelete = (id) => {
		setShowDeleteModal(!showDeleteModal);
		handleDeleteUser(id);
	};

	return (
		<article className="card__container">
			<div className="card__item__header__container">
				<span>
					<img src={user.image_url} alt="" />
				</span>
				<h4 className="card__name">{user.first_name}</h4>
			</div>

			<ul className="card__list__container">
				<li className="card__item">
					<span className="card__item__icon__container">
						<EmailIcon />
					</span>
					{user.email}
				</li>
				<li className="card__item">
					<span className="card__item__icon__container">
						<PadLockIcon />
					</span>
					{user.password}
				</li>
				<li className="card__item">
					<span className="card__item__icon__container">
						<CakeIcon />
					</span>
					{userBirthdayFormatted}
				</li>
			</ul>

			<div className="card__buttons__container">
				<button type="button" onClick={() => handleInitialData(user)}>
					<EditIcon />
				</button>
				<button
					type="button"
					onClick={() => setShowDeleteModal(!showDeleteModal)}
				>
					<TrashIcon />
				</button>
			</div>

			{showDeleteModal && (
				<div className="delete__modal">
					<img src={questionMarkImage} alt="Question mark" />
					<p>Estas seguro de eliminar a este usuario ?</p>
					<p>Este cambio es irreversible</p>
					<div className="delete__modal__buttons__container">
						<button type="button" onClick={() => handleDelete(user.id)}>
							Seguro
						</button>
						<button
							type="button"
							onClick={() => setShowDeleteModal(!showDeleteModal)}
						>
							Cancelar
						</button>
					</div>
				</div>
			)}
		</article>
	);
};

export default UserCard;
