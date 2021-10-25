#!/bin/bash

#私有库地址
resource="eip-reg.tencentcloudcr.com"
#命名空间
spaceName="frontend"
#产品名称
productName="fe"
#版本号
version="1.0.0"

#docker名称
# dockerName="darwindb-${productName}-web-${version}-date-`date '+%Y%m%d-%H-%M-%S'`"
dockerName="darwindb-${productName}-web-${version}"
#标签名称
tagName=$resource/$spaceName/$dockerName
#k8s服务端口
servicePort=33999

cp -rf dist build/
sudo docker login eip-reg.tencentcloudcr.com -u=100020574268 -p eyJhbGciOiJSUzI1NiIsImtpZCI6IllVTEI6RUUyVDpHVjNIOlhCQjc6UlNLTzo2R01UOkdPTDU6UEVZMzpJTTJZOkNPQzc6WFBFWjo3M1laIn0.eyJvd25lclVpbiI6IjEwMDAyMDA3NTE1NiIsIm9wZXJhdG9yVWluIjoiMTAwMDIwNTc0MjY4IiwidG9rZW5JZCI6ImM0NjBkdXZ0aDExbWNjcGZwNDYwIiwiZXhwIjoxOTQzNTM4MTcxLCJuYmYiOjE2MjgxNzgxNzEsImlhdCI6MTYyODE3ODE3MX0.CS09sgO-cExyW5f7FUYCmb8Lx6IWL7AyCYUZ8ZPfowPEl0nmR3V-kXn8HwvOe3BrFYJptshWGnQgzDteFxjKX5y_c25cAL9XNpqhFnAU35Nd2Fz275UcSHEHc8NFdwaE5S1cl4NuCXEcpN1C2kQ4EVvP78t420gZucyJWgw9vDyrxBrWUUSjbNrwWckhQBLbT1bKyuoe70NJ_tD6iIDyNa94H6oj2tWZGJvxlemqWoYc5OZPW38Oyk6sft7wIfx6hNqiRmEKOArMjjBVdyEOXkvsgn6FtL2prPcFFvHJOiCK-84X8qb0A2Rdvmg7e_MAHJN9g7Rw1jzlUWMsZ3Ucfw
sudo docker build -t $productName:release -f build/Dockerfile .
sudo docker tag $productName:release $tagName:release
sudo docker push $tagName:release

cp build/default.yaml build/darwindb-web.yaml
sed -i '' 's/{productName}/'${productName}'/g' build/darwindb-web.yaml
sed -i '' 's/{servicePort}/'${servicePort}'/g' build/darwindb-web.yaml
sed -i '' 's/{version}/'${version}'/g' build/darwindb-web.yaml
sed -i '' 's/{spaceName}/'${spaceName}'/g' build/darwindb-web.yaml
sed -i '' 's/{resource}/'${resource}'/g' build/darwindb-web.yaml

sed -i 's/{productName}/'${productName}'/g' build/darwindb-web.yaml
sed -i 's/{servicePort}/'${servicePort}'/g' build/darwindb-web.yaml
sed -i 's/{version}/'${version}'/g' build/darwindb-web.yaml
sed -i 's/{spaceName}/'${spaceName}'/g' build/darwindb-web.yaml
sed -i 's/{resource}/'${resource}'/g' build/darwindb-web.yaml

kubectl delete -f  build/darwindb-web.yaml
kubectl create -f  build/darwindb-web.yaml
rm -rf build/dist

