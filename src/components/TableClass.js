import React, { Component } from "react";


class TableClass extends Component{
    constructor(props){
        super(props);
        this.state = {
            currencies: {},
            loading: true,
            time: '',
        };
    }

componentDidMount() {
    this.fetchCurrencyData();
}

fetchCurrencyData = async() => {
    try{
        const response = await fetch(
            `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=402ffe29451d4f78907a4c22e3fa844e`
        );
        const data = await response.json();
        this.setState( {
            currencies: data.rates,
            time: data.date,
            loading: false,
        } );
    }
    catch(error) {
        console.error("Fetching data error:", error);
        this.setState({ loading: false });
    }
};

render() {
    const { currencies, loading, time } = this.state;

    const selectedCurrencies = ["CAD", "EUR", "IDR", "JPY", "CHF", "GBP"];

    return (
      <div className="hero bg-base-200 min-h-screen bg-orange-500">
        <div className="hero-content text-center">
            <div className="max-w-md">
                <div className="overflow-x-auto">
                    <h2>Currency Exchange Rates by FachriUmar</h2>
                    {time && <p>Waktu : {time}</p>}
                    {loading ? (
                    <p>Loading...</p>
                    ) : (
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Currency</th>
                            <th>We Buy</th>
                            <th>Exchange Rate</th>
                            <th>We Sell</th>
                        </tr>
                        </thead>
                        <tbody>
                        {selectedCurrencies.map((currency) => {
                            const rate = currencies[currency];
                            if (rate) {
                            const exchangeRate = parseFloat(rate); 
                            const weBuy = (exchangeRate * 1.05).toFixed(4); 
                            const weSell = (exchangeRate * 0.95).toFixed(4); 

                            return (
                                <tr key={currency}>
                                <td>{currency}</td>
                                <td>{weBuy}</td>
                                <td>{exchangeRate.toFixed(4)}</td>
                                <td>{weSell}</td>
                                </tr>
                            );
                            } else {
                            return null; 
                            }
                        })}
                        </tbody>
                    </table>
                    )}
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default TableClass;