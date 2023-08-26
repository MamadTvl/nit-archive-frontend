import { MutableRefObject, useCallback, useEffect, useMemo } from 'react';
import { usePlayer } from '../context/PlayerContext';
import videojs from 'video.js';
import videojsQualitySelector from 'videojs-hls-quality-selector';
import 'videojs-contrib-quality-levels';

const Player: React.FC<{
    playerOptions?: videojs.PlayerOptions;
    src: string;
    poster?: string;
    tracks?: videojs.PlayerOptions['tracks'];
}> = (props) => {
    const { playerRef } = usePlayer();
    if (!playerRef) {
        throw new Error('Player ref is not defined');
    }
    const { videoNode, player, playerWrapper } = playerRef;
    const playerOptions: videojs.PlayerOptions = useMemo(() => {
        return {
            sources: [{ src: props.src }],
            controls: true,
            autoplay: false,
            responsive: false,
            poster: props.poster,
            userActions: undefined,
            aspectRatio: '16:9',
            playbackRates: [0.5, 1, 1.5, 2, 2.5, 3],
            html5: {
                nativeAudioTracks: false,
                nativeVideoTracks: false,
            },
            controlBar: {
                pictureInPictureToggle: false,
            },
            tracks: props.tracks,
            ...props.playerOptions,
        };
    }, [props.playerOptions, props.poster, props.src, props.tracks]);

    const onPlayerReady = useCallback(() => {
        if (player.current) {
            // @ts-ignore
            player.current.hlsQualitySelector = videojsQualitySelector;
            // @ts-ignore
            player.current.hlsQualitySelector({
                displayCurrentQuality: true,
            });
            // @ts-ignore
            player.current.qualityLevels();
        }
    }, [player]);

    useEffect(() => {
        if (!player.current) {
            if (!videoNode) return;
            player.current = videojs(
                videoNode.current as Element,
                playerOptions,
                onPlayerReady
            );
        } else {
            if (player.current.src() !== props.src) {
                player.current.src(props.src);
            }
        }
    }, [onPlayerReady, player, playerOptions, props.src, videoNode]);

    // Dispose the Video.js player when unmounts
    useEffect(() => {
        return () => {
            if (player.current) {
                player.current.dispose();
                player.current = null;
            }
        };
    }, [player]);

    return (
        <div
            data-vjs-player
            style={{ borderRadius: 8, position: 'relative' }}
            ref={playerWrapper as MutableRefObject<HTMLDivElement>}>
            <video
                className='video-js vjs-big-play-centered'
                playsInline
                ref={videoNode}>
                {props.tracks?.map((track, index) => (
                    <track
                        key={index}
                        label={track.label}
                        kind={track.kind}
                        srcLang={track.language}
                        src={track.src}
                        default={track.default}
                    />
                ))}
            </video>
        </div>
    );
};

export default Player;
