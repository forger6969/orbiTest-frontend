import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RotatingText from "../Components/RotatingText";

const Hero = () => {
    return (
        <section className="relative max-h-screen flex items-center top-[20vh] justify-center px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-3xl"
            >
                <h1 className="font-bold text-gray-800 leading-tight text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px]">
                    Imtihonlar, Testlar va Uyga Vazifalar Barchasi Bir Joyda
                    <br />
                    Zamonaviy{" "}
                    <span className="inline-block mt-2 px-4 py-2 rounded-lg bg-qizil2 text-white text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px]">
                        IT Ta’lim Platformasi
                    </span>
                </h1>

                {/* DESCRIPTION */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mt-6 text-gray-500 text-sm sm:text-base leading-relaxed"
                >
                    Bizning platformamiz orqali o‘quvchilar tajribali ustozlardan
                    uyga vazifalar, amaliy topshiriqlar, testlar va imtihon namunalarini olishlari mumkin.
                    Bilimingizni mustahkamlang, natijangizni kuzating va o‘sishda davom eting.

                </motion.p>

                {/* CTA BUTTON */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    className="mt-10 flex justify-center"
                >
                    <Link to="/SingUp">
                        <RotatingText
                            texts={["Authenticate", "Sign Up", "Register"]}
                            mainClassName="
                h-[45px] w-[140px]
                flex items-center justify-center
                rounded-lg
                border-2 border-transparent
                text-white text-sm font-semibold
                bg-gradient-to-r from-red-600 to-red-700
                transition-all duration-300

                hover:bg-none hover:text-red-600 hover:border-red-600
              "
                            staggerFrom="last"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                        />
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
