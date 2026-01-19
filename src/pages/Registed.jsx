import React from 'react'
import back from "../assets/back.svg"
import { Link } from 'react-router-dom'
import logo from "../assets/logo.svg"

const Registed = () => {
    return (
        <>


            <div className='w-full h-screen bg-[#e5e7eb5c]'>

                <Link
                    to="/"
                    className="
                                 w-43 justify-center rounded-lg h-[50px]
                                 flex items-center gap-2 text-black text-[16px] 
                                 absolute top-3 left-4
                                 group cursor-pointer 
                                 bg-transparent
                                 transition-all 
                                 hover:bg-[#ef4343e6]
                                 hover:text-white
                                 z-0
                            "
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



                <div className=' flex justify-center items-center pt-[140px]'>

                    <div className='flex flex-col gap-3 items-center w-117.5'>
                        <img width={260} src={logo} alt="" />
                        <p className='text-[14px]'>
                            Enter your email to get started
                        </p>


                        <div className='bg-white w-full border border-gray-400 rounded-lg p-4'>
                            <p className='text-black text-[24px] font-semibold '>
                                Sign In or Register
                            </p>
                            <p className='text-sm text-[#737373]'>
                                We'll guide you through the process
                            </p>
                        </div>

                    </div>


                </div>





            </div>


        </>
    )
}

export default Registed