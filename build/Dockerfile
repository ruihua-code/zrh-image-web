FROM centos:7
# FROM nginx:latest
RUN rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm \
    && yum -y install nginx
COPY dist /home/web
COPY build/docker-default.conf /home/web/nginx.conf
WORKDIR /home/web

ENV NGINX_CONF ''

CMD NGINX_CONF_FILE="/etc/nginx/nginx.conf" \
    && rm -rf $NGINX_CONF_FILE \
    && cp -rf /home/web/nginx.conf $NGINX_CONF_FILE \
    && echo "${NGINX_CONF}" >> $NGINX_CONF_FILE \
    && echo "}" >> $NGINX_CONF_FILE \
    && nginx -c /etc/nginx/nginx.conf -g "daemon off;"