import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import LoginDialog from '../../user/components/login/LoginDialog';
import Link from '../../link/Link';
import '../../../theme/theme';
import UserAction from '../../user/components/UserAction';
import MobileHeader from './mobile';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Header = styled('header')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 120px',
    [theme.breakpoints.down('lg')]: {
        padding: '24px 40px',
    },
    [theme.breakpoints.down('md')]: {
        padding: '24px 20px',
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
    [theme.breakpoints.up('xl')]: {
        maxWidth: 1366,
        padding: '24px 120px',
        margin: 'auto',
    },
}));

const headerItems = [
    {
        name: 'دوره‌ها',
        href: '/courses',
    },
    {
        name: 'دربارۀ ما',
        href: '/about-us',
    },
    {
        name: 'همکاری با ما',
        href: '/work-with-us',
    },
];

const HeaderComponent = () => {
    const router = useRouter();
    return (
        <>
            <Header>
                <Link href={'/'}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Image
                            src={'/logo.png'}
                            alt={'دانشگاه صنعتی نوشتیروانی بابل'}
                            width={50}
                            height={65}
                        />
                        <Typography
                            variant='h4'
                            color={'primary'}
                            sx={{ mr: 1.5 }}>
                            {'نیـــت‌آرشیو'}
                        </Typography>
                    </Box>
                </Link>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    flexBasis={'30%'}
                    justifyContent={'space-between'}>
                    {headerItems.map((item, key) => (
                        <Link
                            sx={{
                                textDecoration: 'none',
                                borderBottom: '2px solid transparent',
                                transition: 'border-color .3s',
                                '&: hover': {
                                    borderColor: 'primary.main',
                                },
                                ...(router.asPath.includes(item.href)
                                    ? { borderColor: 'primary.main' }
                                    : {}),
                            }}
                            href={item.href}
                            key={key}>
                            <Typography
                                variant='h6'
                                sx={{ color: 'text.secondary' }}>
                                {item.name}
                            </Typography>
                        </Link>
                    ))}
                </Box>
                <UserAction />
            </Header>
            <MobileHeader />
            <LoginDialog />
        </>
    );
};

export default HeaderComponent;
