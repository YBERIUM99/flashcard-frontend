import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import "../src/index.css"
import { useContext, useState } from "react"
import { authContext } from "../src/contexts/AuthContext"

const departments = ["Software engineering", "Data science", "Graphic design", "Ui/Ux", "Cyber Security", "Data analysis"]

const signUpSchema = yup.object({
    email: yup.string().email("Enter a valid email").required("Email is required"),
    password: yup.string().required("Password is required").min(6, "Password cannot be less than 6 characters"),
})

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const { login, logingIn } = useContext(authContext)
    const [showPassword, setShowPassword] = useState(false)

    // SUBMIT FORM
    const onSubmit = (data) => {
        login(data)
    }

    const togglePass = () => {
        setShowPassword(prev => !prev)
    }

    return (
        <div className="form-container">
            <h1>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="email" {...register("email")} placeholder="Email" />
                </div>
                {errors.email && <p className="error-message">{errors.email.message}</p>}

                <div className="password-container">
                    <input type={showPassword ? "text" : "password"} {...register("password")} placeholder="Password" />
                    <span className="password-toggle" onClick={togglePass}>
                        {
                            showPassword ? (
                                <i class="fa-solid fa-eye"></i>
                            ) : (
                                <i class="fa-solid fa-eye-slash"></i>
                            )
                        }
                    </span>
                </div>
                {errors.password && <p className="error-message">{errors.password.message}</p>}
                <div>
                    <button disabled={logingIn}>{logingIn ? <i class="fa-solid fa-spinner loader"></i> : "Login"}</button>
                </div>

                <p>Are you new here? <a href="/signup">Create an Account</a></p>
            </form>
        </div>
    )
}

export default Login