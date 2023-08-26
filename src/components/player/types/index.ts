import videojs from 'video.js';

export interface TimeRange {
    start: number;
    end: number;
}

export interface Store {
    loading: boolean;
    error: boolean;
    isPlaying: boolean;
}

export interface Action {
    type: ActionType;
    payload?: any;
}

export enum ActionType {
    PLAYER_READY = 'PLAYER_READY',
    PLAYER_QUALITY_LEVEL = 'PLAYER_QUALITY_LEVEL',
    PLAYER_LEVELS = 'PLAYER_LEVELS',
    PLAYER_PLAYBACK_RATE = 'PLAYER_PLAYBACK_RATE',
    PLAYER_VOLUME = 'PLAYER_VOLUME',
    PLAYER_LOAD_PROGRESS = 'PLAYER_LOAD_PROGRESS',
    PLAYER_DURATION = 'PLAYER_DURATION',
    PLAYER_CURRENT_TIME = 'PLAYER_CURRENT_TIME',
    PLAYER_PLAYBACK_RATES = 'PLAYER_PLAYBACK_RATES',
    PLAYER_FULLSCREEN = 'PLAYER_FULLSCREEN',
    PLAYER_PIP = 'PLAYER_PIP',
    PLAYER_LOADING = 'PLAYER_LOADING',
    PLAYER_ERROR = 'PLAYER_ERROR',
    PLAYER_AUTO_PLAYBACK_RATE = 'PLAYER_AUTO_PLAYBACK_RATE',
    PLAYER_STATUS = 'PLAYER_STATUS',
    PLAYER_SEEK = 'PLAYER_SEEK',
}

export interface PlayerContext {
    playerRef?: PlayerRef;
    store: Store;
    dispatch: React.Dispatch<Action>;
}

export interface PlayerRef {
    videoNode: React.MutableRefObject<HTMLVideoElement | null>;
    player: React.MutableRefObject<videojs.Player | null>;
    playerWrapper: React.MutableRefObject<HTMLElement | null>;
}
