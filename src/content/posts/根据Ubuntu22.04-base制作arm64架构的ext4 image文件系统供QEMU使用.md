---
title: '根据Ubuntu22.04-base制作arm64架构的ext4image文件系统供QEMU使用'
date: '2024-9-23'
category: 'QEMU'
tags: ['QEMU', 'Ubuntu', 'ext4', 'file system']
summary: '根据Ubuntu22.04-base制作arm64架构的ext4image文件系统供QEMU使用'
--- 

## 参考资料  

https://github.com/wincle626/Prepare_Ubuntu_Rootfs_for_Aarch64_on_x86_Host​   
https://coldnew.github.io/1ad4bf6d/   
https://developer.aliyun.com/article/1172124   
https://www.cnblogs.com/wsg1100/p/13127636.html   
https://blog.csdn.net/u013113549/article/details/127337506  

### 下载Ubuntu22.04-base文件系统  

浏览器直接搜索Ubuntu22.04 base arm64，基本上就能找到对应的文件系统压缩包在https://cdimage.ubuntu.com/ubuntu-base/releases/22.04/release/这里能找到22.04的根文件系统  

这些操作都需要在root下执行，并且全程工作环境在/root/rootfs（chroot之前）和/（chroot之后）  

1 cd && mkdir rootfs && cd rootfs   
2 wget https://cdimage.ubuntu.com/ubuntu-base/releases/22.04/release/ubuntu  
base-22.04-base-arm64.tar.gz   
3 mkdir ubuntu22.04-arm64 && tar -xvf ubuntu-base-22.04-base-arm64.tar.gz -C   
ubuntu22.04-arm64   
4 apt update && apt install qemu-utils qemu-user-static qemu   
5   
6 # 这一步是为了让x86_64机器可以chroot到arm64的rootfs中；如果架构一致，则不需要执行   
7 cp /usr/bin/qemu-aarch64-static ubuntu22.04-arm64/usr/bin/   
8   
9 mount --bind /dev ubuntu22.04-arm64/dev   
10 mount -t proc proc ubuntu22.04-arm64/proc   
11 mount -t sysfs sysfs ubuntu22.04-arm64/sys   
12 cp -b /etc/resolv.conf ubuntu22.04-arm64/etc/resolv.conf   
13 chroot ubuntu22.04-arm64   
1 apt update && apt upgrade -y   
2 useradd -b '/bin/bash' -m $-\mathsf{G}$ adm,sudo <your-user-name>   
3 passwd root   
4 passwd <your-user-name>   
5 # 如果还需要安装别的环境，在exit之前操作，安装到rootfs中   
6 exit  

退出根文件系统，先把前面mount的设备umount，之后创建ext4文件格式的img，挂载到loop设备，然后将根文件系统中的内容复制进去。  

1 umount ubuntu22.04-arm64/dev  
2 umount ubuntu22.04-arm64/proc  
3 umount ubuntu22.04-arm64/sys  
4 qemu-img create -f raw rootfs.img 2G  
5 mkfs.ext4 rootfs.img  
6 mkdir -p /mnt/image && mount -o loop rootfs.img /mnt/image  
7 # 假设当前工作目录是根文件系统的上一级目录  
8 cp -a ubuntu22.04-arm64/\* /mnt/image/  
9 umount /mnt/image/  

这样就在x86_64架构机器上制作好了一个arm64架构的ext4 image  

## 其他尝试和操作失误  

1. 尝试使用Ubuntu cloud image制作rootfs，制作过程和用Ubuntu Base基本一致，但是在qemu使用该文件系统登录时遇到了问题。Ubuntu cloud image没有默认的用户和密码，并且默认不允许用户密码登录，而是使用ssh密钥登录。至于怎么给Ubuntu cloud image设置用户和密码没有单独研究  
2. 我制作该文件系统的环境是Windows下的VMware虚拟机，之前尝试使用Windows下的WSL，在执行chroot到arm64的rootfs这一步出现问题，即使将qemu-aarch64-static复制到rootfs/usr/bin中也不能chroot进去，依然报错/bin/bash exec format error。  
3. 还尝试过使用容器构建，但是因为需要mount -o loop，所以容器需要含有privilege参数，由于我的容器没有该特权，而赋予这个参数需要重新创建容器，于是没有选择这个方式构建。  
4. 如果没有umount之前挂载的/dev /proc /sys等设备就将根文件系统复制到ext4 image挂载的目录中，将会占用大量的磁盘空间，2G 的image可能不够用。另外可能也会导致不必要的错误，所以一定记住要先umount，保持rootfs的整洁，然后再复制。  