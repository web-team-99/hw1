# nginx

install nginx on your server. then replace

    /etc/nginx/nginx.conf
    
with nginx.conf in this folder.

place your front directory in

    root  /home/hw1/front
    
in nginx.conf and allow executation for all father directories of front. for example:

    chmod +x /home
    chmod +x /home/hw1
    chmod +x /home/hw1/front
    
don't forget to reload and restart nginx:

    sudo systemctrl reload nginx
    sudo systemctrl restart nginx
