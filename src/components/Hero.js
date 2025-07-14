import eolic from "../public/eolic.jpg"
import measure from "../public/measure.jpg"
import soil from "../public/soil.jpg"

const Hero = () => {
    return(
        <>
            <div className="relative w-full h-[50vh] flex">
                {/* Images */}
                <img className="w-1/3 h-full object-cover" src={eolic} alt="eolic" />
                <img className="w-1/3 h-full object-cover" src={soil} alt="soil" />
                <img className="w-1/3 h-full object-cover" src={measure} alt="measure" />
                {/* Overlay Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brunswick-400/70 text-white w-3/5 p-8 rounded-full text-center">
                    <h1 className="text-2xl font-bold">Soluciones Integrales en Seguridad, Higiene y Medio Ambiente.</h1>
                </div>
            </div>
        </>
        
    )
}

export default Hero