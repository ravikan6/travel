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

    const TravellerCounter = ({ title, subtitle, value, type }) => (
        <div className="traveler-counter">
            <div>
                <div>{title}</div>
                <div className="subtitle">{subtitle}</div>
            </div>
            <div className="counter-controls">
                <button onClick={() => updateCount(type, 'subtract')}>-</button>
                <span>{value}</span>
                <button onClick={() => updateCount(type, 'add')}>+</button>
            </div>
        </div>
    );

    return (
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
                <div className="traveler-popover-content">
                    <TravellerCounter
                        title="Adults"
                        subtitle="Age 13+"
                        value={data.adults}
                        type="adults"
                    />
                    <TravellerCounter
                        title="Children"
                        subtitle="Age 2-12"
                        value={data.children}
                        type="children"
                    />
                    <TravellerCounter
                        title="Infants"
                        subtitle="Under 2"
                        value={data.infants}
                        type="infants"
                    />
                </div>
            }
        />
    )
} 