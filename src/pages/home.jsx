import { useState } from "react"
import { LeavingFrom } from "../components/LeavingFrom"
import { GoingTo } from "../components/GoingTo"
import { DateComp } from "../components/DateComp"
import { Travellers } from "../components/Travellers"

export const HomePage = () => {
    const [type, setType] = useState('one-way');
    const [addStay, setAddStay] = useState(false);
    const [addCar, setAddCar] = useState(false);
    
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

            <div style={{}}>
                {type === 'multi-city' && travelData.length > 0 && 
                    <Travellers
                        data={travelData[0]}
                        onChange={(field, value) => {
                            travelData.forEach((_, i) => {
                                updateTravelData(i, field, value);
                            });
                        }}
                    />
                }
            </div>
            
            {travelData.map((data, index) => (
                <div key={index} className="row" style={{ position: 'relative' }}>
                    <LeavingFrom 
                        value={data.from}
                        onChange={(value) => updateTravelData(index, 'from', value)}
                    />
                    <GoingTo 
                        value={data.to}
                        onChange={(value) => updateTravelData(index, 'to', value)}
                    />
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
                        <button
                            onClick={() => removeCity(index)}
                            style={{
                                position: 'absolute',
                                right: '-40px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                padding: '4px 8px'
                            }}
                        >
                            ✕
                        </button>
                    )}
                </div>
            ))}

            {type === 'multi-city' && travelData.length < 5 && (
                <button 
                    onClick={addNewCity}
                    style={{ marginTop: '16px', padding: '8px 16px' }}
                >
                    Add Another City
                </button>
            )}

            {type === 'one-way' && (
                <div style={{ marginTop: '20px' }}>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={addStay}
                            onChange={(e) => setAddStay(e.target.checked)}
                        /> Add place to stay
                    </label>
                </div>
            )}
            {type === 'return' && (
                <div style={{ marginTop: '20px' }}>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={addCar}
                            onChange={(e) => setAddCar(e.target.checked)}
                        /> Add a car
                    </label>
                </div>
            )}
        </div>
    )
}