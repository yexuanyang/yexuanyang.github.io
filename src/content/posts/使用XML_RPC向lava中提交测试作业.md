---
title: '使用 XML-RPC 向 LAVA 提交测试作业'
date: '2024-01-13'
category: '测试开发'
tags: ['LAVA', 'XML-RPC', '自动化测试', 'Python']
summary: '介绍如何使用 XML-RPC 接口向 LAVA 测试集群提交测试作业，包括配置文件编写和 Python 脚本实现。'
---

# 使用XML-RPC向lava中提交测试作业

1. 访问lava集群的web页面，点开API中的`Available Methods`可以看到XML-RPC支持的所有方法，里面有一个方法是scheduler.jobs.submit，如果集群部署在`10.161.28.28:9999`那么访问`http://10.161.28.28:9999/api/help/`可以看到所有的API
2. 查看目前有的token，访问`http://10.161.28.28:9999/api/tokens/`，选一个用来做XML_RPC
3. 编写要提交的任务`basic.yaml`：

   ```yaml
    device_type: qemu
    job_name: RROS_TEST test basic_bash.yaml

    timeouts:
    job:
        minutes: 15
    action:
        minutes: 5
    connection:
        minutes: 2
    priority: medium
    visibility: public
    context:
    arch: aarch64
    memory: 2048
    guestfs_interface: virtio
    machine: virt
    cpu: cortex-a57
    extra_options:
    - -smp 1
    - -device virtio-blk-device,drive=hd0
    - -append "console=ttyAMA0 root=/dev/vda2 rw"

    actions: 
    - deploy:
        timeout: 
        minutes: 5
        to: tmpfs
        images:
        kernel:
            image_arg: -kernel {kernel}
            url: file:///data/user_home/yyx/images/rros_arch_jenkins/arm64/boot/Image
        rootfs:
            image_arg: -drive if=none,file={rootfs},id=hd0,format=raw
            url: file:///data/user_home/yyx/images/lhy_2022-01-28-raspios-bullseye-arm64_poll.img
    - boot:
        method: qemu
        media: tmpfs
        timeout:
        minutes: 5
        auto_login:
        login_prompt: "raspberrypi login:"
        username: root
        password_prompt: "Password:"
        password: 519ailab
        prompts:
        - "root@raspberrypi:"
    - test:
        timeout:
        minutes: 5
        definitions:
        - repository: https://github.com/yexuanyang/my_pipeline.git
        from: git
        path: basic_bash.yaml
        name: basic-bash
   ```

   其中test下的basic_bash.yaml是lava中的test defination，内容如下：

   ```yaml
    metadata:
    format: Lava-Test Test Defination 1.0
    name: basic-bash
    description: "Basic (Level 1) Test basic bash in RROS"
    maintainer:
        - myemailyyxg@gmail.com

    run:
    steps:
        - lava-test-case test-pwd --shell pwd
        - lava-test-case test-ls --shell ls $(pwd)
        - chmod +x basic_bash.sh
        - lava-test-case test-script --shell ./basic_bash.sh
   ```

4. 编写python脚本：

   ```python
    # Python3
    import yaml
    import xmlrpc.client

    with open('basic.yaml') as f:
        config = yaml.dump(yaml.load(f, yaml.FullLoader))
        server=xmlrpc.client.ServerProxy("http://admin:longrandomtokenadmin@10.161.28.28:9999/RPC2/")
        jobid=server.scheduler.submit_job(config)
   ```

5. 运行这个脚本即可向lava集群提交一个新的job
