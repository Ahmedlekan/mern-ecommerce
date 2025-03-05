import {useForm} from "react-hook-form"
import * as userAapiClient from "../../apiClient/user"
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate, Link} from "react-router-dom";
import { useMutation, useQueryClient} from "@tanstack/react-query";

export type RegisterFormDataprops = {
    name: string
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const {register, watch, handleSubmit, formState:{errors}} = useForm<RegisterFormDataprops>()
    const {showToast} = useAppContext()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: userAapiClient.register,
        onSuccess: async ()=>{
            showToast({message:"Registration Success!", type: "SUCCESS"})
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] })
            navigate("/")
        },
        onError: (error: Error)=>{
            showToast({message: error.message, type: "ERROR"})
        }
    })

    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data)
    })

  return (
    <div className="mx-auto container p-4 bg-gray-100">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                <h2 className="text-3xl font-bold">Create an Account</h2>
                <label className="text-gray-700 text-sm font-bold">
                        Name
                        <input 
                            className="border rounded w-full py-1 px-2 font-normal"
                            {...register("name", {required:"This field is required"})}
                        />
                        {errors.name && (
                            <span className="text-red-500">{errors.name.message}</span>
                        )}
                </label>

                <label className="text-gray-700 text-sm font-bold">
                    Email
                    <input
                        type="email"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("email", {required:"This field is required"})}
                    />
                    {errors.email && (
                        <span className="text-red-500">{errors.email.message}</span>
                    )}
                </label>

                <label className="text-gray-700 text-sm font-bold">
                    Password
                    <input
                        type="password"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("password", {required:"This field is required", minLength:{
                            value: 6,
                            message: "Password must be atleast 6 characters"
                        }})}
                    />
                    {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                    )}
                </label>
                
                <label className="text-gray-700 text-sm font-bold">
                    Confirm Password
                    <input
                        type="password"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("confirmPassword", {
                            validate:(val)=>{
                                if(!val){
                                    return "This field is required"
                                } else if (watch("password") !== val){
                                    return "Your passwords do not match"
                                }
                            }
                        })}
                    />
                    {errors.confirmPassword && (
                        <span className="text-red-500">{errors.confirmPassword.message}</span>
                    )}
                </label>

                <span>
                    <button
                        type="submit"
                        className="bg-coral-red text-white p-2 font-bold 
                        hover:bg-red-500 text-xl"
                    >
                        Create Account
                    </button>
                </span>

            </form>
            
            <p className='my-5'>Already have account ?
                <Link to={"/login"} className=' text-coral-red hover:text-red-700 
                    hover:underline'>
                    Login
                </Link>
            </p>
        </div>
    </div>
  )
}

export default Register


