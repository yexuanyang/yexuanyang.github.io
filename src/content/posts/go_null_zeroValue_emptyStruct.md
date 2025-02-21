---
title: 'Go语言中的零值、空值和空结构体'
date: '2023-07-31'
category: 'GO'
tags: ['GO']
summary: '详细介绍Go语言中的零值、nil值和空结构体的概念，包括它们的特点、使用场景和最佳实践'
---

# go 里面的零值 , 空值 , 空结构体

## 零值

声明变量的时候未初始化，那么变量会自动赋予零值；

**对于值类型：**

对于bool变量赋予false；对于字符串变量赋予""；对于数值类型赋予0

**对于引用类型：**

都是nil，包括指针pointer，函数function，接口interface，切片slice，管道channel，映射map

**注意：`：=`语法糖是实现的声明并初始化变量，所以变量是分配了内存空间的，这样就不是nil了**

例如：

```go
package main

import "fmt"
import "reflect"

func main() {
    var s1 []string
    s2 := []string{} // 或者等同于 var s2 = []string{}

    fmt.Println(s1 == nil) // true
    fmt.Println(s2 == nil) // false

    fmt.Println(reflect.DeepEqual(s1, s2)) // false

    fmt.Println(reflect.DeepEqual(s1, []string{}))  // false
    fmt.Println(reflect.DeepEqual(s2, []string{}))  // true
}
```

对于空结构nil也可以调用对象的方法：

```go
package main

import "fmt"

const defaultPath = "/usr/bin/"

type Config struct {
    path string
}

func (c *Config) Path() string {
    //如果对象c是空结构，那么返回默认的值
    if c == nil {
            return defaultPath
    }
    return c.path
}

func main() {
    var c1 *Config
    var c2 = &Config{
            path: "/usr/local/bin/",
    }
    fmt.Println(c1.Path(), c2.Path())
}
```

## nil

nil是 Golang 中唯一没有默认类型的非类型化的值

nil不是保留关键字，可以给变量命名nil

nil之间不可以比较，例如 `nil==nil`这个比较会报错

对于常见引用类型，nil是他们的零值

```go
package main
import "fmt"
func main() {
    //nil 是常见引用类型的零值
    var m map[int]string
    var ptr *int
    var c chan int
    var sl []int
    var f func()
    var i interface{}
    fmt.Printf("%#v\n", m)
    fmt.Printf("%#v\n", ptr)
    fmt.Printf("%#v\n", c)
    fmt.Printf("%#v\n", sl)
    fmt.Printf("%#v\n", f)
    //接口类型比较特殊，不能确定类型
    fmt.Printf("%#v\n", i)
}
```

输出的结果如下：

```plaintext
map[int]string(nil)
(*int)(nil)
(chan int)(nil)
[]int(nil)
(func())(nil)
<nil>
```

不可以使用语法糖直接给变量赋值nil，例如 `a := nil`会报错，因为编译器不知道a是什么类型的

可以这样赋值 `var a [某个结构] = nil`，这样a的类型是某个结构 但是值是nil

对于nil的比较，nil！=nil的情况。例如：

```go
    var p *int          // (T=*int,V=nil)
    var i interface{}   // (T=nil,V=nil)

    fmt.Println(p == i) // (T=*int, V=nil) == (T=nil, V=nil) -> false
    func Foo() error {
        var err *PathError = nil  // (T=*PathError, V=nil)
        if bad() {
            err = ErrBad
        }
        return err  // 这将始终返回 non-nil 错误
    }

    func main() {
        err := Foo()
        fmt.Println(err)        // <nil>
        fmt.Println(err == nil) // (T=*PathError, V=nil) == (T=nil, V=nil) -> false
    }
```

接口要确定一个变量需要两个基础的属性Type 和 Value，只有两个都相同才相等

### 对于接口类型的空指针判断

```go
var p *int              // (T=*int, V=nil)
var i interface{}       // (T=nil, V=nil)

fmt.Println(p == nil)   // true
fmt.Println(i == nil)   // true

i = p

fmt.Println(i == nil)     // (T=*int, V=nil) == (T=nil, V=nil) -> false
```

第一个比较输出true因为编译器知道p的类型，可以在比较的时候把表达式 `p==nil`变成 `p==(*int)(nil)`

第三个比较输出false因为Type不一样

所以对于接口类型的空指针判断不一定可以完全依靠 `v == nil`，有两种方式避免出现上述问题，第一个是用值和类型分别和nil比较；第二是使用反射包reflect

## 空结构

不占用任何空间

嵌套空结构也不占用任何空间

两个不一样的空结构可能具有相同的地址

## 最佳实践

如果在chan中传递消息的时候不在意值，那么可以使用 `chan struct{}`代替 `chan bool`

如果想避免unkeyed初始化结构，那么可以这样定义结构体

```go
type Q struct {
X, Y int
_ struct{}
```

这样编译器不允许这样初始化结构体 `Q{1,1}`而必须要 `Q{X:1,Y:1}`才可以通过编译
