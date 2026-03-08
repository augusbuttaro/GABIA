import { FaInstagram, FaRegEnvelope, FaWhatsapp } from "react-icons/fa6";

const Footer = () => {
    return(
        <div>
            <footer className="flex bg-gray-800 text-white py-8 px-4 justify-around items center">
                <div className="text-center flex items-center">
                    <p className="text-sm">© 2025 GABIA. Todos los derechos reservados.</p>
                </div>
                <div>
                    <div>
                        <a className="flex items-center gap-2" href="/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-xl hover:text-gray-400 transition-colors" />
                            <p>gabia.seh</p>
                        </a>
                    </div>
                    <div>
                        <a className="flex items-center gap-2" href="mailto:gabiaseh@gmail.com?subject=Consulta%20desde%20el%20sitio%20web" target="_blank" rel="noopener noreferrer">
                            <FaRegEnvelope className="text-xl hover:text-gray-400 transition-colors" />
                            <p>gabiaseh@gmail.com</p>
                        </a>
                    </div>
                    <div>
                        <a className="flex items-center gap-2" href="https://wa.me/5492364547389?text=Hola,%20me%20gustaría%20contactarme%20con%20ustedes" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp className="text-xl hover:text-gray-400 transition-colors" />
                            <p>+54 9 2364 547389</p>
                        </a>
                    </div>
                </div>

            </footer>
        </div>
    )
}

export default Footer