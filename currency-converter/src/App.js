import './App.css';
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';

export function CurrencyConverter() {

const [currency, setCurrency] = useState(1);
const [startRate, setStartRate] = useState(1);
const [targetRate, setTargetRate] = useState(1);
const [startUnits, setStartUnits] = useState("USD")
const [targetUnits, setTargetUnits] = useState("EUR")
const [rates, setRates] = useState([]);
const [showError, setShowError] = useState(false);


const allowedCurrencies = ['USD', 'GBP', 'EUR', 'JPY', 'CAD'];

useEffect(() => {
  const fetchRates = async () => {
    try {
      const response = await fetch(`https://api.fxratesapi.com/latest`);
      const data = await response.json();
      const entries = Object.entries(data.rates);
      setRates(entries);

      const defaultStart = entries.find(([code]) => code === startUnits);
      const defaultTarget = entries.find(([code]) => code === targetUnits);

      if (defaultStart) setStartRate(defaultStart[1]);
      if (defaultTarget) setTargetRate(defaultTarget[1]);
    } catch (error) {
      console.log(error);
    }
  };
  fetchRates();
}, []);


const total = useMemo(() => {
    return currency * (targetRate / startRate);
  }, [currency, startRate, targetRate]);

const handleStartUnits = useCallback((e) => {
  const selectedName = e.target.value
  const currency = rates.find(([code]) => code === selectedName);
  const unit = e.target.options[e.target.selectedIndex].text;
  setStartRate(currency[1]);
  setStartUnits(unit);
})

const handleTargetExchange = useCallback((e) => {
  const selectedName = e.target.value
  const currency = rates.find(([code]) => code === selectedName);
  const unit = e.target.options[e.target.selectedIndex].text;
  setTargetRate(currency[1]);
  setTargetUnits(unit)
});

const resetAll = useCallback(() => {
  const defaultStartRate = rates.find(([code]) => code === "USD");
  const defaultTargetRate = rates.find(([code]) => code === "EUR")
  setCurrency(1);
  setTargetRate(defaultTargetRate[1]);
  setStartRate(defaultStartRate[1]);
  setStartUnits("USD");
  setTargetUnits("EUR");
});

useEffect(() => {
  if (rates.length < 1) {
    const timer = setTimeout(() => {
      setShowError(true);
    }, 5000); 

    return () => clearTimeout(timer);
  } else {
    setShowError(false);
  }
}, [rates]);


//{
  return (
    <div className="container">
    <div className={showError ? "screen-blackout" : "hidden"}>Error fetching data...</div>
    <h1>Currency Converter</h1>
    <p>Get conversion amounts using real time rates.</p>
    <p>Convert <strong>{startUnits}</strong> to <strong>{targetUnits}</strong></p>
    <input className="select-field" type="number" value={currency} onChange={e=>setCurrency(e.target.value)}/>
    <p>Start Currency</p>
    <select className="select-field" onChange={handleStartUnits} value={startUnits}>
      {rates.length > 0 ? rates.filter(([currency]) => allowedCurrencies.includes(currency)).map(([currency, rate])=>(
        <option value={currency} key={currency}>{currency}</option>)) : ""
      }
    </select>
    <p>Target Currency</p>
    <select className="select-field" onChange={handleTargetExchange} value={targetUnits}>
    {rates.length > 0 ? rates.filter(([currency]) => allowedCurrencies.includes(currency)).map(([currency, rate])=>(
        <option value={currency} key={currency}>{currency}</option>)) : ""
      }
    </select>
    <p className="total">Converted amount: {total.toFixed(2)} {targetUnits}</p>
    <button className="reset" onClick={resetAll}>Reset</button>
    </div>
  )
}

export default CurrencyConverter;
