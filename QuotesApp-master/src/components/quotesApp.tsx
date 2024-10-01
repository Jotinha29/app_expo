import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function QuotesApp() {
  const [quote, setQuote] = useState('');   // Estado da citação
  const [author, setAuthor] = useState(''); // Estado do autor
  const [image, setImage] = useState('');   // Estado da imagem
  const [loading, setLoading] = useState(false); // Estado de loading
  const [error, setError] = useState(null); // Estado de erro

  // Função para buscar uma citação aleatória da API
  const getRandomQuote = async () => {
    setLoading(true);
    setError(null); // Resetar o erro a cada nova tentativa
    try {
      const response = await axios.get('http://localhost:3000/quotes'); // URL da sua API (ajuste conforme necessário)
      const quotes = response.data;

      if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selectedQuote = quotes[randomIndex];

        setQuote(selectedQuote.quote);
        setAuthor(selectedQuote.author);
        setImage(selectedQuote.image);
      }
    } catch (err) {
      console.error('Erro ao buscar citações:', err);
    } finally {
      setLoading(false);
    }
  };

  // Carregar uma citação na inicialização
  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-6">
      <Text className="text-2xl font-bold mb-4 text-center">QuotesApp</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : error ? (
        <Text className="text-lg text-center text-red-500">{error}</Text>
      ) : (
        <>
          <Text className="text-lg text-center mb-4 italic">"{quote}"</Text>
          <Text className="text-base text-center mb-4 font-semibold">- {author}</Text>

          {image && (
            <Image
              source={{ uri: image }} // Carregar a imagem do autor
              style={{ width: 150, height: 150, borderRadius: 75, marginBottom: 20 }}
            />
          )}

          <TouchableOpacity
            onPress={getRandomQuote}
            style={{ backgroundColor: '#007BFF', padding: 10, borderRadius: 5 }}
          >
            <Text className="text-white text-center">Nova Citação</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
