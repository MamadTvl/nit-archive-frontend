import getConfig from 'next/config';
import { getCookie } from './cookie';

const { publicRuntimeConfig } = getConfig();

export const dlBaseUrl = publicRuntimeConfig.dlBaseUrl;
export const domain = publicRuntimeConfig.domain;