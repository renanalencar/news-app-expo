import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { fetchNewsService, NewsData } from './src/utils/handle-api';
import NewsList from './src/components/NewsList';

export default function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [newsList, setNewsList] = useState<NewsData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchNews();
    }, []);
    
    const fetchNews = async () => {
        try {
            setLoading(true);
            const data = await fetchNewsService();
            setNewsList(data);
        } catch (err: any) {
            setError(err.message || "Erro ao obter notícias");
        } finally {
            setLoading(false);
        }
    };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Image 
          source={require("./tasks/images/newspaper-banner.png")}
          style={{ width: 40, height: 40 }}
        />
        <Text style={styles.headerTitle}>Últimas notícias</Text>
        <Text style={styles.headerCounter}>{newsList.length} Notícias Encontradas</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={fetchNews}>
              <Text>Atualizar Lista</Text>
            </TouchableOpacity>
        </View>
      </View>

      <NewsList itens={newsList} loading={loading} error={error}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    gap: 10,
    paddingTop: 40, // Ensure header is spaced from exact top
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerCounter: {
    fontSize: 14,
    fontWeight: '200',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
  },
});
