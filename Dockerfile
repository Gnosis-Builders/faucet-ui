FROM httpd:2.4 as httpd
WORKDIR /usr/local/apache2/htdocs/
RUN rm -rf ./*
COPY build/ .
EXPOSE 80