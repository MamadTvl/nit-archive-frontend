// NOTICE: YOU MAY WANT TO MAKE THIS COMPONENT REUSABLE !
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    WorkWithUsFormType,
    WorkWithUsTextField,
} from '../../../pages/work-with-us';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import OutlinedInput from '../styled-components/OutlinedInput';
import usePost from '../../hooks/usePost';
import { toEnDigit } from '../../utils/convertDigits';
import { useSnackbar } from 'notistack';

const WorkWithUsForm: React.FC<{ form: WorkWithUsTextField[] }> = ({
    form,
}) => {
    const { enqueueSnackbar } = useSnackbar();
    const formik = useFormik({
        initialValues: {
            [WorkWithUsFormType.name]: '',
            [WorkWithUsFormType.phone]: '',
            [WorkWithUsFormType.message]: '',
        },
        validationSchema: yup.object().shape({
            [WorkWithUsFormType.name]: yup
                .string()
                .required('لطفا نام خود را وارد کنید'),
            [WorkWithUsFormType.phone]: yup
                .string()
                .min(11, 'شماره‌تماس اشتباه است')
                .max(11, 'شماره‌تماس اشتباه است')
                .required('لطفا شماره‌تماس خود را وارد کنید'),
            [WorkWithUsFormType.message]: yup
                .string()
                .required('متن پیام را وارد کنید'),
        }),
        onSubmit: (values) => {
            post(true);
        },
    });
    const { post, loading } = usePost<{ message: string }, { message: string }>(
        {
            body: {
                first_name: formik.values.name,
                phone: toEnDigit(formik.values.phone),
                message: formik.values.message,
            },
            config: {},
            url: '/utils/work-with-us',
            onSuccess: (data) => {
                enqueueSnackbar(data.message, { variant: 'success' });
            },
            onError: (error) => {
                enqueueSnackbar(error?.message || 'unexpected error', {
                    variant: 'error',
                });
            },
        }
    );

    return (
        <Box
            component={'form'}
            onSubmit={formik.handleSubmit}
            sx={{
                p: 3,
                backgroundColor: 'secondary.lightest',
                borderRadius: 1,
            }}>
            <Grid container spacing={4.5}>
                {form.map((field) => (
                    <Grid
                        item
                        key={field.type}
                        xs={12}
                        sm={field.type === WorkWithUsFormType.message ? 12 : 6}>
                        <Typography
                            variant={'body2'}
                            color={'text.primary'}
                            sx={{ mb: 1.5 }}>
                            {field.title}
                        </Typography>
                        <OutlinedInput
                            color={'secondary'}
                            fullWidth
                            sx={{
                                '& .MuiInputBase-input': {
                                    borderRadius: 1,
                                    height: 32,
                                    boxSizing: 'border-box',
                                },
                            }}
                            multiline={
                                field.type === WorkWithUsFormType.message
                            }
                            rows={
                                field.type === WorkWithUsFormType.message
                                    ? 4
                                    : 1
                            }
                            error={
                                formik.touched[field.type] &&
                                Boolean(formik.errors[field.type])
                            }
                            {...formik.getFieldProps(field.type)}
                        />
                        {formik.touched[field.type] &&
                            Boolean(formik.errors[field.type]) && (
                                <Typography
                                    sx={{ mt: 1 }}
                                    variant={'caption'}
                                    color={'error.main'}>
                                    {formik.touched[field.type] &&
                                        formik.errors[field.type]}
                                </Typography>
                            )}
                    </Grid>
                ))}
                <Grid display={'flex'} justifyContent={'flex-end'} item xs={12}>
                    <Button
                        sx={{
                            height: { xs: 40, sm: 48 },
                            width: { xs: '100%', sm: 143 },
                        }}
                        variant={'contained'}
                        type={'submit'}
                        disabled={loading}
                        color={'secondary'}>
                        {loading ? (
                            <CircularProgress color={'secondary'} size={29} />
                        ) : (
                            'ثبت'
                        )}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};
export default WorkWithUsForm;
