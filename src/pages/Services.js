import ServiceCard from '../components/ServiceCard';
import { servicesData } from '../utils/servicesData';

const Services = () => {
    return (
        <section className="w-full py-12 px-4 md:px-8 relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                <h1 className='text-4xl font-bold mb-12 text-center border-b-4 border-brunswick-600 pb-4 inline-block w-full'>
                    Servicios
                </h1>
                
                <div className="space-y-6">
                    {servicesData.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;