import React from 'react';

const TickerTape = () => {
    return (
        <div className="w-full z-10 relative">
            <tv-ticker-tape symbols='FOREXCOM:SPXUSD,FOREXCOM:NSXUSD,FOREXCOM:DJI,FX:EURUSD,BITSTAMP:BTCUSD,BITSTAMP:ETHUSD,CMCMARKETS:GOLD'></tv-ticker-tape>
        </div>
    );
};

export default TickerTape;
