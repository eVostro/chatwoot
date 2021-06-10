#!/usr/bin/env bash

# Description: bnk2 installation script
# OS: Ubuntu 20.04 LTS / Ubuntu 20.10
# Script Version: 0.5
# Run this script as root

apt update && apt upgrade -y
apt install -y curl
curl -sL https://deb.nodesource.com/setup_12.x | bash -
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt update

apt install -y \
	git software-properties-common imagemagick libpq-dev \
    libxml2-dev libxslt1-dev file g++ gcc autoconf build-essential \
    libssl-dev libyaml-dev libreadline-dev gnupg2 nginx redis-server \
    redis-tools postgresql postgresql-contrib certbot \
    python3-certbot-nginx nodejs yarn patch ruby-dev zlib1g-dev liblzma-dev \
    libgmp-dev libncurses5-dev libffi-dev libgdbm6 libgdbm-dev nginx-full

adduser --disabled-login --gecos "" op2

gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
gpg2 --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
curl -sSL https://get.rvm.io | bash -s stable
addgroup bnk2 rvm

pg_pass=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 15 ; echo '')
sudo -i -u postgres psql << EOF
\set pass `echo $pg_pass`
CREATE USER bnk2 CREATEDB;
ALTER USER bnk2 PASSWORD :'pass';
ALTER ROLE bnk2 SUPERUSER;
UPDATE pg_database SET datistemplate = FALSE WHERE datname = 'template1';
DROP DATABASE template1;
CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UNICODE';
UPDATE pg_database SET datistemplate = TRUE WHERE datname = 'template1';
\c template1
VACUUM FREEZE;
EOF

systemctl enable redis-server.service
systemctl enable postgresql

secret=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 63 ; echo '')
RAILS_ENV=production

sudo -i -u bnk2 << EOF
rvm --version
rvm autolibs disable
rvm install "ruby-2.7.2"
rvm use 2.7.2 --default

git clone https://github.com/op2/op2.git
cd op2
if [[ -z "$1" ]]; then
git checkout master;
else
git checkout $1;
fi
bundle
yarn

cp .env.example .env
sed -i -e "/SECRET_KEY_BASE/ s/=.*/=$secret/" .env
sed -i -e '/REDIS_URL/ s/=.*/=redis:\/\/localhost:6379/' .env
sed -i -e '/POSTGRES_HOST/ s/=.*/=localhost/' .env
sed -i -e '/POSTGRES_USERNAME/ s/=.*/=op2/' .env
sed -i -e "/POSTGRES_PASSWORD/ s/=.*/=$pg_pass/" .env
sed -i -e '/RAILS_ENV/ s/=.*/=$RAILS_ENV/' .env

RAILS_ENV=production bundle exec rake db:create
RAILS_ENV=production bundle exec rake db:reset
rake assets:precompile RAILS_ENV=production
EOF

cp /home/op2/op2/deployment/op2-web.1.service /etc/systemd/system/op2-web.1.service
cp /home/op2/op2/deployment/op2-worker.1.service /etc/systemd/system/op2-worker.1.service
cp /home/op2/op2/deployment/op2.target /etc/systemd/system/op2.target

systemctl enable op2.target
systemctl start op2.target

read -p 'Would you like to configure Webserver and SSL (yes or no): ' configure_webserver

if [ $configure_webserver != "yes" ]
then
echo "Woot! Woot!! bnk2 server installation is complete"
echo "The server will be accessible at http://<server-ip>:3000"
echo "To configure a domain and SSL certificate, follow the guide at https://www.op2.com/docs/deployment/deploy-op2-in-linux-vm"
else
read -p 'What is your domain name server (op2.domain.com for example) : ' domain_name
curl https://ssl-config.mozilla.org/ffdhe4096.txt >> /etc/ssl/dhparam
wget https://raw.githubusercontent.com/op2/op2/develop/deployment/nginx_op2.conf
cp nginx_op2.conf /etc/nginx/sites-available/nginx_op2.conf
certbot certonly --nginx -d $domain_name
sed -i "s/op2.domain.com/$domain_name/g" /etc/nginx/sites-available/nginx_op2.conf
ln -s /etc/nginx/sites-available/nginx_op2.conf /etc/nginx/sites-enabled/nginx_op2.conf
systemctl restart nginx
sudo -i -u bnk2 << EOF
cd op2
sed -i "s/http:\/\/0.0.0.0:3000/https:\/\/$domain_name/g" .env
EOF
systemctl restart op2.target
echo "Woot! Woot!! bnk2 server installation is complete"
echo "The server will be accessible at https://$domain_name"
fi
