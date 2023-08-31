import { Dialog, IconButton } from '@mui/material';
import Form from './Form';
import SkipIcon from '../../../icons/SkipIcon';
import { useUserStore } from '../../store/store';

const LoginDialog = () => {
    const [loginDialog, openLoginDialog] = useUserStore((s) => [
        s.loginDialog,
        s.openLoginDialog,
    ]);
    return (
        <Dialog
            onClose={() => openLoginDialog(false)}
            PaperProps={{
                sx: {
                    maxHeight: 457,
                    height: '100%',
                    width: 400,
                    p: 2.5,
                    pt: 5,
                    justifyContent: 'space-between',
                    borderRadius: 2,
                    position: 'relative',
                    backgroundColor: '#fff',
                },
            }}
            open={loginDialog}>
            <IconButton
                onClick={() => openLoginDialog(false)}
                sx={{ position: 'absolute', right: 8, top: 8 }}>
                <SkipIcon />
            </IconButton>
            <Form />
        </Dialog>
    );
};
export default LoginDialog;
