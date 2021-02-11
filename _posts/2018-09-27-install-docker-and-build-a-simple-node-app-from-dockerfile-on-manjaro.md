---
layout: post
type: post
title: Install Docker and build a simple node app from dockerfile on Manjaro
cover: /assets/post-assets/004-install-docker-and-build-a-simple-node-app-from-dockerfile-on-manjaro/img/thumb.jpg
styles: <link rel="stylesheet" href="/cg-blog/assets/post-assets/004-install-docker-and-build-a-simple-node-app-from-dockerfile-on-manjaro/css/main.css" type="text/css" media="screen" /> <link rel="stylesheet" href="/cg-blog/assets/post-assets/004-install-docker-and-build-a-simple-node-app-from-dockerfile-on-manjaro/css/thankful_eyes.css" type="text/css" media="screen" />
date: 2018-09-27 10:23:00 +0000
---
{::options parse_block_html="true" /}

<div class="container">

# Install Docker and build a simple node app from dockerfile on Manjaro

{:.date}
{{ page.date | date: "%B %e, %Y" }}

First you need to install latest docker on Manjaro

`sudo pacman -S docker docker-compose docker-machine`

Then we need to enable on the startup docker

1. enable on startup `sudo systemctl enable docker`
2. start docker service `sudo systemctl start docker`
3. check the docker service status `sudo systemctl status docker` (must be active)
4. quit

Once pacman has been completed the installation of Docker on our system we need to do [Post-installation steps](https://docs.docker.com/install/linux/linux-postinstall/). now you should be able to use docker with `sudo` before docker command, but I do not like that, instead I need to create a 'docker' group and add my user to this new group and reboot or logout and login to make changes take effect, so.

Check versions of Docker you have:

```shell
docker -v
Docker version 18.06.1-ce, build e68fc7a215
docker-machine -v
docker-machine version 0.15.0, build HEAD
docker-compose -v
docker-compose version 1.22.0, build unknown
```
{:class="code-block"}
  
Use Docker without sudo:

1. Create docker group `sudo groupadd docker`
2. Add your user to docker group `sudo usermod -aG docker $USER`
3. logout or reboot to changes take effect

Now, create a [Docker Hub](https://hub.docker.com) account.

In a directory that you preffered, clone git@github.com:carlosgomez2/docker-course.git and cd into docker course directory. At this point we only work for this task in folder 'dockerfile-assignment-1', so enter directory and build the docker image

1. `docker build . -t node-6-app` to build image
2. `docker container run -p 80:3000 --rm node-6-app`
3. in browser go to localhost:80, you will see the app working

![](/cg-blog/assets/post-assets/004-install-docker-and-build-a-simple-node-app-from-dockerfile-on-manjaro/img/Screenshot_20180920_115443.png){:class="img-responsive"}

![](/cg-blog/assets/post-assets/004-install-docker-and-build-a-simple-node-app-from-dockerfile-on-manjaro/img/Screenshot_20180920_115554.png){:class="img-responsive"}

![](/cg-blog/assets/post-assets/004-install-docker-and-build-a-simple-node-app-from-dockerfile-on-manjaro/img/Screenshot_20180920_115743.png){:class="img-responsive"}

![](/cg-blog/assets/post-assets/004-install-docker-and-build-a-simple-node-app-from-dockerfile-on-manjaro/img/Screenshot_20180920_115838.png){:class="img-responsive"}

Then we need to push the app image container to Docker Hub, login in console, `docker login` add your credentials (be aware: if you are pushing from a remote or untrusted machine be sure to `docker logout` after you are done). Push your app `docker push carlosgg/node-6-app:latest`

### Optional:

We can remove image container locally and pull it from docker hub in this way:

1. remove local image container `docker image rm carlosgg/node-6-app`
2. list your images to ensure to you had removed image `docker image ls`
3. now run the image by pulling from Docker Hub `docker container run --rm -p 80:3000 carlosgg/node-6-app`
4. you will see in the CLI 'Unable to find image ... locally' and then 'Pulling from carlosgg/node-6-app'
5. open browser and go to localhost:80 

### Conclusion

Few steps to install docker and enable on Manjaro, download examples repo and use one of them to build a image container and push it to Docker Hub.

***

{:.date}
#### Carlos Gomez 2018
</div>
