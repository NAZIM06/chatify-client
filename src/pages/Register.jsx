import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../provider/AuthProvider';
import Loader from '../components/Loader';
import axios from 'axios';
import Swal from 'sweetalert2';


const Register = () => {

    const [show, setShow] = useState(false)
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, createUser, setUser, loading, setLoading, updateUser, googleSignInUser } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleGoogleSignIn = () => {
        googleSignInUser()
            .then(result => {
                const user = result.user
                const savedUser = { name: user.displayName, email: user.email, image: user.photoURL, role: 'student' }
                axios.post(`${import.meta.env.VITE_BASE_URL}/all-users`, savedUser)
                setUser(result.user)
                navigate('/')
                setLoading(false)
            })
            .catch(err => {
                if (err.message === 'Firebase: Error (auth/popup-closed-by-user).') {
                    setLoading(false)
                }
                console.log(err.message)
                setLoading(false)
            })
    }
    const onSubmit = async data => {
        const name = data.name;
        const password = data.password;
        const email = data.email;
        setError('')
        const photo = new FormData()
        photo.append('image', data.photo[0])

        await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_KEY}`, {
            method: 'POST',
            body: photo
        })
            .then(res => res.json())
            .then(data => {
                const imageUrl = data.data.display_url
                createUser(email, password)
                    .then((result) => {
                        const user = result.user;
                        updateUser(name, imageUrl)
                            .then(() => {
                                Swal.fire({
                                    icon: 'success',
                                    text: 'Sign up Successfully',
                                })
                                navigate('/');
                                setLoading(false)
                            })
                            .catch((err) => {
                                const errorMessage = err.message;
                                setLoading(false)
                                console.log(errorMessage);
                            });
                        const savedUser = { name: name, email: user.email, image: imageUrl }
                        axios.post(`${import.meta.env.VITE_BASE_URL}/all-users`, savedUser)
                    })
                    .catch((err) => {
                        const errorMessage = err.message;
                        if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
                            setError('Please input a valid email address');
                            setLoading(false)
                        } else if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
                            setError('This email already exists. Please login');
                            setLoading(false)
                        } else if (errorMessage === 'Firebase: Error (auth/popup-closed-by-user).') {
                            setLoading(false)
                        }
                        console.log(errorMessage);
                    });
            })
    }

    return (
        <div style={{ backgroundImage: 'url("https://i.ibb.co/b51Q46C/login-bg.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='mx-auto p-10 w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-3/6'>
                {
                    loading && <Loader />
                }
                <form className='p-10 bg-gray-800 rounded-xl' onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mb-4">
                        <p className="text-center font-bold text-3xl text-white">Register</p>
                        <label className='text-xl font-semibold mb-3 text-white'>Name</label>
                        <input placeholder='Name' className='mb-5 p-3 focus:outline-none' {...register('name', { required: true })} />
                        {errors?.name?.types === 'required' && <p className='text-red-800 mb-2'>Name is required</p>}
                        <label className='text-xl font-semibold mb-3 text-white'>Email</label>
                        <input placeholder='Email' className='mb-5 p-3 focus:outline-none' {...register('email', { required: true })} />
                        {errors?.email?.types === 'required' && <p className='text-red-800 mb-2'>Email is required</p>}
                    </div>
                    <label className='text-xl font-semibold mb-3 text-white'>Password</label>
                    <div className='relative w-full'>
                        <input placeholder='Password' className='mb-5 w-full p-3 focus:outline-none' type={show ? 'text' : 'password'} {...register('password')} />
                        <div onClick={() => setShow(!show)} className='absolute inset-y-0 right-3 top-3.5'>
                            {show ? <FaEye className='w-5 h-5' /> : <FaEyeSlash className='w-5 h-5' />}
                        </div>
                    </div>
                    <label className='text-xl font-semibold mb-3 text-white'>Photo Url</label>
                    <input type="file" className="file-input file-input-bordered w-full my-3 text-gray-400" {...register('photo')} />
                    <p className='mb-3 text-white'>Already have an account ? <Link to='/login'><span className='text-btn-color underline text-[#00AFFA]'>Please login</span></Link></p>
                    <p className='text-red-800 py-3'>{error}</p>
                    <button type='submit' className='button mx-auto flex justify-center w-full'>Register</button>
                </form>
                <div onClick={handleGoogleSignIn} className='my-5 flex w-10/12 sm:w-full  mx-auto p-2 justify-between items-center hover:bg-black hover:text-white cursor-pointer border-2 rounded-xl'>
                    <FcGoogle className='h-6 w-6' />
                    <p className='font-semibold mx-auto text-white'>Continue with Google</p>
                </div>
            </div>

        </div>
    );
};

export default Register;