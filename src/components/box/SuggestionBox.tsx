import {
    Button,
    CircularProgress,
    Grid,
    InputAdornment,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import OutlinedInput from '../styled-components/OutlinedInput';

const SuggestionBox: React.FC<SuggestionBoxProps> = ({
    title,
    subtitle,
    inputPlaceholder,
    submitButtonText,
    value,
    setValue,
    onSubmit,
    loading,
}) => {
    return (
        <Grid
            container
            spacing={4.75}
            justifyContent={'center'}
            alignItems={'center'}>
            <Grid item xs={12}>
                <Typography
                    color={'text.secondary'}
                    align={'center'}
                    variant={'h4'}
                    sx={{ mb: 2.5 }}>
                    {title}
                </Typography>
                <Typography
                    color={'text.dark'}
                    align={'center'}
                    variant={'body1'}>
                    {subtitle}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box
                    onSubmit={onSubmit}
                    component={'form'}
                    display={'flex'}
                    sx={{ m: 'auto' }}
                    width={{ xs: '100%', sm: 395 }}>
                    <OutlinedInput
                        fullWidth
                        value={value}
                        onChange={(event) =>
                            !loading && setValue(event.target.value)
                        }
                        required
                        color={'primary'}
                        placeholder={inputPlaceholder}
                        sx={{
                            '& input': {
                                pl: '106px!important',
                            },
                        }}
                        endAdornment={
                            <InputAdornment
                                position={'end'}
                                sx={{
                                    position: 'absolute',
                                    left: 0,
                                }}>
                                <Button
                                    disabled={loading}
                                    type={'submit'}
                                    sx={{
                                        width: 95,
                                        height: 40,
                                        typography: 'button',
                                    }}
                                    variant='contained'
                                    color={'primary'}>
                                    {loading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        submitButtonText
                                    )}
                                </Button>
                            </InputAdornment>
                        }
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export interface SuggestionBoxProps {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    submitButtonText: string;
    loading?: boolean;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    onSubmit: (event: FormEvent) => void;
}

export default SuggestionBox;
