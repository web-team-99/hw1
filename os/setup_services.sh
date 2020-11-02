#!/bin/bash

sudo mkdir -p /usr/bin/backend_api/go/
sudo mv /home/hw1/go/main /usr/bin/backend_api/go/
sudo mv /home/hw1/nodejs/ /usr/bin/backend_api/
sudo mv /home/hw1/os/go-api.service /home/hw1/os/nodejs-api.service /lib/systemd/system/

sudo chcon --type=systemd_unit_file_t /lib/systemd/system/go-api.service
sudo semanage fcontext -a -t systemd_unit_file_t "/usr/lib/systemd/system/go-api.service"
sudo systemctl enable go-api.service
sudo systemctl start go-api.service

sudo chcon --type=systemd_unit_file_t /lib/systemd/system/nodejs-api.service
sudo semanage fcontext -a -t systemd_unit_file_t "/usr/lib/systemd/system/nodejs-api.service"
sudo systemctl enable nodejs-api.service
sudo systemctl start nodejs-api.service
