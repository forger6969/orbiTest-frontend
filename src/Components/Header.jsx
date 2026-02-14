import React, { useState } from 'react'
import RotatingText from './RotatingText'
import logo from "../assets/logo.svg"
import setings from "../assets/setings.svg"
import strelka from "../assets/strelka-paga.svg"
import ModalPractice from './ModalPractice'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


const Header = () => {

    const [isModalOpen, setisModalOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };


    return (
        <>
            <header className='py-4 shadow-gray-200 shadow-md bg-white sticky top-0 z-[100]'>
                <div className="max-w-full mx-auto w-[90%] md:w-[85%]">
                    <nav className='flex items-center justify-between'>
                        <Link to="/" className="z-[110]">
                            <img className='w-32 md:w-38.25' src={logo} alt="OrbiTest" />
                        </Link>

                        {/* Desktop Navigation */}
                        <ul className='hidden lg:flex items-center gap-6 xl:gap-8'>
                            <li>
                                <button onClick={() => setisModalOpen(true)} className='text-[#374151] flex gap-1 hover:text-black transition-all cursor-pointer font-medium'>
                                    {t('header.practice')}
                                    <img className='w-5 pt-0.5' src={strelka} alt="" />
                                </button>
                                <ModalPractice
                                    isOpen={isModalOpen}
                                    onClose={() => setisModalOpen(false)}
                                />
                            </li>
                            <li className="text-[#374151] hover:text-black transition-all cursor-pointer font-medium">{t('header.features')}</li>
                            <li className="text-[#374151] hover:text-black transition-all cursor-pointer font-medium">{t('header.pricing')}</li>
                            <li className="text-[#374151] hover:text-black transition-all cursor-pointer font-medium">{t('header.reviews')}</li>
                            <li className="text-[#374151] hover:text-black transition-all cursor-pointer font-medium">{t('header.about')}</li>
                        </ul>

                        <div className="flex gap-3 md:gap-5 items-center">
                            {/* Language Switcher - Desktop & Tablet */}
                            <div className="hidden sm:flex gap-2 items-center mr-2">
                                <button 
                                    onClick={() => changeLanguage('uz')}
                                    className={`cursor-pointer font-bold text-sm ${i18n.language === 'uz' ? 'text-red-600' : 'text-gray-400'}`}
                                >
                                    UZ
                                </button>
                                <span className="text-gray-300">|</span>
                                <button 
                                    onClick={() => changeLanguage('ru')}
                                    className={`cursor-pointer font-bold text-sm ${i18n.language === 'ru' ? 'text-red-600' : 'text-gray-400'}`}
                                >
                                    RU
                                </button>
                            </div>

                            {/* Auth Buttons - Desktop */}
                            <div className="hidden md:flex gap-3">
                                <Link to="/Register">
                                    <RotatingText
                                        texts={[t('header.signIn'), t('header.login'), t('header.authenticate')]}
                                        mainClassName="h-[40px] w-[120px] xl:w-[140px] flex items-center justify-center 
                                            border-2 border-red-600 text-red-600 bg-transparent 
                                            rounded-lg font-bold text-sm
                                            hover:bg-red-600 hover:text-white transition-all duration-300"
                                        staggerFrom={"last"}
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "-120%" }}
                                        staggerDuration={0.025}
                                        splitLevelClassName="overflow-hidden"
                                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                        rotationInterval={2000}
                                    />
                                </Link>

                                <Link to="/SingUp">
                                    <RotatingText
                                        texts={[t('header.signUp'), t('header.register'), t('header.authenticate')]}
                                        mainClassName="h-[40px] w-[120px] xl:w-[140px] flex items-center justify-center 
                                            rounded-lg font-bold text-sm text-white
                                            bg-red-600 border-2 border-transparent
                                            hover:bg-white hover:text-red-600 hover:border-red-600 transition-all duration-300"
                                        staggerFrom={"last"}
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "-120%" }}
                                        staggerDuration={0.025}
                                        splitLevelClassName="overflow-hidden"
                                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                        rotationInterval={2000}
                                    />
                                </Link>
                            </div>

                            <img className='w-6 md:w-8 cursor-pointer hidden sm:block' src={setings} alt="Settings" />

                            {/* Mobile Menu Button */}
                            <button 
                                className="lg:hidden p-2 text-gray-600 z-[110]"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <div className="w-6 h-5 flex flex-col justify-between">
                                    <span className={`w-full h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                                    <span className={`w-full h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                                    <span className={`w-full h-0.5 bg-current transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                                </div>
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-white z-[105] transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col h-full p-8 pt-24">
                        <ul className="flex flex-col gap-6 text-xl font-bold text-gray-800">
                            <li>
                                <button onClick={() => { setisModalOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center gap-2">
                                    {t('header.practice')}
                                    <img className='w-5' src={strelka} alt="" />
                                </button>
                            </li>
                            <li onClick={() => setIsMobileMenuOpen(false)}>{t('header.features')}</li>
                            <li onClick={() => setIsMobileMenuOpen(false)}>{t('header.pricing')}</li>
                            <li onClick={() => setIsMobileMenuOpen(false)}>{t('header.reviews')}</li>
                            <li onClick={() => setIsMobileMenuOpen(false)}>{t('header.about')}</li>
                        </ul>

                        <div className="mt-auto space-y-4">
                            <div className="flex gap-4 justify-center mb-8">
                                <button onClick={() => changeLanguage('uz')} className={`text-lg font-bold ${i18n.language === 'uz' ? 'text-red-600' : 'text-gray-400'}`}>UZ</button>
                                <span className="text-gray-300">|</span>
                                <button onClick={() => changeLanguage('ru')} className={`text-lg font-bold ${i18n.language === 'ru' ? 'text-red-600' : 'text-gray-400'}`}>RU</button>
                            </div>
                            
                            <Link to="/Register" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-4 border-2 border-red-600 text-red-600 rounded-xl font-bold">
                                {t('header.signIn')}
                            </Link>
                            <Link to="/SingUp" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-4 bg-red-600 text-white rounded-xl font-bold">
                                {t('header.signUp')}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}


RotatingText.displayName = 'RotatingText';
export default Header