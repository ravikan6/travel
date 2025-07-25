import { Popover } from "./popover"

export const Travellers = ({ data, onChange }) => {
    const getTotalTravellers = () => {
        const total = data ? data.adults + data.children + data.infants : 0;
        return `${total} Traveller${total > 1 ? 's' : ''}`;
    };

    const updateCount = (type, operation) => {
        let value;
        switch (type) {
            case 'adults':
                value = operation === 'add'
                    ? Math.min(data.adults + 1, 9)
                    : Math.max(data.adults - 1, 1);
                onChange('adults', value);
                if (data.infants > value) {
                    onChange('infants', value);
                }
                break;
            case 'children':
                value = operation === 'add'
                    ? Math.min(data.children + 1, 9)
                    : Math.max(data.children - 1, 0);
                onChange('children', value);
                break;
            case 'infants':
                value = operation === 'add'
                    ? Math.min(data.infants + 1, data.adults)
                    : Math.max(data.infants - 1, 0);
                onChange('infants', value);
                break;
        }
    };

    return (
        <>
            <Popover
                trigger={
                    <div className="trigger-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        <div className="content">
                            <span className="value">{getTotalTravellers()}</span>
                        </div>
                    </div>
                }
                content={
                    <div style={{ padding: '16px', minWidth: '250px' }}>
                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <div>
                                    <div>Adults</div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>Age 13+</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <button onClick={() => updateCount('adults', 'subtract')} style={{ padding: '4px 8px' }}>-</button>
                                    <span>{data.adults}</span>
                                    <button onClick={() => updateCount('adults', 'add')} style={{ padding: '4px 8px' }}>+</button>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <div>
                                    <div>Children</div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>Age 2-12</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <button onClick={() => updateCount('children', 'subtract')} style={{ padding: '4px 8px' }}>-</button>
                                    <span>{data.children}</span>
                                    <button onClick={() => updateCount('children', 'add')} style={{ padding: '4px 8px' }}>+</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <div>
                                    <div>Infants</div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>Under 2</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <button onClick={() => updateCount('infants', 'subtract')} style={{ padding: '4px 8px' }}>-</button>
                                    <span>{data.infants}</span>
                                    <button onClick={() => updateCount('infants', 'add')} style={{ padding: '4px 8px' }}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    )
} 