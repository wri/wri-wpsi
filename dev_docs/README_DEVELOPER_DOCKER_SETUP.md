## Developer Setup for Docker

#### Service stack for local development:
- the app and related services run locally in docker containers (web, webpacker, postgres, etc)
- the nginx-proxy service (aslo a docker container) proxies wri.dev.test to the "web" container over HTTPS using a self-signed certificate for `*.dev.test`
- host records for wri.dev.test are added to your local /etc/hosts and resolves to localhost


#### Docker config
It's assumed you'll be developing in docker. Please install [docker desktop](https://www.docker.com/products/docker-desktop/). The following setup steps assume you have docker desktop installed and docker is running already.

Suggested settings for docker desktop v4.11:
- Under docker settings/resources, give docker at least 8GB of memory
- Under docker settings/experimental features, enable VirtioFS

### Setup steps:

##### 1) setup nginx-proxy, skip this step if you already have it running. (You only need one proxy, no need to add a new one if you are using it for another project)

Setup example, assuming you're keeping work in `~/projects`:
```
cp -a dev_docs/nginx-proxy ~/projects/nginx-proxy
# generate self-signed cert
cd ~/projects/nginx-proxy/certs
bash generate_certs.sh for `*.dev.test`
# build and start nginx-proxy
docker-compose up -d
```

##### 2) After installing nginx proxy, you will need to tell your OS to trust the self-signed cert for `*.dev.test`

This step is optional, the app can run over plain http. However https is recommended to best replicate the production environment .

When setting up nginx-proxy, you generated a self-signed certificate. To get your browser to use this certificate, you need to tell the OS to trust it: Open up Keychain and copy (or drag-and-drop) the dev.test.crt into your System keychain (note this must be the system keychain, not the login keychain). Open the certificate in the keychain and expand to show the trust setting. Then change the settings to always trust. [Instructions scraped from VMWare docs](https://docs.vmware.com/en/Horizon-FLEX/1.12/com.vmware.horizon.flex.admin.doc/GUID-23DDDCF8-B59A-439E-97F1-DFFE92616EF0.html)

##### 3) Add host records for this project to /etc/hosts (or you can use dnsmasq if you prefer):
```
#wri
127.0.0.1  wri.dev.test
127.0.0.1  wri-webpack.dev.test
127.0.0.1  mail-wri.dev.test
::1        wri.dev.test
::1        wri-webpack.dev.test
::1        mail-wri.dev.test

```

##### 4) Now go back to this application's src directory and build the containers:
```
# copy and edit .env and enable the appropriate `COMPOSE_FILE`.
cp .env.docker-compose .env

cd ~/projects/wri-wpsi
docker-compose build shell
```

##### 5) add docker-compose run as an alias (optional)
This command is handy to have as a shell shortcut
```
# add in ~/.bash_profile
alias dcr='docker-compose run --rm'
```

##### 6) Setup the application

Once the containers are built, you'll need to setup the application within the container. There's a stand-alone `shell` container defined in docker-compose file that gives you a quick shell

```
host$ dcr shell
shell$ cp env.sample .env.local
# the setup script will install the dependencies
shell$ ./bin/setup
```

Use the rails console to create a new user:
```
$ rails c
irb(main):001:0> User.create email:"admin-wri-1@example.com", password:"password"
```

```
docker-compose up
# app should be available at https://wri.dev.test/

# when you're finished, bring everything down with:
docker-compose down
```

#### Running tests
You can run the tests to verify everything is working with:
```
host$ dcr test_runner
```

#### Hints / Misc / Notes
* local mail is sent to mailhog, you can view the inbox at http://mail-wri.dev.test
* I use vscode's remote-development extension to connect to the docker container directly, that gives me access to integrated tooling inside the container (rubocop, eslint, etc)
* vscode's remote-development extension will forward your ssh keys into the container (you might need to run `ssh-add -A` before starting vscode). That allows you to interact with guthub inside the conatainer
