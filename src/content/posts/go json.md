---
title: 'Go和json交互简单介绍'
date: '2023-07-31'
category: 'GO'
tags: ['GO']
summary: '介绍Go语言和JSON交互的简单操作'
---

## json相关常识

json支持的类型：

number

array

object

string

boolean

其中object对应go语言的map，array对应slice

## 编码Marshal

```go
type Movie struct {
    Title  string
    Year   int  `json:"released"`
    Color  bool `json:"color,omitempty"`
    Actors []string
}

var movies = []Movie{
    {Title: "Casablanca", Year: 1942, Color: false,
        Actors: []string{"Humphrey Bogart", "Ingrid Bergman"}},
    {Title: "Cool Hand Luke", Year: 1967, Color: true,
        Actors: []string{"Paul Newman"}},
    {Title: "Bullitt", Year: 1968, Color: true,
        Actors: []string{"Steve McQueen", "Jacqueline Bisset"}},
    // ...
}

```

使用json.Marshal函数将movies的Movie数组转换成json中的类型

```go
data, err := json.Marshal(movies)
if err != nil {
    log.Fatalf("JSON marshaling failed: %s", err)
}
fmt.Printf("%s\n", data)

```

输出data的信息，是一个json格式的单行字符串，不便于阅读；使用另一个函数json.MarshalIndent可以得到便于阅读的json格式字符串

```go
data, err := json.MarshalIndent(movies, "", "    ")
if err != nil {
    log.Fatalf("JSON marshaling failed: %s", err)
}
fmt.Printf("%s\n", data)

```

json.MarshalIndent函数多传入两个参数，第一个参数：每一行输出的前缀字符串；第二个参数：每一个层级的缩进字符串。上述代码将会输出如下字符串

```json
[
    {
        "Title": "Casablanca",
        "released": 1942,
        "Actors": [
            "Humphrey Bogart",
            "Ingrid Bergman"
        ]
    },
    {
        "Title": "Cool Hand Luke",
        "released": 1967,
        "color": true,
        "Actors": [
            "Paul Newman"
        ]
    },
    {
        "Title": "Bullitt",
        "released": 1968,
        "color": true,
        "Actors": [
            "Steve McQueen",
            "Jacqueline Bisset"
        ]
    }
]

```

最后一个对象末尾不需要逗号隔开。

在编码时，默认使用Go语言结构体的成员名字作为JSON的对象（使用了reflect反射技术）。输出的json中，把go语言中定义的结构体属性Year和属性Color变成了released和color。这是因为在结构体定义的时候增加了tag（标签）。

```go
Year  int  `json:"released"`
Color bool `json:"color,omitempty"`

```

omitempty表示当该属性的值是空值或者零值的时候，编码成json时不生成该json对象；例如movie数组中的Casablanca（Color是false）并没有输出color这个属性

### 标签的定义方式

一般是使用key:"value"的形式定义标签，value可以由多个字符串构成，不同的字符串之间使用'，'隔开。因为标签的定义需要使用双引号，所以定义的时候采用原生字符串面值的形式书写（用\`包裹起来）。

（使用goland可以定义完毕结构体之后键入alt+enter进入提示操作，选择add key to tags可以在后面生成一系列的tags模板）

## 解码Unmarshal

解码json.Unmarshal可以将json解码成go语言的结构体，第一个参数传入json字符串，第二个参数传入存储解码内容的结构体地址；可以通过给结构体定义部分属性从而只将感兴趣的内容解码

```go
var titles []struct{ Title string }
if err := json.Unmarshal(data, &titles); err != nil {
    log.Fatalf("JSON unmarshaling failed: %s", err)
}
fmt.Println(titles) // "[{Casablanca} {Cool Hand Luke} {Bullitt}]"

```

## 练习

通过web编程获取github issue中的相关内容

gopl.io/ch4/github/github.go（github上的链接，gopl.io是一个仓库）：

```go
// Copyright © 2016 Alan A. A. Donovan & Brian W. Kernighan.
// License: https://creativecommons.org/licenses/by-nc-sa/4.0/

// See page 110.
//!+

// Package github provides a Go API for the GitHub issue tracker.
// See https://developer.github.com/v3/search/#search-issues.
package github

import "time"

const IssuesURL = "https://api.github.com/search/issues"

type IssuesSearchResult struct {
	TotalCount int `json:"total_count"`
	Items      []*Issue
}

type Issue struct {
	Number    int
	HTMLURL   string `json:"html_url"`
	Title     string
	State     string
	User      *User
	CreatedAt time.Time `json:"created_at"`
	Body      string    // in Markdown format
}

type User struct {
	Login   string
	HTMLURL string `json:"html_url"`
}

//!-

```

gopl.io/ch4/github/search.go:

```go
// Copyright © 2016 Alan A. A. Donovan & Brian W. Kernighan.
// License: https://creativecommons.org/licenses/by-nc-sa/4.0/

//!+

package github

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"
)

// SearchIssues queries the GitHub issue tracker.
func SearchIssues(terms []string) (*IssuesSearchResult, error) {
	q := url.QueryEscape(strings.Join(terms, " "))
	resp, err := http.Get(IssuesURL + "?q=" + q)
	if err != nil {
		return nil, err
	}
	//!-
	// For long-term stability, instead of http.Get, use the
	// variant below which adds an HTTP request header indicating
	// that only version 3 of the GitHub API is acceptable.
	//
	//   req, err := http.NewRequest("GET", IssuesURL+"?q="+q, nil)
	//   if err != nil {
	//       return nil, err
	//   }
	//   req.Header.Set(
	//       "Accept", "application/vnd.github.v3.text-match+json")
	//   resp, err := http.DefaultClient.Do(req)
	//!+

	// We must close resp.Body on all execution paths.
	// (Chapter 5 presents 'defer', which makes this simpler.)
	if resp.StatusCode != http.StatusOK {
		resp.Body.Close()
		return nil, fmt.Errorf("search query failed: %s", resp.Status)
	}

	var result IssuesSearchResult
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		resp.Body.Close()
		return nil, err
	}
	resp.Body.Close()
	return &result, nil
}

//!-

```

gopl.io/ch4/issues/main.go:

```go
// Copyright © 2016 Alan A. A. Donovan & Brian W. Kernighan.
// License: https://creativecommons.org/licenses/by-nc-sa/4.0/

// See page 112.
//!+

// Issues prints a table of GitHub issues matching the search terms.
package main

import (
	"fmt"
	"log"
	"os"

	"gopl.io/ch4/github"
)

//!+
func main() {
	result, err := github.SearchIssues(os.Args[1:])
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%d issues:\n", result.TotalCount)
	for _, item := range result.Items {
		fmt.Printf("#%-5d %9.9s %.55s\n",
			item.Number, item.User.Login, item.Title)
	}
}

//!-

/*
//!+textoutput
$ go build gopl.io/ch4/issues
$ ./issues repo:golang/go is:open json decoder
13 issues:
#5680    eaigner encoding/json: set key converter on en/decoder
#6050  gopherbot encoding/json: provide tokenizer
#8658  gopherbot encoding/json: use bufio
#8462  kortschak encoding/json: UnmarshalText confuses json.Unmarshal
#5901        rsc encoding/json: allow override type marshaling
#9812  klauspost encoding/json: string tag not symmetric
#7872  extempora encoding/json: Encoder internally buffers full output
#9650    cespare encoding/json: Decoding gives errPhase when unmarshalin
#6716  gopherbot encoding/json: include field name in unmarshal error me
#6901  lukescott encoding/json, encoding/xml: option to treat unknown fi
#6384    joeshaw encoding/json: encode precise floating point integers u
#6647    btracey x/tools/cmd/godoc: display type kind of each named type
#4237  gjemiller encoding/base64: URLEncoding padding is optional
//!-textoutput
*/
```

代码实现了查找指定github仓库中指定关键词对应的issue的编号，发布者id，问题的描述

### 练习4.10

修改issues程序，实现对输出的问题进行分类，分别是不超过一个月、不到一年、超过一年三类issue

我的思路：获取当前时间信息（使用time.Now)，当前时间减去发布时间（.Sub）获得新的时间（time.Time类型），获取小时数（.Hour）然后比较是否超过了一个月或者一年

代码：

```go
// Copyright © 2016 Alan A. A. Donovan & Brian W. Kernighan.
// License: https://creativecommons.org/licenses/by-nc-sa/4.0/

// See page 112.
//!+

// Issues prints a table of GitHub issues matching the search terms.
package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"gopl.io/ch4/github"
)

// !+
func main() {
	result, err := github.SearchIssues(os.Args[1:])
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%d issues:\n", result.TotalCount)

//---------------修改开始的地方-------------------
	currentTime := time.Now()
	partItem := make(map[string][]*github.Issue, 3) //三类问题的map 不超过一个月 不超过一年 超过一年
	partItem["不超过一个月"] = make([]*github.Issue, 0)
	partItem["不超过一年"] = make([]*github.Issue, 0)
	partItem["超过一年"] = make([]*github.Issue, 0)
	monthTime := 30 * 24
	yearTime := monthTime*12 + 5*24
	for _, item := range result.Items {
		switch timeLag := currentTime.Sub(item.CreatedAt); {
		case timeLag.Hours() < float64(monthTime):
			partItem["不超过一个月"] = append(partItem["不超过一个月"], item)
		case timeLag.Hours() < float64(yearTime):
			partItem["不超过一年"] = append(partItem["不超过一年"], item)
		default:
			partItem["超过一年"] = append(partItem["超过一年"], item)
		}
	}

	for index, item := range partItem {
		fmt.Println(index)
		for j := 0; j < len(item); j++ {
			innerItem := item[j]
			fmt.Printf("#%-5d %9.9s %.55s %s\n",
				innerItem.Number, innerItem.User.Login, innerItem.Title, innerItem.CreatedAt)
		}
	}
//---------------修改结束的地方-------------------
}

//!-

/*
//!+textoutput
$ go build gopl.io/ch4/issues
$ ./issues repo:golang/go is:open json decoder
13 issues:
#5680    eaigner encoding/json: set key converter on en/decoder
#6050  gopherbot encoding/json: provide tokenizer
#8658  gopherbot encoding/json: use bufio
#8462  kortschak encoding/json: UnmarshalText confuses json.Unmarshal
#5901        rsc encoding/json: allow override type marshaling
#9812  klauspost encoding/json: string tag not symmetric
#7872  extempora encoding/json: Encoder internally buffers full output
#9650    cespare encoding/json: Decoding gives errPhase when unmarshalin
#6716  gopherbot encoding/json: include field name in unmarshal error me
#6901  lukescott encoding/json, encoding/xml: option to treat unknown fi
#6384    joeshaw encoding/json: encode precise floating point integers u
#6647    btracey x/tools/cmd/godoc: display type kind of each named type
#4237  gjemiller encoding/base64: URLEncoding padding is optional
//!-textoutput
*/

```

可以实现正常的输出。

遇到的问题：

- 一开始的思路是创建二维slice，然后不同的行表示不同的类别，同一行的不同列表示同一个类的不同issue；这样做的问题是意义不明确，不如创建一个map，把类别和对应的slice做映射
- 创建每一个类别的slice时使用 `make([]github.Issue,0)`而不是 `make([]*github.Issue,0)`导致最后出错，使用复合类型时最好在前面带\*号；包括在结构体内使用其他结构体的类型时，样例里给出的也是带\*号的

  ```go
  type Issue struct {
  	Number    int
  	HTMLURL   string `json:"html_url"`
  	Title     string
  	State     string
  	User      *User
  	CreatedAt time.Time `json:"created_at"`
  	Body      string    // in Markdown format
  }
  ```
- 使用hour来判断时间是否过了一个月或者一年误差比较大，可以直接使用月份之差或者年份之差来判断

  别人的程序：

  ```go
  func Process(data *IssuesSearchResult) {
  	// 创建一个hash表
  	hash := make(map[string][]*Issue, 3)
  	hash["不到一月"] = make([]*Issue, 0)
  	hash["不到一年"] = make([]*Issue, 0)
  	hash["超过一年"] = make([]*Issue, 0)
  	// 遍历数据
  	for _, val := range data.Items {
  		// 获取现在的时间
  		now := time.Now()
  		year := now.Year()
  		month := now.Month()
  		// 创建时间
  		create_year := val.CreatedAt.Year()
  		create_month := val.CreatedAt.Month()
  		if year == create_year && month == create_month {
  			hash["不到一月"] = append(hash["不到一月"], val)
  		} else if year == create_year {
  			hash["不到一年"] = append(hash["不到一年"], val)
  		} else {
  			hash["超过一年"] = append(hash["超过一年"], val)
  		}
  	}
  	fmt.Printf("数据总条数，%v\n", data.TotalCount)
  	for key, val := range hash {
  		fmt.Printf("%s:\n", key)
  		for _, v := range val {
  			fmt.Printf("#%-5d %9.9s %.55s %9.9v\n",
  				v.Number, v.User.Login, v.Title, v.CreatedAt)
  		}
  	}
  }
  ```

  这样判断可以精确一点，不会出现某些时刻判断不准确的情况
- 可以把对数据的操作封装成一个函数，这样main函数体内的代码会更简洁一点；同时可以让用户在不用分类输出的时候可以选择直接输出所有内容

### 练习4.12

描述：流行的web漫画服务xkcd也提供了JSON接口。例如，一个 https://xkcd.com/571/info.0.json 请求将返回一个很多人喜爱的571编号的详细描述。下载每个链接（只下载一次）然后创建一个离线索引。编写一个xkcd工具，使用这些离线索引，打印和命令行输入的检索词相匹配的漫画的URL。

解决思路:

- 首先查看网站的规律，发现https://xkcd.com/是基本的域名，后面跟上漫画的编号，最后跟上/info.0.json表示查看json信息；所以定义一个baseUrl，然后写一个循环获取所有的json文件，将他们存放到csv文件中
- 需要获取到的属性有title，img，link；所以需要定义结构体，里面的成员有title，img，link；并且标签上解释了json编码的名称
- 获取用户的关键词可以采用os.Args[1:]，判断是否含有该漫画可以采用模糊搜索，在所有的记录中查询关键词是否被包含在某一条记录中的title里面；如果有则输出该条记录
- 读取csv文件的方式可以采用csv.NewReader()创建reader，然后通过循环调用reader的函数Read，直到读取到io.EOF停止读取内容；每读一条内容就匹配一下是否符合关键词，如果符合就输出。

我的程序：

```go
//test.go
package test

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
)

const BaseUrl = "https://xkcd.com/"
const filename = "xkcd.csv"

type DataInfo struct {
	Title string `json:"title,omitempty"`
	Img   string `json:"img,omitempty"`
	Link  string `json:"link,omitempty"`
}

func Download() {
	f, err := os.Create(filename)
	if err != nil {
		panic(err)
	}
	defer f.Close()
	//创建writer
	writer := csv.NewWriter(f)
	//使用writer向csv写入内容
	writer.Write([]string{"title", "link", "img"})
	//循环获取每条数据
	var dataInfo DataInfo
	for i := 1; i < 10; i++ {
		//发送http get请求
		fmt.Println(i)
		currentUrl := fmt.Sprintf("%s%d", BaseUrl, i)
		res, err := http.Get(currentUrl + "/info.0.json")
		if err != nil {
			panic(err)
		}
		// 如果已经到最后一个漫画，页面返回404，返回的状态码不是200
		if res.StatusCode != http.StatusOK {
			fmt.Println("没有更多漫画了")
			break
		}
		err = json.NewDecoder(res.Body).Decode(&dataInfo)
		if err != nil {
			panic(err)
		}
		// 将内容存储到csv中
		writer.Write([]string{dataInfo.Title, dataInfo.Link + currentUrl, dataInfo.Img})
		// 将缓存内容写入csv中
		writer.Flush()
	}
}

func Search(args string) {
	f, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer f.Close()
	reader := csv.NewReader(f)
	var hasfind bool
	for {
		result, err := reader.Read()
		if err == io.EOF {
			break
		}
		if strings.Contains(strings.ToLower(result[0]), args) {
			fmt.Printf("link: %s; img link: %s\n", result[1], result[2])
			hasfind = true
		}
	}
	if !hasfind {
		fmt.Println("没有找到此漫画")
	}
}

```

```go
package main

import (
	"ex4.12/test"
	"os"
	"strings"
)

func main() {
	// test.Download()
	key := os.Args[1:]
	test.Search(strings.Join(key, " "))
}

```

第一次执行的时候先运行test.Download()，然后执行test.Search()查找关键词对应的漫画链接

### 练习4.13

描述：使用开放电影数据库的JSON服务接口，允许你检索和下载 https://omdbapi.com/ 上电影的名字和对应的海报图像。编写一个poster工具，通过命令行输入的电影名字，下载对应的海报。

我的思路：

- 类似练习4.12，首先定义baseUrl和这个网站的apikey，然后构造发出的请求url，通过http.Get获取返回的json
- 定义结构体获取返回的json中我们感兴趣的属性（例如title，poster，imdbID等）
- 创建.jpg格式的文件，然后使用jpeg库decode poster url中的数据，存储到image.Image类型的对象中；之后通过encode存储到文件中

我的程序：

```go
//test.go
package contact

import (
	"encoding/json"
	"fmt"
	"image"
	"image/jpeg"
	"net/http"
	"os"
)

const (
	baseUrl = "https://omdbapi.com/"
	apiKey  = "bb3ad877"
)

type movie struct {
	Title  string `json:"Title,omitempty"`
	Poster string `json:"Poster,omitempty"`
	ImdbID string `json:"imdbID"`
}

func Query(title string) {
	res, err := http.Get(fmt.Sprintf("%s?apikey=%s&t=%s", baseUrl, apiKey, title))
	if err != nil {
		fmt.Println("请求发送失败")
		panic(err)
	}
	if res.StatusCode != http.StatusOK {
		fmt.Printf("请求不成功，状态码是%d\n", res.StatusCode)
		os.Exit(1)
	}
	var movies movie
	err = json.NewDecoder(res.Body).Decode(&movies)
	if err != nil {
		panic(err)
	}
	res, err = http.Get(movies.Poster)
	if err != nil {
		panic(err)
	}
	var img image.Image
	img, err = jpeg.Decode(res.Body)
	if err != nil {
		panic(err)
	}
	f, _ := os.OpenFile(fmt.Sprintf("%s.jpg", movies.ImdbID), os.O_RDWR|os.O_CREATE, 0666)
	defer f.Close()
	jpeg.Encode(f, img, nil)
}

```

```go
//main.go
package main

import (
	"Ex4.13/contact"
	"os"
	"strings"
)

func main() {
	title := os.Args[1:]
	contact.Query(strings.Join(title, " "))
}

```

#### 附：go语言处理图片

##### base64 转 file

```go
ddd, _ := base64.StdEncoding.DecodeString(datasource) //成图片文件并把文件写入到buffer
err2 := ioutil.WriteFile("./output.jpg", ddd, 0666)   //buffer输出到jpg文件中（不做处理，直接写到文件）

```

##### base64 转 buffer

```go
ddd, _ := base64.StdEncoding.DecodeString(datasource) //成图片文件并把文件写入到buffer
bbb := bytes.NewBuffer(ddd)                           // 必须加一个buffer 不然没有read方法就会报错

```

##### buffer 转 ImageBuff(代码接上面的代码)

```go
m, _, _ := image.Decode(bbb)                                       // 图片文件解码
rgbImg := m.(*image.YCbCr)
subImg := rgbImg.SubImage(image.Rect(0, 0, 200, 200)).(*image.YCbCr) //图片裁剪x0 y0 x1 y1

```

##### img 转 file（代码接上面的代码）

```go
f, _ := os.Create("test.jpg")     //创建文件
defer f.Close()                   //关闭文件
jpeg.Encode(f, subImg, nil)       //写入文件

```

##### img 转 base64（代码接上面的代码）

```go
emptyBuff := bytes.NewBuffer(nil)                  //开辟一个新的空buff
jpeg.Encode(emptyBuff, subImg, nil)                //img写入到buff
dist := make([]byte, 50000)                        //开辟存储空间
base64.StdEncoding.Encode(dist, emptyBuff.Bytes()) //buff转成base64
fmt.Println(string(dist))                          //输出图片base64(type = []byte)
_ = ioutil.WriteFile("./base64pic.txt", dist, 0666) //buffer输出到jpg文件中（不做处理，直接写到文件）

```

##### imgFile 转 base64

```go
ff, _ := ioutil.ReadFile("output2.jpg")               //我还是喜欢用这个快速读文件
bufstore := make([]byte, 5000000)                     //数据缓存
base64.StdEncoding.Encode(bufstore, ff)               // 文件转base64
_ = ioutil.WriteFile("./output2.jpg.txt", dist, 0666) //直接写入到文件就ok完活了。

```
