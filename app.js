const Sentry = require('@sentry/node');

const path = require('path');
const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const BootstrapHelper = require('./helpers/bootstrap-helper');
const { sentry: SentryConfig } = require('./config');
const { swagger } = require('./config');
const healthRouter = require('./server/routes/health');
const userRouter = require('./server/routes/user');
const authRouter = require('./server/routes/auth');
const siteSettingRouter = require('./server/routes/site-setting');
const experienceRouter = require('./server/routes/experience');
const projectRouter = require('./server/routes/project');
const postRouter = require('./server/routes/post');
const blogPostRouter = require('./server/routes/blog-post');
const skillRouter = require('./server/routes/skill');
const { logRequest } = require('./helpers/request-helper');

BootstrapHelper.bootstrapStart();

const app = express();

Sentry.init({
  dsn: SentryConfig.dsn,
  environment: SentryConfig.environment,
  release: SentryConfig.release,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true,
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: SentryConfig.environment === 'dev' ? 1.0 : 0,
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  function afterResponse() {
    res.removeListener('finish', afterResponse);
    res.removeListener('close', afterResponse);

    logRequest(req, res);
  }

  res.on('finish', afterResponse);
  res.on('close', afterResponse);

  req.requestDate = new Date();
  next();
});

app.use('/', healthRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/setting', siteSettingRouter);
app.use('/experience', experienceRouter);
app.use('/project', projectRouter);
app.use('/post', postRouter);
app.use('/blog', blogPostRouter);
app.use('/skill', skillRouter);

if (swagger.isActive) {
  BootstrapHelper.createSwaggerJson();
  // eslint-disable-next-line global-require
  const SwaggerUi = require('swagger-ui-express');
  // eslint-disable-next-line global-require
  const swaggerJson = require('./swagger.json');
  app.use('/documentation', SwaggerUi.serve, SwaggerUi.setup(swaggerJson));
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;