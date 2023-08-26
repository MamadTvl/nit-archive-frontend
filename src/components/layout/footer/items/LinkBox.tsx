import { Grid, Typography } from '@mui/material';
import Link from '../../../link/Link';

const LinkBox: React.FC<LinkBoxProps> = ({ title, links }) => {
    return (
        <Grid
            container
            direction={'column'}
            spacing={2}
            alignItems={'center'}
            justifyContent={'center'}>
            {title && (
                <Grid item xs={12}>
                    <Typography variant={'h6'} color={'text.black'}>
                        {title}
                    </Typography>
                </Grid>
            )}
            {links.map((item, index) => {
                return (
                    <Grid item xs={12} key={index}>
                        <Link
                            disabled={!item.href}
                            href={item.href || ''}
                            onClick={item.action}
                            key={index}>
                            <Typography
                                sx={{
                                    cursor: 'pointer',
                                    transition: 'color .3s',
                                    '&:hover': {
                                        color: 'primary.main',
                                    },
                                }}
                                variant='subtitle2'
                                color={'text.dark'}>
                                {item.text}
                            </Typography>
                        </Link>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export interface LinkBoxProps {
    title?: string;
    links: Array<{
        href?: string;
        text: string;
        action?: () => void;
    }>;
}

export default LinkBox;
