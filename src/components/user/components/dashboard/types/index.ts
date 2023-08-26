export interface DashboardItem {
    title: string;
    icon: React.ReactElement;
    href?: string;
    action?: () => void;
}
export enum UserInfoType {
    NAME = 'NAME',
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
    PASSWORD = 'PASSWORD',
}

export interface InfoBoxProps {
    title: string;
    editable: boolean;
    onEdit?: () => void;
    type: UserInfoType;
}
