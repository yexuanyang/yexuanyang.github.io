---
title: 'Go正则表达式使用指南'
date: '2023-07-31'
category: 'GO'
tags: ['GO']
summary: '介绍Go语言中正则表达式的常用方法和使用场景'
---

## Match方法

serchIn是string类型,表示要匹配的字符串;pat表示匹配模式(正则表达式)

`ok, _ := regexp.Match(pat, []byte(searchIn))`

## MatchString方法

searchIn是string类型

`ok, _ := regexp.MatchString(pat, searchIn)`

## 其他的方法

需要使用Compile返回一个Regexp对象

## 例子

### 例子一

```go
package main
import (
"fmt"
"regexp"
"strconv"
)
func main() {
//目标字符串
searchIn := "John: 2578.34 William: 4567.23 Steve: 5632.18"
pat := "[0-9]+.[0-9]+" //正则
f := func(s string) string{
v, _ := strconv.ParseFloat(s, 32)
return strconv.FormatFloat(v * 2, 'f', 2, 32)
}
if ok, _ := regexp.Match(pat, []byte(searchIn)); ok {
fmt.Println("Match Found!")
}
re, _ := regexp.Compile(pat)
//将匹配到的部分替换为"##.#"
str := re.ReplaceAllString(searchIn, "##.#")
fmt.Println(str)
//参数为函数时
str2 := re.ReplaceAllStringFunc(searchIn, f)
fmt.Println(str2)
}
```

这段代码匹配了字符串中的浮点数(不完全正确,因为中间的.表示匹配任意字符,如果只是想匹配点字符那么要转义,例如 `"[0-9]+\\.[0-9]+"`\),使用**regexp.Match**查看是否匹配,匹配之后采用**regexp.Compile()**获得一个**Regexp**对象,然后使用这个对象的方法**ReplaceAllString**和**ReplaceAllStringFunc**替换匹配到的字符串

**regexp.Compile**有可能会返回错误,因为正则表达式可能是无效的;如果想要检验正则表达式的正确性可以使用**regexp.****MustCompile**,如果不正确直接panic;

## 正则表达式合法性检查

给出一个可以匹配正则表达式的正则表达式(合法性检查),如果需要通过用户输入来得到正则表达式,可以采用下列方式验证表达式是否合理:

`/^(?!(\?|\*|\+|\{\d+(?:,\d*)?\}))((?:[^\\\^\[\].|?+*()\s]+|\\.|\[.*?\])+)$/`
