import { Popover } from "./popover"

export const LeavingFrom = ({ value, onChange }) => {
    return (
        <>
            <Popover
                trigger={
                    <div className="trigger-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pinned"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" /><circle cx="12" cy="8" r="2" /><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" /></svg>
                        <div className="content">
                            <span className="value">{value || 'Leaving from'}</span>
                        </div>
                    </div>
                }
                content={
                    <div style={{ padding: '8px' }}>
                        <div onClick={() => onChange('Delhi')}>Delhi</div>
                        <div onClick={() => onChange('Mumbai')}>Mumbai</div>
                        <div onClick={() => onChange('Bangalore')}>Bangalore</div>
                        <div onClick={() => onChange('Chennai')}>Chennai</div>
                        <div onClick={() => onChange('Kolkata')}>Kolkata</div>
                        <div onClick={() => onChange('Hyderabad')}>Hyderabad</div>
                    </div>
                }
            />
        </>
    )
} 