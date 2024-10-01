import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { api } from '../services/api/api';

export default function FortuneCookie() {
  const [broken, setBroken] = useState(false);
  const [fortune, setFortune] = useState(''); 
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);  // Handle errors

  const getFortune = async () => {
    setLoading(true);
    try {
      const response = await api.get('/fortunes');
      if (response.data.length === 0) {
        setFortune('No fortunes available.');
      } else {
        const randomFortune = response.data[Math.floor(Math.random() * response.data.length)];
        setFortune(randomFortune.message);
      }
      setBroken(true);
      setError(null);
    } catch (error) {
      console.error('Erro ao buscar frase de sorte', error);
    } finally {
      setLoading(false); 
    }
  };

  const resetFortune = () => {
    setBroken(false);  // Reset the cookie to unbroken state
    setFortune('');    // Clear the fortune message
    setError(null);    // Clear any previous errors
  };

  return (
    <View className="flex-1 w-full justify-center items-center bg-gray-600">
      <Text className="text-2xl font-bold mb-4">Quebre o biscoito da sorte!</Text>

      {!broken ? (
        <TouchableOpacity onPress={getFortune}>
          <Image
            source={require('../../assets/fortune_cookie_closed.png')} 
            className="w-48 h-48"
          />
        </TouchableOpacity>
      ) : (
        <View className="items-center">
          <Image
            source={require('../../assets/fortune_cookie_open.png')}
            className="w-48 h-48"
          />
          {loading ? (
            <ActivityIndicator size="large" color="#000" className="mt-4" />
          ) : (
            <>
              {error ? (
                <Text className="mt-4 text-lg text-center text-red-500">{error}</Text>
              ) : (
                <Text className="mt-4 text-lg text-center">{fortune}</Text>
              )}

              {/* Button to break another cookie */}
              <TouchableOpacity onPress={resetFortune} className="mt-4 bg-blue-500 p-2 rounded">
                <Text className="text-white">Quebrar outro biscoito</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};