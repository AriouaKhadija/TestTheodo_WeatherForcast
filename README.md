This project is designed to create a simple weather application that leverages Mockoon to simulate a local weather API.

## KEY FEATURE :
-Retrieve weather data from a local mock server every hour ("timestep": "1h")

-Display the following weather details in a list:

*Wind speed
*Temperature
*"Feels like" temperature

-Implement "Pull to refresh" functionality to reload data

-Error handling for smooth user experience

-Show data when offline

-Includes unit tests for functionality validation


## How to Run the App

1. Clone the repository:
    ```bash
    git clone https://github.com/AriouaKhadija/TestTheodo_WeatherForcast
    cd theodoTestApp
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the Mockoon mock server:
    ```bash
    download Mockoon and use ./mockoonData/weather_mockoon (5).json environment
    ```

4. Run the application:
    ```bash
    npx react-native run-android
    ```

5. Current weather data will be displayed in a list.
6. Pull down on the list to refresh the data.
7. In case of errors, an error message will be displayed.
```bash

## Unit Tests

Unit tests are included in the project to verify the functionality. To run the tests: 
    ```bash
    npm test
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.