import { useState, useCallback } from 'react';

// Usar el proxy local en lugar de la URL directa para evitar CORS
const API_BASE_URL = '/suggestions'; // Esto será proxeado a http://34.194.226.49:5000

// Sugerencias mock solo para títulos
const mockTitleSuggestions = {
  naturaleza: [
    'Naturaleza: Conservación y Biodiversidad',
    'Explorando la Naturaleza Urbana',
    'Naturaleza: Nuestro Tesoro Natural',
    'Conectando con la Naturaleza',
    'Naturaleza y Sostenibilidad'
  ],
  biodiversidad: [
    'Biodiversidad: La riqueza de la vida en la Tierra',
    'Explorando la biodiversidad de nuestro planeta',
    'Biodiversidad: Conservación y protección',
    'La importancia de la biodiversidad',
    'Biodiversidad marina y terrestre'
  ],
  reciclaje: [
    'Reciclaje: Cuidando nuestro planeta',
    'Aprende a reciclar correctamente',
    'Reciclaje: Reducir, reutilizar, reciclar',
    'El arte del reciclaje creativo',
    'Reciclaje y economía circular'
  ],
  energía: [
    'Energías renovables para el futuro',
    'Ahorro energético en el hogar',
    'Energía solar: Una alternativa limpia',
    'Energía eólica y sus beneficios',
    'Transición energética sostenible'
  ]
};

export const useTextSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  const getMockSuggestions = (text) => {
    const normalizedText = text.toLowerCase();
    
    // Buscar coincidencias exactas primero
    if (mockTitleSuggestions[normalizedText]) {
      return mockTitleSuggestions[normalizedText];
    }
    
    // Buscar coincidencias parciales
    const matches = [];
    Object.keys(mockTitleSuggestions).forEach(key => {
      if (key.includes(normalizedText) || normalizedText.includes(key)) {
        matches.push(...mockTitleSuggestions[key]);
      }
    });
    
    if (matches.length > 0) {
      return matches.slice(0, 5); // Limitar a 5 sugerencias
    }
    
    // Sugerencias genéricas para títulos
    return [
      `${text}: Guía completa`,
      `Aprende sobre ${text}`,
      `${text} para principiantes`,
      `Introducción a ${text}`,
      `${text}: Conceptos básicos`
    ];
  };

  const getSuggestions = useCallback(async (text) => {
    if (!text || text.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Intentar conectar al servidor con timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos timeout

      const response = await fetch(`${API_BASE_URL}/process_text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          content_type: 'titulo',
          track_steps: true
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Extraer sugerencias de la estructura de respuesta real
      const extractedSuggestions = [];
      
      // 1. Agregar el texto final procesado
      if (data.final_text) {
        extractedSuggestions.push(data.final_text);
      }
      
      // 2. Agregar las mejores mejoras
      if (data.bert_details?.main_improvement?.all_improvements) {
        data.bert_details.main_improvement.all_improvements.forEach(improvement => {
          if (improvement.text && improvement.text !== data.original_text) {
            extractedSuggestions.push(improvement.text);
          }
        });
      }
      
      // 3. Agregar variaciones si existen
      if (data.bert_details?.variations?.variations) {
        data.bert_details.variations.variations.forEach(variation => {
          if (variation.text && variation.text !== data.original_text) {
            extractedSuggestions.push(variation.text);
          }
        });
      }
      
      // Limpiar duplicados y limitar cantidad
      const uniqueSuggestions = [...new Set(extractedSuggestions)]
        .filter(suggestion => suggestion && suggestion.trim().length > 0)
        .slice(0, 5);
      
      setSuggestions(uniqueSuggestions);
      setIsOfflineMode(false);

    } catch (err) {
      console.warn('Servidor no disponible, usando sugerencias locales:', err.message);
      
      // Usar sugerencias mock cuando el servidor no esté disponible
      const mockResults = getMockSuggestions(text);
      setSuggestions(mockResults);
      setIsOfflineMode(true);
      
      // No mostrar error para connection refused, solo para otros errores
      if (!err.message.includes('Failed to fetch') && err.name !== 'AbortError') {
        setError(`Modo offline: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setError(null);
    setIsOfflineMode(false);
  }, []);

  return {
    suggestions,
    loading,
    error,
    isOfflineMode,
    getSuggestions,
    clearSuggestions
  };
};
