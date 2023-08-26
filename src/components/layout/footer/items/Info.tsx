import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from '../../../link/Link';

const Info: React.FC<InfoProps> = ({
    address,
    description,
    phone,
    socialMedia,
}) => {
    return (
        <Grid container rowSpacing={1}>
            <Grid item xs={12}>
                <Link href={'/'}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Image
                            src={'/logo.png'}
                            alt={'نیت‌آرشیو'}
                            width={22}
                            height={32}
                        />
                        <Typography
                            variant='h4'
                            color={'primary'}
                            sx={{ mr: 1.5 }}>
                            {'نیـــت‌آرشیو'}
                        </Typography>
                    </Box>
                </Link>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'subtitle2'} color={'text.dark'}>
                    {description}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    variant={'caption'}
                    color={'text.dark'}>{`شمارۀ تماس: ${phone}`}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    variant={'caption'}
                    color={'text.dark'}>{`آدرس: ${address}`}</Typography>
            </Grid>
            <Grid item container spacing={1} xs={12}>
                {socialMedia.map((item, index) => (
                    <Grid xs={2} key={index}>
                        <Link href={item.url}>{item.icon}</Link>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

interface SocialMedia {
    icon: React.ReactNode;
    url: string;
}

interface InfoProps {
    description: string;
    phone: string;
    address: string;
    socialMedia: SocialMedia[];
}

export default Info;
