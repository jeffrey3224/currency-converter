
# Currency Converter

This is a simple React-based Currency Converter application that uses real-time exchange rates from FXRatesAPI to convert amounts between five major currencies.


## Features

- Real-time exchange rates
- Convert between USD, BBP, EUR, JPY, and CAD to start, with option to filter more rates
- Simple, responsive UI
- Reset functionality
- Error handling for API failures


## How It Works

#### On component mount, the app fetches the latest exchange rates from the https://api.fxratesapi.com/latest endpoint.

#### The app initializes with a default conversion from USD to EUR.

#### Users can:

- Enter an amount
- Select the start and target currencies
- Select the start and target currencies
- View the converted result in real-time
- If rates fail to load within 5 seconds, an error message is shown.
- Users can reset to the default state using the Reset button.




## Tech Stack

**Client:** React (with Hooks), JavaScript, CSS


## License

[MIT](https://choosealicense.com/licenses/mit/)

