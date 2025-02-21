---
title: 'Go Map的使用指南'
date: '2023-07-31'
category: 'GO'
tags: ['GO']
summary: '介绍Go语言中Map的key和value类型使用规则'
---

## key类型

可以是任何可以使用==或!=比较的类型；数组，切片，结构体不能作为key类型；基本数据类型和接口类型可以作为key类型

如果要使用结构体作为key类型，需要提供key（）和hash（）方法

## value类型

任意类型，可以使用空接口来存储任意类型，使用时需要一次*类型断言*

value中存储函数可以实现分支的结构，使用map中的key来选择函数

```go
package main
import "fmt"
func main() {
mf := map[int]func() int{
	1: func() int { return 10 },
	2: func() int { return 20 },
	5: func() int { return 50 },
}
fmt.Println(mf)
}
```

对于一个key对应多个value的情况，可以使用切片作为类型

例如

```go
mp1 := make(map[int][]int)
mp2 := make(map[int]*[]int)
```



## 初始化

不赋值： `map1 := make(map[string]int)`

赋值：`map1 := map[string]int{"1234":2,"keuw":12}`

不要使用new来创建map，如果你错误的使用 new() 分配了一个引用对象，你会获得一个空引用的指针，相当于声明了一个未
初始化的变量并且取了它的地址

## 赋值

如果key是map的一个值， `map[key]`表示key对应的值；给key对应的值赋值方法：`map[key] = val1`

将key的值导出 `v := map[key]`如果key不存在，那么v是value类型的空值

## 容量

在make map的时候可以指定map的容量，超出容量会自动+1作为新的容量；

对于提前知道容量的map或者可能快速扩容的map应当提前指定容量

指定方式：`make(map[string]int, 2)`第二个参数2就是容量


## 测试键值对是否存在

`val, isPresent := map1["123"]`如果不存在那么isPresent是false


## 删除键值对

`delete(map,key)`

例如 `delete(map1,"123")`删除了map1中key为123的键值对


## for range遍历map

```go
for key,value := range map{
}
```

这样可以遍历一个map，key表示键，value表示值

map不是按照key排序也不是按照value排序的

例如：

```go
capitals := map[string] string {"France":"Paris", "Italy":"Rome", "Japan":"Tokyo" }
for key := range capitals {
fmt.Println("Map item: Capital of", key, "is", capitals[key])
}

```

这段代码的输出如下：

```plaintext
Map item: Capital of Italy is Rome
Map item: Capital of Japan is Tokyo
Map item: Capital of France is Paris
```


## map类型切片

看下面的代码:

```go
package main
import "fmt"
func main() {
// Version A:
items := make([]map[int]int, 5)
for i:= range items {
items[i] = make(map[int]int, 1)
items[i][1] = 2
}
fmt.Printf("Version A: Value of items: %v\n", items)
// Version B: NOT GOOD!
items2 := make([]map[int]int, 5)
for _, item := range items2 {
item = make(map[int]int, 1) // item is only a copy of the slice element.
item[1] = 2 // This 'item' will be lost on the next iteration.
}
fmt.Printf("Version B: Value of items: %v\n", items2)
}

```

VersionA的代码真正修改了map,但是VersionB的代码没有修改map,因为遍历的时候取出的item是map的一个复制品,在下一次迭代之后数据就丢失了,不会更改原来的map


## map排序

map默认是无序的,如果需要排序,可以将键取出来,作为一个切片,然后对切片排序,再从map中取数据

如果需要有序的map,建议使用结构体切片,结构体如下:

```go
type mymap strcut{
	key string
	value int
}
```


## map键值对换

如果键值是一一对应的,那么可以直接使用for-range方式遍历map然后对换即可

如果键值是多对一,即可能不同的键有相同的值,那么对换之后一个键就有多个值,所以需要更换新map的类型

如果是 `map[string]int`对换,那么保险起见可以使用 `map[int][]string`作为对换之后的类型
