import { useForm } from "react-hook-form";
import { DelEyeIcon, EyeIcon } from "../Icons/Icons";
import { useState, useEffect } from "react";
import { uploadImage } from "../../services/uploadImage";
import useFormContext from "../../hooks/useFormContext";
import "./FormUser.css";

const emailVerificationPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

const FormUser = ({ onSend }) => {
	const { showForm, initialData, handleShowForm } = useFormContext();
	const [selectedImage, setSelectedImage] = useState(null);
	// React Hook Form
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({});

	const [showPassword, setShowPassword] = useState(false);

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleCloseForm = () => {
		setSelectedImage(null);
		handleShowForm();
		reset({
			first_name: "",
			last_name: "",
			password: "",
			email: "",
			birthday: "",
			image_url: null,
		});
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) setSelectedImage(URL.createObjectURL(file));
	};

	const handleOnSend = async (formData) => {
		const imgFile = formData.image_url?.[0];
		if (imgFile) {
			const resUpload = await uploadImage(imgFile);
			if (resUpload?.secure_url) {
				onSend({ ...formData, image_url: resUpload.secure_url });
				setSelectedImage(null);
				setShowPassword(false);
				return;
			}
		}

		onSend({ ...formData, image_url: formData.image_url ?? null });
		setSelectedImage(null);
		setShowPassword(false);
		reset();
	};

	useEffect(() => {
		reset(initialData);
	}, [initialData, showForm]);

	return (
		<div className={` form__container ${showForm && "show"} `}>
			<form onSubmit={handleSubmit(handleOnSend)} className="form">
				<button
					type="button"
					aria-label="Cerrar formulario"
					onClick={handleCloseForm}
				>
					❌
				</button>

				<h2>{initialData ? "Editar Usuario" : "Crear Usuario"}</h2>
				{/* NAME INPUT================================== */}
				<label className="form__label">
					Nombre
					<input
						className={`${errors.first_name && "error__input"}`}
						type="search"
						{...register("first_name", {
							required: "Nombre requerido",
						})}
						maxLength={25}
					/>
					<p
						className={`${errors.first_name && "active"} error__form__message`}
					>
						{errors?.first_name?.message}
					</p>
				</label>
				{/* LAST NAME INPUT================================== */}
				<label className="form__label">
					Apellidos
					<input
						className={`${errors.last_name && "error__input"}`}
						type="search"
						{...register("last_name", { required: "Apellidos requeridos" })}
					/>
					<p className={`${errors.last_name && "active"} error__form__message`}>
						{errors?.last_name?.message}
					</p>
				</label>
				{/* EMAIL INPUT================================== */}
				<label className="form__label">
					Correo
					<input
						className={`${errors.email && "error__input"}`}
						type="search"
						{...register("email", {
							required: "Email requerido",
							pattern: {
								value: emailVerificationPattern,
								message: "Introduce un email valido",
							},
						})}
					/>
					<p className={`${errors.email && "active"} error__form__message`}>
						{errors?.email?.message}
					</p>
				</label>
				{/* PASSWORD INPUT================================== */}
				<label className="form__label">
					Contraseña
					<div className="input__password__container">
						<input
							className={`${errors.password && "error__input"}`}
							type={`${showPassword ? "text" : "password"}`}
							{...register("password", { required: "Contraseña requerida" })}
							autoComplete="true"
						/>
						<button
							type="button"
							aria-label="Mostrar contraseña"
							onClick={handleShowPassword}
						>
							{showPassword ? <DelEyeIcon /> : <EyeIcon />}
						</button>
					</div>
					<p className={`${errors.password && "active"} error__form__message`}>
						{errors?.password?.message}
					</p>
				</label>
				{/* BIRTHDAY INPUT================================== */}
				<label className="form__label">
					Cumpleaños
					<input
						className={`${errors.birthday && "error__input"}`}
						type="date"
						{...register("birthday", { required: "Ingresa una fecha" })}
					/>
					<p className={`${errors.birthday && "active"} error__form__message`}>
						{errors?.birthday?.message}
					</p>
				</label>
				{/* IMAGE INPUT===================================== */}
				<div className="input__file__container">
					<label className="image__label">
						Selecciona una imagen
						<input
							type="file"
							accept="image/*"
							{...register("image_url")}
							onChange={handleImageChange}
						/>
					</label>
					<div className="img__container">
						{initialData?.image_url && !selectedImage && (
							<img src={initialData?.image_url} alt={initialData.image_url} />
						)}

						{selectedImage && <img src={selectedImage} alt={selectedImage} />}
					</div>
				</div>
				<button className="form__button__submit" type="submit">
					{initialData ? "Guardar Cambios" : "Crear "}
				</button>
			</form>
		</div>
	);
};

export default FormUser;
