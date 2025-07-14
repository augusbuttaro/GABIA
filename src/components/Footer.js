import { FaInstagram, FaRegEnvelope, FaWhatsapp, FaMapLocationDot } from "react-icons/fa6";

const Footer = () => {
    return(
        <div>
            <footer className="flex bg-gray-800 text-white py-8 px-4 justify-around items center">
                <div className="flex flex-col justify-center items-end">
                    <div className="flex items-center gap-2">
                        <FaMapLocationDot className="text-xl hover:text-gray-400 transition-colors"/>
                        <p>Siempreviva 123</p>
                    </div>
                    <p>Springfield, CA</p>
                </div>
                <div className="text-center flex items-center">
                    <p className="text-sm">© 2025 GABIA. Todos los derechos reservados.</p>
                </div>
                <div>
                    <div>
                        <a className="flex items-center gap-2" href="https://www.instagram.com/instagram" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-xl hover:text-gray-400 transition-colors" />
                            <p>gabia.shyma</p>
                        </a>
                    </div>
                    <div>
                        <a className="flex items-center gap-2" href="https://www.instagram.com/instagram" target="_blank" rel="noopener noreferrer">
                            <FaRegEnvelope className="text-xl hover:text-gray-400 transition-colors" />
                            <p>contacto@gabia.com.ar</p>
                        </a>
                    </div>
                    <div>
                        <a className="flex items-center gap-2" href="https://www.instagram.com/instagram" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp className="text-xl hover:text-gray-400 transition-colors" />
                            <p>+54 9 2364 123456</p>
                        </a>
                    </div>
                </div>

            </footer>
        </div>
    )
}

export default Footer