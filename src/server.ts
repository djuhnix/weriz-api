import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UserRoute from '@routes/user.route';
import validateEnv from '@utils/validateEnv';
import MemberRoute from '@routes/member.route';
import CommunityRoute from '@routes/community.route';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new UserRoute(), new MemberRoute(), new CommunityRoute()]);

app.listen();
