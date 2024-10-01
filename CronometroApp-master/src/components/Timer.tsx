import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { clienteAPI } from '../services/api/api';
import { formatarTempo } from '../utils/formatarTempo';

const Cronometro = () => {
  const [emExecucao, setEmExecucao] = useState(false);
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [temposSalvos, setTemposSalvos] = useState<string[]>([]);
  const referenciaIntervalo = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    clienteAPI.get('/cronometro')
      .then(response => { 
        const [minutos, segundos, milissegundos] = response.data.tempo.split(/[:.]/).map(Number);
        const totalMilissegundos = minutos * 60000 + segundos * 1000 + milissegundos;
        setTempoDecorrido(totalMilissegundos);
      })
      .catch(error => console.error('Erro ao buscar o tempo:', error));
  }, []);

  useEffect(() => {
    return () => {
      if (referenciaIntervalo.current) clearInterval(referenciaIntervalo.current);
    };
  }, []);

  const iniciarCronometro = () => {
    if (!emExecucao) {
      const tempoInicial = Date.now() - tempoDecorrido;
      referenciaIntervalo.current = setInterval(() => {
        setTempoDecorrido(Date.now() - tempoInicial);
      }, 10);
      setEmExecucao(true);
    }
  };

  const pausarCronometro = () => {
    if (emExecucao && referenciaIntervalo.current) {
      clearInterval(referenciaIntervalo.current);
      setEmExecucao(false);
    }
  };

  const reiniciarCronometro = () => {
    if (referenciaIntervalo.current) clearInterval(referenciaIntervalo.current);
    setTempoDecorrido(0);
    setEmExecucao(false);
    clienteAPI.put('/cronometro', { tempo: "00:00:00.000" })
      .catch(error => console.error('Erro ao salvar o tempo:', error));
  };

  const salvarTempo = () => {
    const tempoFormatado = formatarTempo(tempoDecorrido);
    setTemposSalvos([...temposSalvos, tempoFormatado]);

    clienteAPI.put('/cronometro', { tempo: tempoFormatado })
      .catch(error => console.error('Erro ao salvar o tempo:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tempoTexto}>
        {formatarTempo(tempoDecorrido)}
      </Text>

      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botaoIniciar}
          onPress={iniciarCronometro}
        >
          <Text style={styles.textoBotao}>Iniciar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoPausar}
          onPress={pausarCronometro}
        >
          <Text style={styles.textoBotao}>Pausar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoReiniciar}
          onPress={reiniciarCronometro}
        >
          <Text style={styles.textoBotao}>Reiniciar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.botaoSalvar}
        onPress={salvarTempo}
      >
        <Text style={styles.textoBotao}>Salvar Tempo</Text>
      </TouchableOpacity>

      <ScrollView style={styles.listaTempos}>
        <Text style={styles.temposSalvosTitulo}>Tempos Salvos:</Text>
        {temposSalvos.length > 0 ? (
          temposSalvos.map((tempo, index) => (
            <View key={index} style={styles.itemTempo}>
              <Text style={styles.textoTempo}>Tempo {index + 1}: {tempo}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.textoNenhumTempo}>Nenhum tempo salvo ainda.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    padding: 16,
  },
  tempoTexto: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  botoesContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  botaoIniciar: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
    marginHorizontal: 8,
  },
  botaoPausar: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
    marginHorizontal: 8,
  },
  botaoReiniciar: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
    marginHorizontal: 8,
  },
  botaoSalvar: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 9999,
    marginBottom: 24,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listaTempos: {
    width: '100%',
    maxHeight: 240,
  },
  temposSalvosTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  itemTempo: {
    backgroundColor: '#374151',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  textoTempo: {
    fontSize: 18,
    color: '#fff',
  },
  textoNenhumTempo: {
    fontSize: 18,
    color: '#9ca3af',
  },
});

export default Cronometro;
