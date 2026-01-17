import React, { useState } from 'react'
import RotatingText from './RotatingText'
import logo from "../assets/logo.svg"
import setings from "../assets/setings.svg"
import strelka from "../assets/strelka-paga.svg"
import ModalPractice from './ModalPractice'


const Header = () => {

    const [isModalOpen, setisModalOpen] = useState(false)


    return (
        <>


            <header className='py-4  shadow-gray-200 shadow-md'>

                <div className="max-w-full mx-auto w-[85%]">

                    <nav className='flex items-center justify-between'>
                        <img className='w-38.25' src={logo} alt="" />

                        <ul className='flex items-center gap-8'>
                            <li >
                                <button onClick={() => setisModalOpen(true)} className='text-[#374151] flex gap-1'>
                                    Practice Tests

                                    <img className='w-5 pt-0.5' src={strelka} alt="" />
                                </button>

                                {/* Modal */}
                                <ModalPractice
                                    isOpen={isModalOpen}
                                    onClose={() => setisModalOpen(false)}
                                />


                            </li>
                            <li className="text-[#374151]">Features</li>
                            <li className="text-[#374151]">Pricing</li>
                            <li className="text-[#374151]">Reviews</li>
                            <li className="text-[#374151]">About</li>
                        </ul>

                        <div className="flex gap-5 items-center ">
                            <button className=''>
                                <RotatingText
                                    texts={['Sign In', 'Login', 'Register', 'Authenticate!']}
                                    mainClassName="bg-gradient-to-r from-[rgb(220,38,38)] rounded-lg to-[rgb(185,28,28)] text-white h-[45px] w-[140px] flex items-center justify-center"
                                    staggerFrom={"last"}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-120%" }}
                                    staggerDuration={0.025}
                                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                    rotationInterval={2000}
                                />
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