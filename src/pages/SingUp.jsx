import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Stepper, { Step } from '../Components/Stepper'

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        option: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <>
            <div className='min-h-screen bg-[#e5e7eb5c] overflow-hidden pb-30'>
                <div className='w-full h-full relative'>
                    <Link
                        to="/"
                        className="w-43 justify-center rounded-lg h-12.5 flex items-center gap-2 text-black text-[16px] fixed top-3 left-4 group cursor-pointer bg-transparent transition-all hover:bg-[#ef4343e6] hover:text-white z-0"
                    >
                        <svg
                            className='w-3.5 h-auto pt-1 transition-transform duration-300 group-hover:-translate-x-1.5 fill-current'
                            width="800px"
                            height="800px"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z" />
                        </svg>
                        Back to home
                    </Link>
                </div>
                <Stepper
                    initialStep={1}
                    onStepChange={(step) => {
                        console.log(step);
                    }}
                    onFinalStepCompleted={() => {
                        console.log("All steps completed!");
                        console.log("Form data:", formData);
                    }}
                    backButtonText="Previous"
                    nextButtonText="Next"
                >
                    <Step>
                        <form className='flex flex-col gap-3' action="">
                            <div className='flex flex-col gap-1 mt-5'>
                                <label className='font-medium' htmlFor="username">
                                    User name?
                                </label>
                                <input
                                    placeholder='Your user name?'
                                    id='username'
                                    value={formData.username}
                                    onChange={(e) => handleInputChange('username', e.target.value)}
                                    className='w-full border-gray-300 h-10 rounded-lg pl-3 pb-1 font-medium focus:border-red-500 border-2 focus:outline-none placeholder:text-gray-500 focus:placeholder:text-red-500 focus:text-red-500'
                                    type='text'
                                />
                            </div>
                        </form>
                    </Step>
                    <Step>
                        <form className='flex flex-col gap-3' action="">
                            <div className='flex flex-col gap-1 mt-5'>
                                <label className='font-medium' htmlFor="email">
                                    Email
                                </label>
                                <input
                                    placeholder='your@gmail.com'
                                    id='email'
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className='w-full border-gray-300 h-10 rounded-lg pl-3 pb-1 font-medium focus:border-red-500 border-2 focus:outline-none placeholder:text-gray-500 focus:placeholder:text-red-500 focus:text-red-500'
                                    type='email'
                                />
                            </div>
                        </form>
                    </Step>
                    <Step>
                        <form className='flex flex-col gap-3' action="">
                            <div className='flex flex-col gap-1 mt-5'>
                                <label className='font-medium' htmlFor="password">
                                    Password
                                </label>
                                <input
                                    placeholder='Your password?'
                                    id='password'
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className='w-full border-gray-300 h-10 rounded-lg pl-3 pb-1 font-medium focus:border-red-500 border-2 focus:outline-none placeholder:text-gray-500 focus:placeholder:text-red-500 focus:text-red-500'
                                    type='password'
                                />
                            </div>
                        </form>
                    </Step>
                    <Step>
                        <div className='flex flex-col gap-1 mt-5'>
                            <label className='font-medium' htmlFor="option">
                                Select option
                            </label>
                            <select
                                className='w-full border border-gray-600 py-2 px-2 rounded-lg'
                                value={formData.option}
                                onChange={(e) => handleInputChange('option', e.target.value)}
                                id="option"
                            >
                                <option value="">Select...</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                    </Step>
                </Stepper>
            </div>
        </>
    )
}

export default SignUp
