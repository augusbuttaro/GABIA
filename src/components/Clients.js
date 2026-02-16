import { useEffect, useMemo, useState } from 'react';

import Apple from '../public/apple.png';
import Chipotle from '../public/chipotle.png';
import CocaCola from '../public/coca-cola.png';
import Volkswagen from '../public/volkswagen.png';
import Nike from '../public/nike.png';

const Clients = () => {
  const clients = useMemo(
    () => [
      { id: 1, name: 'Apple', logo: Apple },
      { id: 2, name: 'Chipotle', logo: Chipotle },
      { id: 3, name: 'Coca Cola', logo: CocaCola },
      { id: 4, name: 'Volkswagen', logo: Volkswagen },
      { id: 5, name: 'Nike', logo: Nike },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (clients.length <= 1) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setActiveIndex((idx) => (idx + 1) % clients.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [clients.length]);

  if (clients.length === 0) return null;

  const prevIndex = (activeIndex - 1 + clients.length) % clients.length;
  const nextIndex = (activeIndex + 1) % clients.length;
  const visibleClients = [clients[prevIndex], clients[activeIndex], clients[nextIndex]];

  return (
    <section className="w-full py-12">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-3xl font-bold text-center mb-8 border-b-4 border-brunswick-600 inline-block mx-auto">
            Nuestros Clientes
          </h2>
        </div>

        <div className="relative">
          <div className="flex items-center justify-center gap-8 md:gap-14 py-6">
            {visibleClients.map((client, idx) => {
              const isActive = idx === 1;

              return (
                <div
                  key={client.id}
                  className={[
                    'flex items-center justify-center transition-all duration-500 ease-out',
                    'motion-reduce:transition-none',
                    isActive
                      ? 'opacity-100 scale-125'
                      : 'opacity-50 scale-95',
                  ].join(' ')}
                >
                  <div
                    className={[
                      'flex items-center justify-center rounded-xl',
                      'bg-white/60 dark:bg-white/70',
                      'backdrop-blur-sm',
                      isActive ? 'shadow-lg' : 'shadow-sm',
                      // consistent footprint to avoid layout jump
                      isActive ? 'w-56 h-28 md:w-64 md:h-32' : 'w-48 h-24 md:w-56 md:h-28',
                    ].join(' ')}
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-[70%] max-w-[80%] object-contain select-none"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Clients;