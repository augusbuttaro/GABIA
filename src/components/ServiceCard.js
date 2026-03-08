import { useState } from 'react';

const ServiceCard = ({ service }) => {
  const [expanded, setExpanded] = useState(false);

  const colorMap = {
    brunswick: {
      header: 'bg-brunswick-500 dark:bg-brunswick-600',
      bg: 'bg-white dark:bg-gray-900',
      accent: 'text-brunswick-600 dark:text-brunswick-50',
      highlight: 'bg-brunswick-50 dark:bg-brunswick-300/40 border-l-4 border-brunswick-400 dark:border-brunswick-400',
      button: 'bg-brunswick-500 hover:bg-brunswick-600 text-white',
    },
    apple: {
      header: 'bg-apple-500 dark:bg-apple-600',
      bg: 'bg-white dark:bg-gray-900',
      accent: 'text-apple-600 dark:text-apple-50',
      highlight: 'bg-apple-50 dark:bg-apple-300/40 border-l-4 border-apple-400 dark:border-apple-400',
      button: 'bg-apple-500 hover:bg-apple-600 text-white',
    },
    asparagus: {
      header: 'bg-asparagus-500 dark:bg-asparagus-600',
      bg: 'bg-white dark:bg-gray-900',
      accent: 'text-asparagus-600 dark:text-asparagus-50',
      highlight: 'bg-asparagus-50 dark:bg-asparagus-300/40 border-l-4 border-asparagus-400 dark:border-asparagus-400',
      button: 'bg-asparagus-500 hover:bg-asparagus-600 text-white',
    },
    blue: {
      header: 'bg-blue-500 dark:bg-blue-600',
      bg: 'bg-white dark:bg-gray-900',
      accent: 'text-blue-600 dark:text-blue-50',
      highlight: 'bg-blue-50 dark:bg-blue-300/40 border-l-4 border-blue-400 dark:border-blue-400',
      button: 'bg-blue-500 hover:bg-blue-600 text-white',
    },
  };

  const color = service.color || 'brunswick';
  const theme = colorMap[color];

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl`}>
      {/* Header Section */}
      <div className={`${theme.header} p-8 text-white`}>
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="text-3xl font-bold flex-1">{service.title}</h3>
          <button
            onClick={() => setExpanded(!expanded)}
            className={`${theme.button} px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap`}
          >
            {expanded ? '▼ Ver menos' : '▶ Ver detalles'}
          </button>
        </div>
        <p className="text-gray-100 italic text-lg">{service.subtitle}</p>
      </div>

      {/* Content Section - Only shows when expanded */}
      {expanded && (
        <div className="bg-white dark:bg-gray-900 p-8">
          <div className="space-y-4 animated-fade-in">
            {service.highlights.map((highlight, idx) => (
              <div key={idx} className={`p-5 rounded-lg ${theme.highlight} transition-all duration-300`}>
                <h4 className={`font-bold text-lg ${theme.accent} mb-2`}>
                  {idx + 1}. {highlight.title}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
