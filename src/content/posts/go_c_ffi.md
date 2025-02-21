---
title: 'Go与C语言交互基础教程'
date: '2023-07-31'
category: 'GO'
tags: ['GO', 'C']
summary: '介绍Go语言与C语言交互的基本知识和使用方法'
---

## go fix

go fix用来将代码从旧的发行版更新到新的发行版

## cgo

在go语言中调用c语言代码方式：import "C"，在该语句前加上要引入的C头文件（以注释的形式引入），例如：

```go
// #include <stdio.h>
// #include <stdlib.h>
import "C"

```

C不是一个标准库，只是cgo的一个特殊名称用来引用C的命名空间

想要把一个字符串从C转换到Go，使用C.GoString();想要把字符串从Go转换到C，使用C.CString()

Go的内存管理机制不能管理C分配的内存，需要使用C.free()来释放内存，例如 `C.free(unsafe.pointer(CVarible))`

要编译cgo包，需要在Makefile中定义CGOFILES，使用gomake或者make编译

## C存根函数

声明但未实现的函数

## SWIG（简化封装器和接口生成器）实现和C++交互

SWIG注意事项：

* 编写需要封装的go库
* SWIG会自动生成存根函数
* 可以使用cgo调用这些库
* 相关的go文件会自动生成
