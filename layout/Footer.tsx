import { useRouter } from 'next/navigation';
import React from 'react'

const linkedinPng = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png";
const instagramPng = "https://download.logo.wine/logo/Instagram/Instagram-Logo.wine.png";
const facebookPng = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png";
const locationSvg = "https://www.svgrepo.com/show/312483/location-indicator-red.svg";
const telephoneSvg = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Green_Phone_Font-Awesome.svg/1024px-Green_Phone_Font-Awesome.svg.png";
const gmailSvg = "https://www.svgrepo.com/show/223047/gmail.svg";
const clockSvg = "https://icons.veryicon.com/png/o/miscellaneous/all-blue-icon/clock-294.png"

const Footer = () => {

    const router = useRouter();

    return (
        <footer className="bg-black text-white py-10 px-6">
            <div className="w-[95%]  mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                <div>
                    <h2 className="text-xl font-bold mb-3">MedCare Hospital</h2>
                    <p className="text-sm">
                        Sağlamlığınız bizim üçün hər zaman ön plandadır. Keyfiyyətli tibbi xidmətlərlə xidmətinizdəyik.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Əlaqə</h3>
                    <div className='flex items-center'>
                        <img className='w-[20px] h-[20px]' src={locationSvg} />
                        <p className="text-sm ml-[5px]">
                            Bakı şəhəri, Nərimanov r
                        </p>
                    </div>
                    <div className='flex items-center mt-[10px]'>
                        <img className='w-[20px] h-[20px]' src={telephoneSvg} />
                        <p className="text-sm ml-[5px]">
                            +994 50 123 45 67
                        </p>
                    </div>
                    <div className='flex items-center mt-[10px]'>
                        <img className='w-[18px] h-[18px]' src={gmailSvg} />
                        <p className="text-sm ml-[9px]">
                            info@medcare.az
                        </p>
                    </div>
                    <div className='flex items-center mt-[10px]'>
                        <img className='w-[18px] h-[18px]' src={clockSvg} />
                        <p className="text-sm ml-[8px]">
                            İş saatı: 08:00 - 20:00
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Keçidlər</h3>
                    <ul className="text-sm space-y-2">
                        <li onClick={() => router.push("/")}>
                            <a className="cursor-pointer hover:underline">Ana səhifə</a>
                        </li>
                        <li onClick={() => router.push("/about")}>
                            <a className="cursor-pointer hover:underline">Haqqımızda</a>
                        </li>
                        <li onClick={() => router.push("/news")}>
                            <a className="cursor-pointer hover:underline">Xəbərlər</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Bizi izləyin</h3>
                    <div className="flex space-x-4">
                        <a href="https://www.linkedin.com">
                            <img className='w-[20px] h-[20px] cursor-pointer' src={linkedinPng} />
                        </a>
                        <a href="https://www.facebook.com">
                            <img className='w-[20px] h-[20px]  cursor-pointer' src={facebookPng} />
                        </a>
                    </div>
                </div>

            </div>

            <div className="mt-10 text-center text-xs text-gray-300 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} MedCare Hospital. Bütün hüquqlar qorunur.
            </div>
        </footer>

    )
}

export default Footer