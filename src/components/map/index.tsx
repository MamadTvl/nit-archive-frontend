import React from 'react';
import { NoSsr, Typography } from '@mui/material';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { mapMarker } from './icon';

const Map: React.FC = () => (
    <NoSsr>
        {typeof window !== 'undefined' && (
            <MapContainer
                style={{
                    height: 400,
                    borderRadius: 8,
                    zIndex: 1,
                }}
                center={[35.729172, 51.572041]}
                zoom={15}
                scrollWheelZoom={false}>
                <TileLayer
                    attribution=''
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={[35.729172, 51.572041]} icon={mapMarker}>
                    <Popup>
                        <a
                            href={'https://goo.gl/maps/cGhdr2Ar7mQdv9zn8'}
                            target={'_blank'}
                            rel='noreferrer'>
                            <Typography dir={'rtl'} variant={'h6'}>
                            نیت‌آرشیو در گوگل مپ
                            </Typography>
                        </a>
                    </Popup>
                </Marker>
            </MapContainer>
        )}
    </NoSsr>
);

export default Map;
