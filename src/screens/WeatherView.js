import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {fetchWeather} from '../store/weatherSlice';
import WeatherItem from '../components/WeatherItem';

export default function WeatherView() {
  const dispatch = useDispatch();
  const {forecast, status, error} = useSelector(state => state.weather);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  const filterHourlyData = () => {
    if (!forecast || !forecast.data || !forecast.data.timelines) {
      return [];
    }
    // Filtrer les timelines où 'timestep' est égal à '1h'
    const hourlyData = forecast.data.timelines.filter(
      timeline => timeline.timestep === '1h',
    );

    // Extraire les valeurs nécessaires pour l'affichage
    return hourlyData.flatMap(timeline =>
      timeline.intervals.map(interval => ({
        windSpeed: interval.values.windSpeed,
        temperature: interval.values.temperature,
        apparentTemperature: interval.values.temperatureApparent,
      })),
    );
  };

  const onReload = () => {
    setRefresh(true);
    dispatch(fetchWeather()).finally(() => {
      setRefresh(false);
    });
  };
  
  const renderContent = () => {
    const filteredData = filterHourlyData(); // Récupérer les données filtrées
    return (
      <>
        <Text style={styles.infoText}>
          Voici les prévisions météorologiques pour les 24 prochaines heures. Vous
          trouverez les informations sur la température, la température ressentie
          et la vitesse du vent pour chaque heure.
        </Text>
  
        {/* Vérification si les données sont vides */}
        {filteredData.length === 0 ? (
          <Text style={styles.noDataText}>Aucune donnée disponible pour l'instant.</Text>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            refreshing={refresh}
            onRefresh={onReload}
            renderItem={({ item }) => <WeatherItem item={item} />}
          />
        )}
      </>
    );
  };

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
      <Text style={styles.loadingText}>Chargement en cours...</Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>
        une erreur est survenue! merci de réessayer: {error}
      </Text>
      <TouchableOpacity style={styles.reloadButton} onPress={onReload}>
        <Text style={styles.reloadButtonText}>Réessayer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Informations Météo</Text>
      </View>
      {status === 'loading' && renderLoading()}
      {status === 'failed' && renderError()}
      {status === 'succeeded' && renderContent()}
    </SafeAreaView>
  );
}

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  headerContainer: {
    backgroundColor: '#1976D2',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 16,
  },
  noDataText: {
    fontSize: 16,
    color: '#FF0000', // Par exemple, du rouge pour indiquer qu'il n'y a pas de données
    textAlign: 'center',
    marginTop: 20,
  },
  reloadButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    height: 60,
    backgroundColor: '#1976D2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6F00',
  },
  reloadButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 12,
    marginTop: 16,
  },
  errorText: {
    fontSize: 18,
    color: '#D32F2F',
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    marginTop: 16,
    padding: 20,
  },
  spinnerWrapper: {
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    shadowColor: '#1976D2',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  loadingText: {
    fontSize: 18,
    color: '#1976D2',
    fontWeight: '600',
    textAlign: 'center',
    opacity: 0.8,
  },
};
