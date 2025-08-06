import { NavLink } from 'react-router-dom';
import { GrPhone, GrLocation  } from "react-icons/gr";
import { TbMailFilled } from "react-icons/tb";
import { FaFacebook,FaWhatsapp,FaInstagram} from "react-icons/fa";
import {FaLinkedin,FaGithub ,FaTelegram ,FaYoutube } from "react-icons/fa6";
import ScrollToTop from '../../Components/ScrollToTop'

const Footer = () => {
    const year = new Date();
  return (
    <>
        <footer className='pt-md-4'>
            <div className="container">
            <section className="row mt-2">
                <div className="col-12 col-sm-12 col-lg-4">
                    <ul >
                        <div className="title ms-lg-3"><b><h3>Contact</h3></b></div>
                        <li className="list-group-item"><ScrollToTop /><NavLink to={"tel:+91 9487048924"}><GrPhone className='me-2'/><em className="hover-underline-animation left">+91 9487048924</em></NavLink></li>
                        <li className="list-group-item"><ScrollToTop /><NavLink to={"mailto:info@genzonix.in"}><TbMailFilled className='me-2'/><em className="hover-underline-animation left">info@genzonix.in</em></NavLink></li>
                        <li className="list-group-item"><ScrollToTop /><NavLink to={"/"}><GrLocation className='me-2'/><em className="hover-underline-animation left">Mayiladuthurai</em></NavLink></li>
                    </ul>
                    </div>
                    <div className="col-12 col-sm-12 col-lg-4">
                        <ul>
                            <div className="title ms-lg-3"><b><h3>Services</h3></b></div>
                            <li id="iot" className="list-group-item"><ScrollToTop /><NavLink to={"/products#iot"}><em className="hover-underline-animation left">IoT Kit</em></NavLink></li>
                            <li id="cloud" className="list-group-item"><ScrollToTop /><NavLink to={"/sandbox"}><em className="hover-underline-animation left">Cloud Kit</em></NavLink></li>
                            <li id="robotics" className="list-group-item"><ScrollToTop /><NavLink to={"/products#robotics"}><em className="hover-underline-animation left">Robotics Kit</em></NavLink></li>
                            <li id="AI" className="list-group-item"><ScrollToTop /><NavLink to={"/products#ai"}><em className="hover-underline-animation left">AI Kit</em></NavLink></li>
                        </ul>
                    </div>
                    <div className="col-12 col-sm-12 col-lg-4">
                        <ul>
                            <div className="title ms-lg-3"><b><h3>Quick Links</h3></b></div>
                            <li id="About" className="list-group-item"><ScrollToTop /><NavLink to={"/"}><em className="hover-underline-animation left">About us</em></NavLink></li>
                            <li id="Projects" className="list-group-item"><ScrollToTop /><NavLink to={"/projects/"}><em className="hover-underline-animation left">Projects</em></NavLink></li>
                            <li id="FAQ" className="list-group-item"><ScrollToTop /><NavLink to={"/faq/"}><em className="hover-underline-animation left">Faqs</em></NavLink></li>
                            <li id="Career" className="list-group-item"><ScrollToTop /><NavLink to={"https://forms.gle/QEQCW7uBg242nzWv5"} target='blank'><em className="hover-underline-animation left">Career</em></NavLink></li>
                            <li id="Shop" className="list-group-item"><ScrollToTop /><NavLink to={"/products/"} ><em className="hover-underline-animation left">shop</em></NavLink></li>
                        </ul>
                    </div>
                </section>
            <div className="col-12 text-center">
                <ul className="row justify-content-center px-md-5 mx-xl-5">
                    <li className="list-group-item col-2 col-md-1"><NavLink to={"https://www.facebook.com/profile.php?id=61566419364811&mibextid=ZbWKwL"} target='blank'><FaFacebook/></NavLink></li>
                    <li className="list-group-item col-2 col-md-1"><NavLink to={"https://wa.me/message/GNKCNRUXZBUKE1"} target='blank'><FaWhatsapp /></NavLink></li>
                    <li className="list-group-item col-2 col-md-1"><NavLink to={"https://www.instagram.com/genzonix/"} target='blank'><FaInstagram /></NavLink></li>
                    <li className="list-group-item col-2 col-md-1"><NavLink to={"http://www.linkedin.com/in/genzonix"} target='blank'><FaLinkedin /></NavLink></li>
                    <li className="list-group-item col-2 col-md-1"><NavLink to={"https://github.com/GenZonix-Lab/Genzonix_public.git"} target='blank'><FaGithub /></NavLink></li>
                    <li className="list-group-item col-2 col-md-1"><NavLink to={"https://t.me/Genzonix"} target='blank'><FaTelegram /></NavLink></li>
                    <li className="list-group-item col-3 col-md-1"><NavLink to={"https://www.youtube.com/channel/UCpoVZOZbnEVv_s7eW2ZKxrA"} target='blank'><FaYoutube /></NavLink></li>
                </ul>
            </div>
            <div className='text-center'>
                <p>Copyright &#xa9; {year.getFullYear()}, Genzonix. All Rights Reserved.</p>
            </div>
            </div>
        </footer>
    </>
  )
}

export default Footer