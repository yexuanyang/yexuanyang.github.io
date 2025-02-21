---
title: 'Go Switch语句使用指南'
date: '2023-07-31'
category: 'GO'
tags: ['GO']
summary: '介绍Go语言中switch语句的使用技巧和最佳实践'
---

可以使用switch加初始化的方式优雅的进行分支结构的判断，例如

```go
switch result := calculate(){
	case result < 0:
		...
	case result > 0:
		...
	default:
		...
}
```

或者：

```go
switch a, b := x[i], y[j]; {
	case a < b: 
		t = -1
	case a == b: 
		t = 0
	case a > b: 
		t = 1
}
```

switch 还可以被用于type-switch判断某个interface变量中实际存储的类型

go的switch默认在case后中断，如果需要继续执行，可以使用语句fallthrough，例如：

```go
package main

import "fmt"

func main() {
	k := 6
	switch k {
	case 4:
		fmt.Println("was <= 4")
		fallthrough
	case 5:
		fmt.Println("was <= 5")
		fallthrough
	case 6:
		fmt.Println("was <= 6")
		fallthrough
	case 7:
		fmt.Println("was <= 7")
	case 8:
		fmt.Println("was <= 8")
		fallthrough
	default:
		fmt.Println("default case")
	}
}

```

这一段代码执行case 6和case 7中的语句
