import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { api } from './src/services/api/api';

export default function App(){
  const [count, setCount] = useState<number>(0);

  useEffect(() => {

    const loadCount = async () => {
      try {
        const response = await api.get('/contador');
        setCount(response.data.pessoas);
      } catch (error) {
        console.error('Erro ao carregar contador:', error);
      }
    };

    loadCount();
  }, []);

  const handleIncrement = async () => {
    try {
      const newCount = count + 1;
      await api.put('/contador', { pessoas: newCount });
      setCount(newCount);
    } catch (error) {
      console.error('Erro ao incrementar:', error);
    }
  };

  const handleDecrement = async () => {
    try {
      const newCount = Math.max(0, count - 1);
      await api.put('/contador', { pessoas: newCount });
      setCount(newCount);
    } catch (error) {
      console.error('Erro ao decrementar:', error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text className="text-3xl font-bold mb-6 text-gray-800">Contador de Pessoas</Text>
      <Text className="text-6xl font-bold mb-10 text-blue-600">{count}</Text>

      <View className="flex-row space-x-4">
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg"
          onPress={handleIncrement}
        >
          <Text className="text-white text-lg font-bold">Entrou</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-500 p-4 rounded-lg"
          onPress={handleDecrement}
        >
          <Text className="text-white text-lg font-bold">Saiu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
