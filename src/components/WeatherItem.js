const {View, Text} = require('react-native');

const WeatherItem = ({item}) => (
  <View style={styles.cardContainer}>
    <Text style={styles.weatherIcon}>🌤</Text>
    <View>
      <Text style={styles.weatherInfo}>
        Vitesse du vent :{' '}
        <Text style={styles.value}>{item.windSpeed} km/h</Text>
      </Text>
      <Text style={styles.weatherInfo}>
        Température : <Text style={styles.value}>{item.temperature}°C</Text>
      </Text>
      <Text style={styles.weatherInfo}>
        Température apparente :{' '}
        <Text style={styles.value}>{item.temperatureApparent}°C</Text>
      </Text>
    </View>
  </View>
);

const styles = {
  cardContainer: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  weatherIcon: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 8,
  },
  weatherInfo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    color: '#1976D2',
  },
};

export default WeatherItem;
