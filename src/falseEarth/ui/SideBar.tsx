// @ts-nocheck
import { IconButton, Tooltip } from '@mui/material';
import { CameraMode, useGameStore } from '../core/store/gameStore';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useSceneStore } from '../../store/sceneStore';

export function SideBar() {
    const isMobile = useGameStore((state) => state.isMobile);
    
    const cameraMode = useGameStore((state) => state.cameraMode);
    const setCameraMode = useGameStore((state) => state.setCameraMode);

    const quality = useGameStore((state) => state.quality); 
    const toggleQuality = useGameStore((state) => state.toggleQuality); 
    const overlayMode = useSceneStore((state) => state.overlayMode);
    const hideOverlay = useSceneStore((state) => state.hideOverlay);
    const toggleOverlay = useSceneStore((state) => state.toggleOverlay);

    const cycleCameraMode = () => {
        hideOverlay();
        setCameraMode((cameraMode + 1) % 3);
    };

    const handleQualityToggle = () => {
        hideOverlay();
        toggleQuality();
    };

    const btnStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(4px)',
        borderRadius: '8px',
        padding: isMobile ? '8px' : '10px',
        border: '1px solid rgba(255,255,255,0.1)',
        transition: 'all 0.2s ease',
        color: 'white',

        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderColor: 'rgba(255,255,255,0.3)',
        },
    } as const;

    const iconBaseStyle = {
        fontSize: isMobile ? '20px' : '24px',
    };

    const qualityIconStyle = {
        ...iconBaseStyle,
        transition: 'color 0.3s ease, filter 0.3s ease',
        color: quality === 'high' ? '#4fc3f7' : 'rgba(255, 255, 255, 0.5)', 
        filter: quality === 'high' ? 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.5))' : 'none',
    };


    const cameraConfig = {
        [CameraMode.Follow]: {
            icon: <PersonIcon sx={iconBaseStyle} />,
            title: "Third Person"
        },
        [CameraMode.FPV]: {
            icon: <VisibilityIcon sx={iconBaseStyle} />,
            title: "First Person"
        },
        [CameraMode.Detached]: {
            icon: <ThreeSixtyIcon sx={iconBaseStyle} />,
            title: "Tripod View"
        },
    };
    const currentCamera = cameraConfig[cameraMode];

    const qualityTooltip = quality === 'high' ? 'Quality' : 'Performance';
    const overlayIconStyle = {
        ...iconBaseStyle,
        transition: 'color 0.3s ease, filter 0.3s ease',
        color: overlayMode === 'reference' ? '#c8a879' : 'rgba(255, 255, 255, 0.75)',
        filter: overlayMode === 'reference' ? 'drop-shadow(0 0 5px rgba(200, 168, 121, 0.45))' : 'none',
    };


    return (
        <div style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            pointerEvents: 'auto',
            zIndex: 50,
        }}>

            <Tooltip title={overlayMode === 'reference' ? 'Hide Atlas' : 'Open Atlas'} placement="left">
                <IconButton sx={btnStyle} onClick={toggleOverlay}>
                    <MenuBookIcon sx={overlayIconStyle} />
                </IconButton>
            </Tooltip>
            
            <Tooltip title={ qualityTooltip } placement="left">
                <IconButton sx={btnStyle} onClick={handleQualityToggle}>
                    <AutoAwesomeIcon sx={qualityIconStyle} />
                </IconButton>
            </Tooltip>

            <Tooltip title={currentCamera.title} placement="left">
                <IconButton sx={btnStyle} onClick={cycleCameraMode}>
                    {currentCamera.icon}
                </IconButton>
            </Tooltip>
        </div>
    );
}
