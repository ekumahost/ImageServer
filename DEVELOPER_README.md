
# BEFORE HOSTING APP / Migration / Deployments/ Running it: 

1. run app using>> npm run start  (must have run npm install to pull dependencies)
1.b run app using:>> DEBUG=imageServer:* npm start
1.c  using nodemon, do this >>> npm run dev  //// or [nodemon ./bin/www --watch  .]
1.d npm run test
RUNNING with DOCKER: (not suppoting nodemon yet)
make sure /src/routes/uploads is writable

# RUN TESTS with Mocha
>> npm run test
::: authomate with nodemon script(nodemon --exec 'mocha -R min)


