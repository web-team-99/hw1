To install this services ::

First download or clone project and place it in /home directory.

then check if terminal finds "semanage" ::

if not try this :

        yum provides /usr/sbin/semanage
        yum install policycoreutils-python-utils

then allow executation with:

        chmod +x setup_services.sh

then you can run the setup_services.sh bash:

        sudo ./setup_services.sh

or Run these commands in a terminal instead of run bash file ::

    1.sudo mkdir -p /usr/bin/backend_api/go/
    2. sudo mv /home/hw1/go/main /usr/bin/backend_api/go/
    3. sudo mv /home/hw1/nodejs/ /usr/bin/backend_api/
    4. sudo mv /home/hw1/os/go-api.service /home/hw1/os/nodejs-api.service /lib/systemd/system/
    
    5. sudo chcon --type=systemd_unit_file_t /lib/systemd/system/go-api.service
    6. sudo semanage fcontext -a -t systemd_unit_file_t "/usr/lib/systemd/system/go-api.service"    
    7. sudo systemctl enable go-api.service
    8. sudo systemctl start go-api.service
        8.1. You can check status with :
            sudo systemctl status go-api.service
    
    9. sudo chcon --type=systemd_unit_file_t /lib/systemd/system/nodejs-api.service
    8. sudo semanage fcontext -a -t systemd_unit_file_t "/usr/lib/systemd/system/nodejs-api.service"
    10. sudo systemctl enable nodejs-api.service
    11. sudo systemctl start nodejs-api.service
        11.1. You can check status with :
            sudo systemctl status nodejs-api.service
