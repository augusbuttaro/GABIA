import { useEffect, useMemo, useState } from 'react';

import ypf from '../public/ypf.png';
import ISL from '../public/instrumental-san-lorenzo.png';
import Azilut from '../public/Azilut.png';
import buenAgro from '../public/buen-agro.png';
import fedPat from '../public/fedpat.png';
import magnesita from '../public/magnesita.png';
import molino from '../public/molino.png';
import nidera from '../public/nidera.png';
import novobra from '../public/novobra.png';
import poderJudicial from '../public/poder-judicial.png';

const Clients = () => {
  const clients = useMemo(
    () => [
      { id: 1, name: 'YPF', logo: ypf },
      { id: 2, name: 'ISL', logo: ISL },
      { id: 3, name: 'Azilut', logo: Azilut },
      { id: 4, name: 'Buen Agro', logo: buenAgro },
      { id: 5, name: 'Federacion Patronal', logo: fedPat },
      { id: 6, name: 'Magnesita', logo: magnesita },
      { id: 7, name: 'Molino', logo: molino },
      { id: 8, name: 'Nidera', logo: nidera },
      { id: 9, name: 'Novobra', logo: novobra },
      { id: 10, name: 'Poder Judicial', logo: poderJudicial },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

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
  }, [clients.length, lastClickTime]);

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
              const isPrev = idx === 0;
              const isNext = idx === 2;

              const handleClick = () => {
                if (isPrev) {
                  setActiveIndex((prev) => (prev - 1 + clients.length) % clients.length);
                } else if (isNext) {
                  setActiveIndex((next) => (next + 1) % clients.length);
                }
                setLastClickTime(Date.now());
              };

              return (
                <div
                  key={client.id}
                  onClick={handleClick}
                  className={[
                    'flex items-center justify-center transition-all duration-500 ease-out',
                    'motion-reduce:transition-none',
                    !isActive && 'cursor-pointer hover:scale-110',
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