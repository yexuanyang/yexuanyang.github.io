---
title: '使用 Docker 搭建 LAVA 测试集群'
date: '2024-01-12'
category: '测试开发'
tags: ['Docker', 'LAVA', '测试集群', '自动化测试']
summary: '详细介绍如何使用 Docker 和 docker-compose 搭建 LAVA 测试集群，包括配置文件的编写和集群的启动过程。'
---

# 使用docker搭建lava测试集群

1. 使用docker-compose:
    1. 首先需要下载docker-compose，`apt install docker-compose`。整个集群的搭建由docker-compose创建
    2. `git clone https://github.com/kernelci/lava-docker.git`将lava-docker拉下来
    3. 编辑`lavalan-gen.py`，这样生出来的`docker-compose.yml`可以直接使用：
        **master:**

        ```python
        dockcomp = {}
        dockcomp["version"] = "2.0"
        dockcomp["services"] = {}
        dockcomposeymlpath = "output/%s/docker-compose.yml" % host
        dockcomp["services"][name] = {}
        dockcomp["services"][name]["hostname"] = name
        dockcomp["services"][name]["ports"] = [ listen_address + ":" + str(webinterface_port) + ":80"]
        dockcomp["services"][name]["volumes"] = [ "/boot:/boot", "/lib/modules:/lib/modules" ]
        dockcomp["services"][name]["build"] = {}
        dockcomp["services"][name]["build"]["context"] = name
        ```

        **slave:**

        ```python
        dockcomp["services"][name] = {}
        dockcomp["services"][name]["hostname"] = name
        dockcomp["services"][name]["dns_search"] = ""
        dockcomp["services"][name]["ports"] = []
        dockcomp["services"][name]["volumes"] = [ "/boot:/boot", "/lib/modules:/lib/modules", "/data/user_home/yyx:/data/user_home/yyx" ]
        dockcomp["services"][name]["environment"] = {}
        dockcomp["services"][name]["build"] = {}
        dockcomp["services"][name]["build"]["context"] = name
        dockcomp["services"][name]["privileged"] = True
        ```

    4. 配置`boards.yaml`文件：

        ```YAML
        masters:
        - name: master
            host: lava-test-1
            webinterface_port: 9999      
            allowed_hosts: ['*']         
            users:
            - name: admin
                token: longrandomtokenadmin
                password: admin
                superuser: true
                staff: true
        slaves:
        - name: lab-slave-1
            host: lava-test-1
            remote_master: master
            remote_user: admin
            dispatcher_ip: 10.161.28.28 

        boards:
        - name: qemu-test
            type: qemu
            slave: lab-slave-1
        - name: qemu-test-1
            type: qemu
            slave: lab-slave-1

        ```

        文件中的dispatcher_ip要设置成运行`docker-compose`的服务器ip地址
        `type`指定设备的类型。
    5. 运行下列命令启动lava测试集群：

        ```bash
        ./lavalab-gen.py
        cd output/lava-test-1
        docker-compose build
        docker-compose up -d
        ```

    6. 运行完之后访问`boards.yaml`里面指定的`dispatcher_ip:webinterface_port`即可访问lava的网页。账号密码是`boards.yaml`里面的`users`指定的`name`和`password`，那个token用来作为使用`XML-RPC`时指定的`token`
