
import basicInfo from './basicInfo';
import server from './server';
import tags from './tags';
import component from './component';
import hello from './hello';
import user from './users';
import GetUser from './users/GetUser';

export default {
    ...basicInfo,
    ...server,
    ...tags,
    ...component,
    ...hello,
    ...user,
};