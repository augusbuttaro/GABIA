import capacitacion from '../public/capacitacion.jpg'
import integral from '../public/integral.jpg'
import programas from '../public/programas.jpg'
import risk from '../public/risk.avif'
import servicio from '../public/servicio.jpg'

const services = [
  { name: "Capacitaciones prácticas y teóricas", color: "border-teal-400", img: capacitacion },
  { name: "Soporte técnico y legal", color: "border-blue-400", img: servicio },
  { name: "Confección de programas de higiene y salud ocupacional", color: "border-orange-400", img: programas },
  { name: "Evaluaciones integrales de riesgos", color: "border-green-400",  img: risk },
];

// Move circles closer to the center
const circlePositions = [
  { top: '25%', left: '0%', transform: 'translate(-50%, -50%)' }, // Top
  { top: '70%', left: '25%', transform: 'translate(-50%, -50%)' }, // Right
  { top: '70%', left: '75%', transform: 'translate(-50%, -50%)' }, // Bottom
  { top: '25%', left: '100%', transform: 'translate(-50%, -50%)' }, // Left
];

const Services = () => {
  return (
    <section className="relative flex flex-col items-center justify-center py-8 overflow-hidden">
      {/* Stripes background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-full h-full" style={{ zIndex: 0 }}>
          <div className="absolute right-0 w-[180vw] h-32 bg-blue-100/10 dark:bg-blue-900/10" style={{ top: '40%', transform: 'rotate(30deg)' }}></div>
          <div className="absolute right-0 w-[180vw] h-32 bg-blue-100/10 dark:bg-blue-900/10" style={{ top: '70%', transform: 'rotate(30deg)' }}></div>
        </div>
      </div>
      <h1 className='text-3xl font-bold mb-8 border-b-4 border-brunswick-600 z-10'>Servicios</h1>
      <div className="w-full max-w-2xl mx-auto relative" style={{ aspectRatio: '1/1'}}>
        {/* Central Circle - centered */}
        <div className="absolute left-1/2 top-1/4 z-10 flex flex-col items-center" style={{ transform: 'translate(-50%, -50%)' }}>
          <div className={"w-60 h-60 rounded-full border-4 border-brunswick-600 flex self-center justify-center bg-white shadow-lg text-center"}
            style={{ backgroundImage: `url(${integral})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> 
          </div>
          <p className="text-center p-2 rounded-xl text-center mt-4 text-2xl font-medium">Asesoramiento Integral</p>
        </div>
        {/* Service Circles positioned around */}
        {services.map((service, idx) => (
          <div
            key={service.name}
            className="absolute flex flex-col items-center"
            style={{ ...circlePositions[idx], zIndex: 20 }}
          >
            <div
              className={`w-32 h-32 rounded-full border-4 ${service.color} flex items-center justify-center shadow-md mb-2`}
              style={service.img ? { backgroundImage: `url(${service.img})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            >
            </div>
            <p className={`text-center w-48 p-2 rounded-xl`}>{service.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;