import React from 'react';

import GoogleMapReact from 'google-map-react';

const GMap = (coords) => {
    return (
        <div style={{ height: '30vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCjlHfNr3N3BX0zooiL9y_8p6gZ-I043gY' }}
                defaultCenter={coords}
                defaultZoom={6}>
                <MapPointer lat={coords.lat} lng={coords.lng} />
            </GoogleMapReact>
        </div>
    );
};

const MapPointer = () => (
    <div className="pointer" style={{
        width: '1rem',
        height: '1rem',
        backgroundColor: 'red',
        borderRadius: '100%'
    }}></div>
);

export default GMap;
