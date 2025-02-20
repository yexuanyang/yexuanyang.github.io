---
title: '定义 LAVA 中的设备和设备类型'
date: '2024-01-14'
category: '测试开发'
tags: ['LAVA', '设备管理', '自动化测试', '配置管理']
summary: '详细说明 LAVA 中设备和设备类型的定义方法，包括配置文件的位置、格式和管理方式。'
---

# 定义lava中的device和device type

1. lava中有默认的device types，存放在lava master的`/usr/share/lava-server/device-types`目录下。也可以使用`lava-server manage device-types list --all`列出所有的设备类型。`lava-server manage devices list -all`可以列出所有设备。每一个device-type在`/usr/share/lava-server/device-types`目录下都有一个jinja2文件定义这个设备类型。比较常用的是`qemu.jinja2`，这个文件会在定义设备类型为qemu的设备时使用
2. 设备存储在lava master的`/etc/lava-server/dispatcher-config/devices`目录下，每一个设备都有一个jinja2文件，内容例如：

    ```jinja2
    {% extends 'qemu.jinja2' %}
    {% set no_kvm = True %}
    ```

    第一行的extends引用了qemu这个设备类型的jinja2模板，后面可以覆写模板里面的一些值

3. 增加新的设备可以在UI中操作，增加完之后需要注意在`/etc/lava-server/dispatcher-config/devices`目录下需要新增一个文件名和设备名称相同，后缀是`.jinja2`的文件。需要注意增加的设备需要有healthcheck，新设备extends引用的jinja2文件将文件名保留，后缀改成.yaml就是health-check的定义。如果新设备的类型是qemu，那么health-checks定义在`/etc/lava-server/dispatcher-config/health-checks/qemu.yaml`。
4. 如果增加lava中提供的设备类型，直接使用`lava-server manage device-types add xxx`就可以。
（没尝试过）如果要自己增加设备类型，使用ui或者命令新增设备之后，需要在`/etc/lava-server/dispatcher-config/device-types/`下创建对应的`.jinja2`文件
