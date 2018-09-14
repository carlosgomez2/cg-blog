---
layout: post
type: post
title: Development Environment on Manjaro
cover: /assets/post-assets/008-development-environment-on-manjaro/img/thumb.jpg
styles: <link rel="stylesheet" href="/cg-blog/assets/post-assets/008-development-environment-on-manjaro/css/main.css" type="text/css" media="screen" /> <link rel="stylesheet" href="/cg-blog/assets/post-assets/008-development-environment-on-manjaro/css/thankful_eyes.css" type="text/css" media="screen" />
date: 2018-07-25 05:35:00 +0000
---
{::options parse_block_html="true" /}

<div class="container">

# Manjaro Post Install Guide

{:.date}
{{ page.date | date: "%B %e, %Y" }}

Manjaro is my distribution that I choose for development environment, works quite well in my old Asus ROG G75VW, before Manjaro used Ubuntu 16.04 that I loved but their packages were somewhat old and I wanted to try Plasma 5 but not with distributions that came from Debian.

The option was clear and easy, Arch was what most suited for me. Previously I had tried Arch but I did not like that I had to spend days configuring my laptop to had everything I need to work. I had never tried Manjaro, I knew it was derivative from Arch but I was not sure that he would work well on my computer.

I tested and I love it!

By default Manjaro has many many packages that I used to install on Ubuntu after install, no more with Manjaro this saves me lot of time.

So, no more talk. This is my configuration for set a basic Ruby on Rails development environment.

![Manjaro](/cg-blog/assets/post-assets/008-development-environment-on-manjaro/img/manjaro-logo.png){:class="img-logo"}

## Development

List of tools that I used to install:

- OhMyZsh
- RoR
- Rbenv
- MariaDB
- Powerline Fonts
- Misc. Gems
- Meteor
- Redis
- PostgreSQL

### OhMyZsh

- Install script:

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`

- Copy .zsh folder into home folder
- Copy ~/.zshrc into home folder
- Copy ~/.bashrc into home folder

### Install Fonts

```shell
cd /tmp
git clone https://github.com/powerline/fonts.git --depth=1
cd fonts
# Install fonts
./install.sh
# clean
cd ..
rm -rf fonts
cd ~
# Reload font cache
fc-cache -vf
# Space Mono for Powerline Regular 14 is my terminal font
```

### Install MariaDb

Instructions on [Gitlab Snippet](https://gitlab.com/snippets/1737399.js)

### Install rbenv

```shell
cd
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
# Export path environment variable to .zshrc & .bashrc
rbenv install 2.3.7
rbenv global 2.3.7
exec $SHELL
# Or reopen terminal
ruby -v
# Install bundle
gem install bundler
# Rehash
rbenv rehash
```

### Problems with Ruby installation

**BUILD FAILED (ManjaroLinux 17.1.11 using ruby-build 20180618-9-g00490d3)**

```shell
sudo pacman -S  base-devel libffi libyaml openssl zlib openssl-1.0
which gcc
# /usr/bin/gcc
PKG_CONFIG_PATH=/usr/lib/openssl-1.0/pkgconfig CC=/usr/bin/gcc rbenv install 2.3.7
```

If /tmp no space left?

`sudo rm -rf /tmp/*`

If still fails

```shell
sudo pacman -Ss gcc5
# community/gcc54 5.4.1-1
# Install current gcc5 version
sudo pacman -S gcc54
# try again wich gcc path in PKG_CONFIG_PATH
```

Sources: [Manjaro](https://github.com/rbenv/ruby-build/issues/1118), [Arch](https://github.com/rbenv/ruby-build/issues/930)

### Configure Git

```shell
git config --global color.ui true
git config --global user.name "Carlos Gomez"
git config --global user.email "carlosgomez.deb@gmail.com"
# copy your .ssh folder or create a new key and add to github and gitlab
ssh-keygen -t rsa -b 4096 -C "carlosgomez.deb@gmail.com"
cat ~/.ssh/id_rsa.pub
# Github
ssh -T git@github.com
# Gitlab
ssh -T git@gitlab.com
```

### Rails 5.0.7 retrocompatible with 5.0.0.1

```shell
# Install Rails
gem install rails -v 5.0.7
rbenv rehash
# Check version
rails -v
# Rails 5.0.7
```

### Gems

```shell
gem install foreman rubocop jekyll github-pages
# optional if I am working with ecommerce
gem install spree
```

### MeteorJS

`curl https://install.meteor.com/ | sh`

### Redis

```shell
sudo pacman -S redis
sudo systemctl enable --now redis.service
# Check if Redis is up
sudo systemctl status redis.service
```

### PostgreSQL

```shell
sudo pacman -S postgresql
sudo su postgres -l # or sudo -u postgres -i
initdb --locale $LANG -E UTF8 -D '/var/lib/postgres/data/'
exit
sudo systemctl enable --now postgresql.service
# Check if PostgreSQL is up
sudo systemctl status postgresql.service
```

#### Setting up Postgres User

```sql
psql -U postgres
CREATE USER rasalghul PASSWORD 'toor';
-- if user exist
DROP USER rasalghul;
-- Grant privileges
ALTER ROLE rasalghul WITH SUPERUSER;
```

Source [Configure PostgreSQL](https://www.nanotutoriales.com/como-crear-un-usuario-y-asignarle-permisos-en-postgresql)

***

{:.date}
#### Carlos Gomez 2018
</div>
