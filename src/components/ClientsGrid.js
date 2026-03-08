import { useMemo } from 'react';

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

const ClientsGrid = () => {
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

  if (clients.length === 0) return null;

  return (
    <section className="w-full py-12 flex items-center justify-center">
      <div className="w-full max-w-6xl px-6">
        <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
          <h2 className="text-3xl font-bold text-center border-b-4 border-brunswick-600 inline-block">
            Nuestros Clientes
          </h2>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-center transition-transform duration-300 ease-out hover:scale-105"
              >
                <div
                  className={[
                    'flex items-center justify-center rounded-xl',
                    'bg-white/60 dark:bg-white/70',
                    'backdrop-blur-sm',
                    'shadow-md hover:shadow-lg',
                    'w-full h-32',
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientsGrid;
