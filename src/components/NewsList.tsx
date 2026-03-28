import React from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator, Text } from 'react-native';
import { NewsData } from '../../src/utils/handle-api';
import NewsItem from './NewsItem';

interface NewsListProps {
    itens: NewsData[],
    loading: boolean,
    error: string | null
}

export default function NewsList({ itens, loading, error }: NewsListProps) {

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Carregando notícias...</Text>
                </View>
                ) : error ? (
                <View style={styles.container}>
                    <Text style={styles.errorText}>Erro: {error}</Text>
                </View>
                ) : (
                <FlatList
                    data={itens}
                    renderItem={({item}) => <NewsItem title={item.title} image={item.image} published={item.published} link={item.link}/>}
                    keyExtractor={item => item.id.toString()}
                />
            )}
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
})