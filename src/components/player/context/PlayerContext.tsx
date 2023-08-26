import React, { FC, ReactNode, useReducer } from 'react';
import videojs from 'video.js';
import 'videojs-contrib-quality-levels';
import { Action, PlayerContext, PlayerRef, Store } from '../types';

const initialStates: Store = {
    error: false,
    isPlaying: false,
    loading: true,
};

const playerContext = React.createContext({
    store: initialStates,
    dispatch: () => {},
    refs: undefined,
} as PlayerContext);

const reducer = (store: Store, action: Action): Store => {
    switch (action.type) {
        default:
            return store;
    }
};

const useProvidePlayer = (): PlayerContext => {
    const [store, dispatch] = useReducer(reducer, initialStates);
    const playerRef: PlayerRef = {
        videoNode: React.useRef<HTMLVideoElement>(null),
        player: React.useRef<videojs.Player | null>(null),
        playerWrapper: React.useRef<HTMLElement | null>(null),
    };
    return {
        store,
        dispatch,
        playerRef,
    };
};

const ProvidePlayer: FC<{ children: ReactNode }> = ({ children }) => {
    const value = useProvidePlayer();
    return (
        <playerContext.Provider value={value}>
            {children}
        </playerContext.Provider>
    );
};

export const usePlayer = () => {
    const context = React.useContext(playerContext);
    if (!context) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};

export default ProvidePlayer;
