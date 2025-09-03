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
    confirmPassword: yup.string().required("confirm Password is required").min(6, "confirm Password cannot be less than 6 characters"),
    name: yup.string().required("Name is required"),
    department: yup.string().optional().oneOf(departments)
})

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            department: ""
        }
    })
    const { signup, signingUp } = useContext(authContext)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // SUBMIT FORM
    const onSubmit = (data) => {
        signup(data)
    }

    const togglePass = () => {
        setShowPassword(prev => !prev)
    }
    const toggleConfirmPass = () => {
        setShowConfirmPassword(prev => !prev)
    }
    return (
        <div className="form-container">
            <h1>Sign up</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="email" {...register("email")} placeholder="Email" />
                </div>
                {errors.email && <p className="error-message">{errors.email.message}</p>}
                <div>
                    <input type="text" {...register("name")} placeholder="Name" />
                </div>
                {errors.name && <p className="error-message">{errors.name.message}</p>}
                <div>
                    <select name="" id="" {...register("department")}>
                        <option value="">Select Department</option>
                        {
                            departments.map((department, index) => (
                                <option key={index} value={department}>{department}</option>
                            ))
                        }
                    </select>
                </div>
                {errors.department && <p className="error-message">{errors.department.message}</p>}
                <div className="password-container">
                    <input type={showPassword ? "text" : "password"} {...register("password")} placeholder="Create Password" />
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
                <div className="password-container">
                    <input type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} placeholder="Confirm password" />
                    <span className="password-toggle" onClick={toggleConfirmPass}>
                        {
                            showConfirmPassword ? (
                                <i class="fa-solid fa-eye"></i>
                            ) : (
                                <i class="fa-solid fa-eye-slash"></i>
                            )
                        }
                    </span>
                </div>
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}

                <div>
                    <button disabled={signingUp}>{signingUp ? <i class="fa-solid fa-spinner loader"></i> : "Create Account"}</button>
                </div>

                <p>Already have an account? <a href="/login">Login</a></p>

            </form>
        </div>
    )
}

export default Signup
