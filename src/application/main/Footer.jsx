import { NavLink } from 'react-router-dom';
import { GrPhone, GrLocation  } from "react-icons/gr";
import { TbMailFilled } from "react-icons/tb";
import { FaFacebook,FaWhatsapp,FaInstagram} from "react-icons/fa";
import {FaLinkedin,FaGithub ,FaTelegram ,FaYoutube } from "react-icons/fa6";
import ScrollToTop from '../../Components/ScrollToTop'

const Footer = () => {
    const year = new Date();
    const iconSize = 15;
  return (
    <>
        <footer className='pt-md-4 border-top border-secondary'>
            <div className="container">
                <div className="d-none d-md-block">
                    <section className="row mt-2">
                        <div className="col-12 col-sm-12 col-lg-4">
                            <ul >
                                <div className="title ms-lg-3"><b><h3>Contact</h3></b></div>
                                <li className="list-group-item"><ScrollToTop /><NavLink to={"tel:+91 9487048924"}><GrPhone className='me-2'/><em className="hover-underline-animation left">+91 9487048924</em></NavLink></li>
                                <li className="list-group-item"><ScrollToTop /><NavLink to={"mailto:hellogenzonix@gmail.com"}><TbMailFilled className='me-2'/><em className="hover-underline-animation left">hellogenzonix@gmail.com</em></NavLink></li>
                                <li className="list-group-item"><ScrollToTop /><NavLink to={"/"}><GrLocation className='me-2'/><em className="hover-underline-animation left">Mayiladuthurai</em></NavLink></li>
                            </ul>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-4">
                            <ul>
                                <div className="title ms-lg-3"><b><h3>Policies</h3></b></div>
                                <li id="privacy-policy" className="list-group-item"><ScrollToTop /><NavLink to={"/privacy-policy"}><em className="hover-underline-animation left">Privacy Policy</em></NavLink></li>
                                <li id="warrenty&return" className="list-group-item"><ScrollToTop /><NavLink to={"/policy"}><em className="hover-underline-animation left">Warranty & Return Policy</em></NavLink></li>
                                <li id="terms&condition" className="list-group-item"><ScrollToTop /><NavLink to={"/terms&Conditions"}><em className="hover-underline-animation left">Terms & Conditions</em></NavLink></li>
                            </ul>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-4">
                            <ul>
                                <div className="title ms-lg-3"><b><h3>Quick Links</h3></b></div>
                                <li id="About" className="list-group-item"><ScrollToTop /><NavLink to={"/"}><em className="hover-underline-animation left">About us</em></NavLink></li>
                                <li id="FAQ" className="list-group-item"><ScrollToTop /><NavLink to={"/faq/"}><em className="hover-underline-animation left">Faqs</em></NavLink></li>
                                <li id="Career" className="list-group-item"><ScrollToTop /><NavLink to={"https://forms.gle/QEQCW7uBg242nzWv5"} target='blank'><em className="hover-underline-animation left">Career</em></NavLink></li>
                            </ul>
                        </div>
                    </section>
                </div>
                <div className=''>
                    <div className="col-12 text-center">
                        <ul className="row justify-content-center px-md-5 mx-auto list-group list-group-horizontal">
                            <li className="list-group-item col col-md-1"><NavLink to={"https://www.facebook.com/profile.php?id=61566419364811&mibextid=ZbWKwL"} target='blank'><FaFacebook size={iconSize}/></NavLink></li>
                            <li className="list-group-item col col-md-1"><NavLink to={"https://wa.me/message/GNKCNRUXZBUKE1"} target='blank'><FaWhatsapp size={iconSize}/></NavLink></li>
                            <li className="list-group-item col col-md-1"><NavLink to={"https://www.instagram.com/genzonix/"} target='blank'><FaInstagram size={iconSize}/></NavLink></li>
                            <li className="list-group-item col col-md-1"><NavLink to={"http://www.linkedin.com/in/genzonix"} target='blank'><FaLinkedin size={iconSize}/></NavLink></li>
                            <li className="list-group-item col col-md-1"><NavLink to={"https://github.com/GenZonix-Lab/Genzonix_public.git"} target='blank'><FaGithub size={iconSize}/></NavLink></li>
                            <li className="list-group-item col col-md-1"><NavLink to={"https://t.me/Genzonix"} target='blank'><FaTelegram size={iconSize}/></NavLink></li>
                            <li className="list-group-item col col-md-1"><NavLink to={"https://www.youtube.com/channel/UCpoVZOZbnEVv_s7eW2ZKxrA"} target='blank'><FaYoutube size={iconSize}/></NavLink></li>
                        </ul>
                    </div>
                    <div className='text-center text-muted'>
                        <p style={{fontSize:`${iconSize}px`}}>Copyright &#xa9; {year.getFullYear()}, Genzonix. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer