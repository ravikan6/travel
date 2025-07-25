import { useState } from "react"
import { LeavingFrom } from "../components/LeavingFrom"
import { GoingTo } from "../components/GoingTo"
import { DateComp } from "../components/DateComp"
import { Travellers } from "../components/Travellers"

export const HomePage = () => {
    const [type, setType] = useState('one-way');
    const [addStay, setAddStay] = useState(false);
    const [addCar, setAddCar] = useState(false);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    // Centralized state for travel data
    const [travelData, setTravelData] = useState([{
        from: '',
        to: '',
        departDate: '',
        returnDate: '',
        adults: 1,
        children: 0,
        infants: 0
    }]);

    const updateTravelData = (index, field, value) => {
        setTravelData(prev => {
            const newData = [...prev];
            newData[index] = { ...newData[index], [field]: value };
            return newData;
        });
    };

    const addNewCity = () => {
        setTravelData(prev => [...prev, {
            from: '',
            to: '',
            departDate: '',
            returnDate: '',
            adults: prev[0].adults,
            children: prev[0].children,
            infants: prev[0].infants
        }]);
    };

    const removeCity = (index) => {
        if (travelData.length > 1) {
            setTravelData(prev => prev.filter((_, i) => i !== index));
        }
    };

    const handleSearch = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setResults('No results found');
        }, 1000);
    }

    return (
        <div className="home">
            <div className="body-nav">
                <button
                    className="nav"
                    data-state={type === 'return' ? 'active' : ''}
                    onClick={() => {
                        setType('return');
                        setTravelData([travelData[0]]);
                    }}
                >
                    Return
                </button>
                <button
                    className="nav"
                    data-state={type === 'one-way' ? 'active' : ''}
                    onClick={() => {
                        setType('one-way');
                        setTravelData([travelData[0]]);
                    }}
                >
                    One Way
                </button>
                <button
                    className="nav"
                    data-state={type === 'multi-city' ? 'active' : ''}
                    onClick={() => setType('multi-city')}
                >
                    Multi City
                </button>
            </div>

            {type === 'multi-city' && travelData.length > 0 && (
                <div className="traveler-section">
                    <Travellers
                        data={travelData[0]}
                        onChange={(field, value) => {
                            travelData.forEach((_, i) => {
                                updateTravelData(i, field, value);
                            });
                        }}
                    />
                </div>
            )}

            {travelData.map((data, index) => (
                <div key={index} className="row">
                    {/* <div className="row" style={{ gap: 0, marginBottom: 0 }}> */}
                    <LeavingFrom
                        value={data.from}
                        onChange={(value) => updateTravelData(index, 'from', value)}
                    />
                    <div className="connect">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-arrow-right-left-icon lucide-arrow-right-left"><path d="m16 3 4 4-4 4" /><path d="M20 7H4" /><path d="m8 21-4-4 4-4" /><path d="M4 17h16" /></svg>                        </div>
                    <GoingTo
                        value={data.to}
                        onChange={(value) => updateTravelData(index, 'to', value)}
                    />
                    {/* </div> */}
                    <DateComp
                        type={type}
                        departDate={data.departDate}
                        returnDate={data.returnDate}
                        onDepartDateChange={(value) => updateTravelData(index, 'departDate', value)}
                        onReturnDateChange={(value) => updateTravelData(index, 'returnDate', value)}
                    />
                    {index === 0 && type !== 'multi-city' && (
                        <Travellers
                            data={data}
                            onChange={(field, value) => {
                                updateTravelData(0, field, value);
                            }}
                        />
                    )}
                    {type === 'multi-city' && travelData.length > 1 && (
                        <div className="remove-city-container">
                            <button
                                className="remove-city"
                                onClick={() => removeCity(index)}
                                aria-label="Remove city"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>
            ))}

            <div className="search-button-container">
                {type === 'multi-city' && travelData.length < 5 && (
                    <button
                        onClick={addNewCity}
                        className="add-city"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                        Add Another City
                    </button>
                )}

                {(type === 'one-way' || type === 'return') && (
                    <div className="checkbox-container">
                        <label>
                            <input
                                type="checkbox"
                                checked={addStay}
                                onChange={(e) => setAddStay(e.target.checked)}
                            />
                            Add place to stay
                        </label>
                    </div>
                )}
                {type === 'return' && (
                    <div className="checkbox-container">
                        <label>
                            <input
                                type="checkbox"
                                checked={addCar}
                                onChange={(e) => setAddCar(e.target.checked)}
                            />
                            Add a car
                        </label>
                    </div>
                )}
                <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-start', marginLeft: 'auto' }}>
                    <button onClick={handleSearch} className="search-button">Search</button>
                </div>
            </div>
            {loading && <div>Loading...</div>}
            {results && <div>{results}</div>}
        </div>
    )
}