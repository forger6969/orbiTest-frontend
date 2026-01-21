import React, { useState } from 'react'
import RotatingText from './RotatingText'
import logo from "../assets/logo.svg"
import setings from "../assets/setings.svg"
import strelka from "../assets/strelka-paga.svg"
import ModalPractice from './ModalPractice'
import { Link } from 'react-router-dom'


const Header = () => {

    const [isModalOpen, setisModalOpen] = useState(false)


    return (
        <>
            <header className='py-4  shadow-gray-200 shadow-md'>
                <div className="max-w-full mx-auto w-[85%]">
                    <nav className='flex items-center justify-between'>
                        <Link to="/">
                            <img className='w-38.25' src={logo} alt="" />
                        </Link>

                        <ul className='flex items-center gap-8'>
                            <li >
                                <button onClick={() => setisModalOpen(true)} className='text-[#374151] flex gap-1  hover:text-black transition-all cursor-pointer'>
                                    Practice Tests

                                    <img className='w-5 pt-0.5' src={strelka} alt="" />
                                </button>

                                {/* Modal */}
                                <ModalPractice
                                    isOpen={isModalOpen}
                                    onClose={() => setisModalOpen(false)}
                                />


                            </li>
                            <li className="text-[#374151] hover:text-black transition-all cursor-pointer">Features</li>
                            <li className="text-[#374151] hover:text-black transition-all cursor-pointer">Pricing</li>
                            <li className="text-[#374151] hover:text-black transition-all cursor-pointer">Reviews</li>
                            <li className="text-[#374151] hover:text-black transition-all cursor-pointer">About</li>
                        </ul>

                        <div className="flex gap-5 items-center ">
                            <button className=''>
                                <Link to="/Register" >
                                    <RotatingText
                                        texts={['Sign In', 'Login', 'Authenticate!']}
                                        mainClassName="h-[45px] w-[140px] flex items-center justify-center 
                                            border-2 border-red-600 text-red-600 bg-transparent 
                                            rounded-lg 
                                            hover:bg-gradient-to-r hover:from-[rgb(220,38,38)] hover:to-[rgb(185,28,28)] transition-all duration-300
                                            hover:text-white"
                                        staggerFrom={"last"}
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "-120%" }}
                                        staggerDuration={0.025}
                                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                        rotationInterval={2000}
                                    />
                                </Link>

                            </button>

                            <button className=''>
                                <Link to="/SingUp" >
                                    <RotatingText
                                        texts={['Sign Up', 'Register', 'Authenticate!']}
                                        mainClassName=" 
                                            h-[45px] w-[140px] flex items-center justify-center 
                                            rounded-lg
                                            border-2 border-transparent
                                            text-white
                                            bg-gradient-to-r from-[rgb(220,38,38)] to-[rgb(185,28,28)]
                                            transition-all duration-300
                                            
                                            hover:bg-none hover:text-red-600 hover:border-red-600
                                                        "
                                        staggerFrom={"last"}
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "-120%" }}
                                        staggerDuration={0.025}
                                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                        rotationInterval={2000}
                                    />
                                </Link>

                            </button>

                            <img className='w-8' src={setings} alt="" />
                        </div>



                    </nav>

                </div>

            </header>


        </>
    )
}


RotatingText.displayName = 'RotatingText';
export default Header