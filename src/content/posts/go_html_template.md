---
title: 'Go文本和HTML模板使用指南'
date: '2023-07-31'
category: 'GO'
tags: ['GO']
summary: '介绍Go语言中文本模板和HTML模板的使用方法和最佳实践'
---

## 文本模板

创建模板字符串：

```go
const templ = `{{.TotalCount}} issues:
{{range .Items}}----------------------------------------
Number: {{.Number}}
User:   {{.User.Login}}
Title:  {{.Title | printf "%.64s"}}
Age:    {{.CreatedAt | daysAgo}} days
{{end}}`

```

当前值“.”最初被初始化为调用模板时的参数；{{range }} {{ end}}是一个循环；"|"表示前一个表达式的输出作为后面的输入，类似Unix的管道，printf类似fmt.printf；daysAgo是函数，在编译模板的时候可以指定函数是什么

## 编译模板

```go
var report = template.Must(template.New("issuelist").
    Funcs(template.FuncMap{"daysAgo": daysAgo}).
    Parse(templ))

func main() {
    result, err := github.SearchIssues(os.Args[1:])
    if err != nil {
        log.Fatal(err)
    }
    if err := report.Execute(os.Stdout, result); err != nil {
        log.Fatal(err)
    }
}

```

上述代码实现功能如下：

- 使用 `template.Must`检测template创建是否成功，函数 `template.New`创建一个模板
- `.Funcs()`里面使用 `template.FuncMap{key:value}`来创建模板中函数名和实现了的函数的对应
- `.Parse()`将传入的template字符串转成template类型
- 使用 `.Execute()`函数使用template类型的对象，第一个参数传入流，第二个参数传入要使用模板的对象，这里应该传入结构体，初始化的时候"."就会变成结构体的值，`.Number`就会变成结构体内的Number成员

## 练习

描述：创建一个web服务器，查询一次GitHub，然后生成BUG报告、里程碑和对应的用户信息

思路：

- 需要定义输出的模板，输出bug报告，里程碑，对应的用户信息
- 需要使用http.HandleFunc来创建句柄函数处理路由和http.ListenAndServe来创建webServer的侦听端口和ip地址
- 需要获取用户的输入作为查找的关键词，获取方式：`r.URL.Query().Get("key")`

程序：

```go
package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"net/http"
)

const (
	BaseUrl = "https://api.github.com/search/issues"
	Temp    = `
	<h1>{{.TotalCount}} issues</h1>
	<table>
	<tr style='text-align: left'>
	  <th>#</th>
	  <th>State</th>
	  <th>User</th>
	  <th>Title</th>
	</tr>
	{{range .Items}}
	<tr>
	  <td><a href='{{.HTMLURL}}'>{{.Number}}</a></td>
	  <td>{{.State}}</td>
	  <td><a href='{{.User.HTMLURL}}'>{{.User.Login}}</a></td>
	  <td><a href='{{.HTMLURL}}'>{{.Title}}</a></td>
	</tr>
	{{end}}
	</table>
	`
)

type User struct {
	// 用户名
	Login   string `json:"login"`
	HTMLURL string `json:"html_url"`
}

type Issue struct {
	Number  int
	HTMLURL string `json:"html_url"`
	Title   string
	State   string
	User    *User
}

type IssuesSearchResult struct {
	TotalCount int `json:"total_count"`
	Items      []*Issue
}

func server() {
	http.HandleFunc("/", handle)
	http.ListenAndServe("127.0.0.1:5020", nil)
}
func handle(w http.ResponseWriter, r *http.Request) {
	report := template.Must(template.New("issueInfo").Parse(Temp))
	q := r.URL.Query().Get("key")
	if q == "" {
		fmt.Fprint(w, "请输入要检索的词")
	}
	res, _ := http.Get(fmt.Sprintf("%s?q=%s", BaseUrl, q))
	result := &IssuesSearchResult{}
	if err := json.NewDecoder(res.Body).Decode(result); err != nil {
		panic(err)
	}
	report.Execute(w, result)
}
func main() {
	server()
}

```

程序实现两个函数：

- server用来建立侦听的服务器和绑定处理特定路由使用的函数
- handle是处理特定路由的句柄

在handle中使用 `r.URL().Query().Get("key")`获取查询给出的key关键词的值，例如 `127.0.0.1:5020/?key=go`则获取到go这个字符串，将其作为检索词传入api接口中
