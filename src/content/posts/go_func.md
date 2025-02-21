---
title: 'Go语言函数详解'
date: '2023-07-31'
category: 'GO'
tags: ['GO']
summary: '详细介绍Go语言中函数的定义、类型和使用特点，包括函数签名、参数传递、返回值等核心概念'
---

## 函数签名（函数类型）

```go
func add(x int, y int) int   {return x + y}
func sub(x, y int) (z int)   { z = x - y; return}
func first(x int, _ int) int { return x }
func zero(int, int) int      { return 0 }

fmt.Printf("%T\n", add)   // "func(int, int) int"
fmt.Printf("%T\n", sub)   // "func(int, int) int"
fmt.Printf("%T\n", first) // "func(int, int) int"
fmt.Printf("%T\n", zero)  // "func(int, int) int"

```

上面四个函数的函数类型是相同的，函数的形参名和返回值的名字不影响函数类型；_表示空，可以用来表示该值在函数中用不到

如果函数只有声明没有函数体，那么该函数不由Go语言实现

```go
package math

func Sin(x float64) float //implemented in assembly language(由汇编语言实现)

```
