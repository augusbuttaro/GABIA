const About = () => {
    return(
        <section className="w-full py-16 relative overflow-hidden">
            <div className="mx-auto w-full max-w-4xl px-6 relative z-10">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-6 border-b-4 border-brunswick-600 pb-4 inline-block">
                        Sobre Nosotros
                    </h1>
                </div>

                {/* Tagline */}
                <div className="mb-12 bg-brunswick-900 dark:bg-brunswick-900/20 p-8 rounded-lg border-l-4 border-brunswick-600">
                    <h2 className="text-2xl font-bold text-brunswick-600">
                        Soluciones Integrales en Seguridad, Higiene y Medio Ambiente
                    </h2>
                </div>

                {/* Main Content */}
                <div className="space-y-8">
                    {/* Paragraph 1 */}
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Somos especialistas en seguridad laboral, higiene y gestión ambiental, brindando <span className="font-bold text-brunswick-600">asesoramiento integral</span> a industria, agro, servicios y obras. Adaptamos nuestras soluciones a tus necesidades, garantizando eficiencia y cumplimiento normativo.
                    </p>

                    {/* Paragraph 2 */}
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Con un <span className="font-bold text-brunswick-600">método de trabajo transparente</span> y profesionales en constante capacitación, ofrecemos:
                    </p>

                    {/* Services List */}
                    <ul className="space-y-3 pl-6">
                        <li className="flex items-start gap-4 text-lg text-brunswick-600 dark:text-brunswick-400">
                            <span className="font-bold text-xl mt-1 flex-shrink-0">•</span>
                            <span className="text-gray-700 dark:text-gray-300">Asesoramiento legal en normativas de seguridad e higiene.</span>
                        </li>
                        <li className="flex items-start gap-4 text-lg text-brunswick-600 dark:text-brunswick-400">
                            <span className="font-bold text-xl mt-1 flex-shrink-0">•</span>
                            <span className="text-gray-700 dark:text-gray-300">Implementación de sistemas de gestión ambiental.</span>
                        </li>
                        <li className="flex items-start gap-4 text-lg text-brunswick-600 dark:text-brunswick-400">
                            <span className="font-bold text-xl mt-1 flex-shrink-0">•</span>
                            <span className="text-gray-700 dark:text-gray-300">Soluciones personalizadas para cada sector.</span>
                        </li>
                    </ul>

                    {/* Closing Statement */}
                    <div className="bg-brunswick-900 dark:bg-brunswick-900/20 p-8 rounded-lg border-l-4 border-brunswick-600">
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            Nuestro compromiso es acompañarte en el <span className="font-bold text-brunswick-600">cumplimiento legal</span> y en la mejora continua de tus estándares de seguridad y sustentabilidad.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About