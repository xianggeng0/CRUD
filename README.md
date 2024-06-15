## API文档

#### 注：该项目的前端是可以正常使用的（可能报错，但可以正常观看），业务部分完善，可以作为模板（本想删掉，写那么久了怪可惜的）

# 博客API文档

## 目录
- [文章管理](#文章管理)
    - [删除文章](#删除文章)
    - [发表文章](#发表文章)
    - [编辑文章](#编辑文章)
    - [获取文章列表](#获取文章列表)
    - [获取文章详情](#获取文章详情)
- [用户](#用户)
    - [发送短信验证码](#发送短信验证码)
    - [用户认证（登录注册）](#用户认证登录注册)
    - [编辑用户个人资料](#编辑用户个人资料)
    - [编辑用户照片资料（头像、身份证照片）](#编辑用户照片资料头像身份证照片)
    - [获取用户个人资料](#获取用户个人资料)
    - [获取用户的关注列表](#获取用户的关注列表)
    - [获取用户的粉丝列表](#获取用户的粉丝列表)
    - [获取用户自己信息](#获取用户自己信息)
- [频道](#频道)
    - [获取所有频道列表](#获取所有频道列表)
- [评论](#评论)
    - [获取评论或评论回复](#获取评论或评论回复)
- [文件](#文件)
    - [上传图片](#上传图片)

## 文章管理

### 删除文章

**基本信息**

* **Path:** `/v1_0/mp/articles/:target`
* **Method:** `DELETE`

**接口描述:**

删除文章。不允许直接删除已正式发表的文章，如想删除，需要先编辑，将其变为待审核或者草稿才可以删除。

**请求参数**

**Headers**

| 参数名称     | 参数值       | 是否必须 | 示例     | 备注 |
| :----------- | :----------- | :----- | :------- | :--- |
| Content-Type | application/json | 是     |          |      |
| Authorization |              | 是     | 用户token |      |

**路径参数**

| 参数名称 | 示例 | 备注 |
| :------- | :--- | :--- |
| target   |      |      |

**Query**

| 参数名称 | 是否必须 | 示例  | 备注                      |
| :------- | :----- | :---- | :----------------------- |
| draft    | 否     | true | 是否存为草稿，true是 false否 |

**Body**

无

**返回数据**

无

**返回状态码**

* 201 OK
* 400 请求参数错误
* 401 token过期或未传
* 507 服务器数据库异常

### 发表文章

**基本信息**

* **Path:** `/v1_0/mp/articles`
* **Method:** `POST`

**接口描述:**

发表文章。如果发表为正式文章，文章的状态会首先变为 待审核状态，即status为1,1分钟后系统会自动审核通过，状态成为审核通过，status为2，审核失败状态一般不存在。

**请求参数**

**Headers**

| 参数名称     | 参数值       | 是否必须 | 示例     | 备注 |
| :----------- | :----------- | :----- | :------- | :--- |
| Content-Type | application/json | 是     |          |      |
| Authorization |              | 是     | 用户token |      |

**Query**

| 参数名称 | 是否必须 | 示例  | 备注                      |
| :------- | :----- | :---- | :----------------------- |
| draft    | 否     | true | 是否存为草稿，true是 false否 |

**Body**

| 名称        | 类型   | 是否必须 | 默认值 | 备注     | 其他信息 |
| :---------- | :----- | :----- | :----- | :------- | :----- |
| title       | string | 必须     |         | 文章标题 |          |
| content     | string | 必须     |         | 文章内容 |          |
| cover       | object | 必须     |         |          |          |
| ├─ type    | string | 必须     |         | 封面类型, -1:自动，0-无图，1-1张，3-3张 |          |
| ├─ images   | string | 必须     |         | item 类型: string |          |
| channel\_id | number | 必须     |         | 文章所属频道id |          |

**返回数据**

| 名称    | 类型   | 是否必须 | 默认值 | 备注     | 其他信息 |
| :------ | :----- | :----- | :----- | :------- | :----- |
| data    | object | 必须     |         |          |          |
| ├─ id   | string | 必须     |         | 文章id   |          |
| message | string | 必须     |         |          |          |

**返回状态码**

* 201 OK
* 400 请求参数错误
* 401 token过期或未传
* 507 服务器数据库异常

**请求参数cover 中 传递样例为**

*   { type: 0, images: []  }（无图） 
*   { type: 1, images: ["地址1"]  }（单图） 
*   { type: 3, images: ["地址1", "地址2", "地址3"]  }

### 编辑文章

**基本信息**

* **Path:** `/v1_0/mp/articles/:target`
* **Method:** `PUT`

**接口描述:**

编辑文章。如果发表为正式文章，文章的状态会首先变为 待审核状态，即status为1,1分钟后系统会自动审核通过，状态成为审核通过，status为2，审核失败状态一般不存在。

**请求参数**

**Headers**

| 参数名称     | 参数值       | 是否必须 | 示例     | 备注 |
| :----------- | :----------- | :----- | :------- | :--- |
| Content-Type | application/json | 是     |          |      |
| Authorization |              | 是     | 用户token |      |

**路径参数**

| 参数名称 | 示例 | 备注 |
| :------- | :--- | :--- |
| target   |      |      |

**Query**

| 参数名称 | 是否必须 | 示例  | 备注                      |
| :------- | :----- | :---- | :----------------------- |
| draft    | 否     | true | 是否存为草稿，true是 false否 |

**Body**

| 名称        | 类型   | 是否必须 | 默认值 | 备注     | 其他信息 |
| :---------- | :----- | :----- | :----- | :------- | :----- |
| title       | string | 必须     |         | 文章标题 |          |
| content     | string | 必须     |         | 文章内容 |          |
| cover       | object | 必须     |         |          |          |
| ├─ type    | string | 必须     |         | 封面类型, -1:自动，0-无图，1-1张，3-3张 |          |
| ├─ images   | string | 必须     |         | item 类型: string |          |
| channel\_id | number | 必须     |         | 文章所属频道id |          |

**返回数据**

| 名称    | 类型   | 是否必须 | 默认值 | 备注     | 其他信息 |
| :------ | :----- | :----- | :----- | :------- | :----- |
| data    | object | 必须     |         |          |          |
| ├─ id   | string | 必须     |         | 文章id   |          |
| message | string | 必须     |         |          |          |

**返回状态码**

* 201 OK
* 400 请求参数错误
* 401 token过期或未传
* 507 服务器数据库异常

**请求参数cover 中 传递样例为**

*   { type: 0, images: []  }（无图） 
*   { type: 1, images: ["地址1"]  }（单图） 
*   { type: 3, images: ["地址1", "地址2", "地址3"]  }

### 获取文章列表

**基本信息**

* **Path:** `/v1_0/mp/articles`
* **Method:** `GET`

**接口描述:**

获取文章列表。

**请求参数**

**Headers**

| 参数名称     | 参数值       | 是否必须 | 示例     | 备注           |
| :----------- | :----------- | :----- | :------- | :------------- |
| Authorization |              | 是     | 用户令牌 token |                |

**Query**

| 参数名称     | 是否必须 | 示例 | 备注                                                         |
| :----------- | :----- | :--- | :----------------------------------------------------------- |
| status       | 否     |      | 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，-1-全部 |
| channel\_id | 否     |      | 频道id                                                       |
| begin\_pubdate | 否     |      | 开始时间                                                     |
| end\_pubdate   | 否     |      | 结束时间                                                     |
| page         | 否     |      | 页码                                                         |
| size         | 否     |      | 每页数量                                                     |

**Body**

无

**返回数据**

| 名称    | 类型   | 是否必须 | 默认值 | 备注     | 其他信息                                          |
| :------ | :----- | :----- | :----- | :------- | :------------------------------------------------ |
| data    | object | 必须     |         |          |                                                   |
| ├─ current\_page | number | 必须     |         | 当前页码 |                                                   |
| ├─ total\_count  | number | 必须     |         | 总条数   |                                                   |
| ├─ total\_page   | number | 必须     |         | 总页数   |                                                   |
| ├─ results       | array  | 必须     |         | 文章列表 | item 类型: [获取文章详情-返回数据-data](#获取文章详情) |
| message | string | 必须     |         |          |                                                   |

**返回状态码**

* 200 OK
* 400 请求参数错误
* 401 token过期或未传
* 507 服务器数据库异常

### 获取文章详情

**基本信息**

* **Path:** `/v1_0/mp/articles/:target`
* **Method:** `GET`

**接口描述:**

根据文章id获取文章详情

**请求参数**

**Headers**

| 参数名称     | 参数值       | 是否必须 | 示例     | 备注 |
| :----------- | :----------- | :----- | :------- | :--- |
| Authorization |              | 是     | 用户token |      |

**路径参数**

| 参数名称 | 示例 | 备注   |
| :------- | :--- | :----- |
| target   |      | 文章id |

**Body**

无

**返回数据**

| 名称        | 类型   | 是否必须 | 默认值 | 备注     | 其他信息 |
| :---------- | :----- | :----- | :----- | :------- | :----- |
| data    | object | 必须     |         |          |          |
| ├─ id       | string | 必须     |         | 文章id   |          |
| ├─ title    | string | 必须     |         | 文章标题 |          |
| ├─ status   | number | 必须     |         | 文章状态 |          |
| ├─ comment  | boolean | 必须     |         |          |          |
| ├─ pubdate  | string | 必须     |         | 发布时间 |          |
| ├─ read\_count | number | 必须     |         | 阅读量   |          |
| ├─ like\_count | number | 必须     |         | 点赞量   |          |
| ├─ content   | string | 必须     |         | 文章内容 |          |
| ├─ author    | string | 必须     |         | 作者名称 |          |
| ├─ cover     | object | 必须     |         |          |          |
| │  ├─ type  | string | 必须     |         | 封面类型 |          |
| │  ├─ images | string | 必须     |         | 封面地址 |          |
| message | string | 必须     |         |          |          |

**返回状态码**

* 200 OK
* 400 请求参数错误
* 401 token过期或未传
* 507 服务器数据库异常

## 用户

### 发送短信验证码

**基本信息**

* **Path:** `/v1_0/sms/codes/:mobile`
* **Method:** `GET`

**接口描述:**

根据手机号发送验证码

**请求参数**

**Headers**

无

**路径参数**

| 参数名称 | 示例 | 备注 |
| :------- | :--- | :--- |
| mobile   |      | 手机号 |

**Body**

无

**返回数据**

无

**返回状态码**

* 200 OK
* 400 请求参数错误
* 507 服务器数据库异常

### 用户认证（登录注册）

**基本信息**

* **Path:** `/v1_0/authorizations`
* **Method:** `POST`

**接口描述:**

用户认证

**请求参数**

**Headers**

| 参数名称     | 参数值       | 是否必须 | 示例     | 备注 |
| :----------- | :----------- | :----- | :------- | :--- |
| Content-Type | application/json | 是     |          |      |

**Body**

| 名称    | 类型   | 是否必须 | 默认值 | 备注     | 其他信息 |
| :------ | :----- | :----- | :----- | :------- | :----- |
| mobile | string | 必须     |         | 手机号   |          |
| code   | string | 必须     |         | 验证码   |          |

**返回数据**

| 名称    | 类型   | 是否必须 | 默认值 | 备注     | 其他信息 |
| :------ | :----- | :----- | :----- | :------- | :----- |
| data    | object | 必须     |         |          |          |
| ├─ token | string | 必须     |         | 用户token |          |
| message | string | 必须     |         |          |          |

**返回状态码**

* 201 OK
* 400 请求参数错误
* 507 服务器数据库异常

### 编辑用户个人资料

**基本信息**

* **Path:** `/v1_1/users`
* **Method:** `PUT`

**接口描述:**

编辑用户个人资料

**请求参数**

**Headers**

| 参数名称     | 参数值       | 是否必须 | 示例     | 备注 |
| :----------- | :----------- | :----- | :------- | :--- |
| Content-Type | application/json | 是     |          |      |
| Authorization |              | 是     | 用户token |      |

**Body**

| 名称      | 类型   | 是否必须 | 默认值 | 备注 | 其他信息 |
| :-------- | :----- | :----- | :----- | :--- | :----- |
| name      | string | 否     |         | 姓名 |          |
| gender    | number | 否     |         | 性别 |          |
| birthday  | string | 否     |         | 生日 |          |
| location  | string | 否     |         | 位置 |          |
| profession | string | 否     |         | 职业 |          |

**返回数据**

| 名称    | 类型   | 是否必须 | 默认值 | 备注 | 其他信息 |
| :------ | :----- | :----- | :----- | :--- | :----- |
| message | string | 必须     |         |      |          |

**返回状态码**

* 201 OK
* 400 请求参数错误
* 401 token过期或未传
* 507 服务器数据库异常

### 编辑用户照片资料（头像、身份证照片）

**基本信息**

* **Path:** `/v1_0/user/photo`
* **Method:** `PATCH`

**接口描述:**

编辑用户照片资料（头像、身份证照片）

**请求参数**

**Headers**

| 参数名称     | 参数值       | 是否必须 | 示例     | 备注 |
| :----------- | :----------- | :----- | :------- | :--- |
| Content-Type | application/json | 是     |          |      |
| Authorization |              | 是     | 用户token |      |

**Body**

| 名称 | 类型   |
| :---- | :----- |
| photo | string |

**返回数据**

| 名称    | 类型   | 是否必须 | 默认值 | 备注 | 其他信息 |
| :------ | :----- | :----- | :----- | :--- | :----- |
| message | string | 必须     |         |      |          |

**返回状态码**

* 201 OK
* 400 请求参数错误
* 401 token过期或未传
* 507 服务器数据库异常

### 获取用户个人信息

**基本信息**

* **Path:** `/v1_0/user`
* **Method:** `GET`

**接口描述:**

获取用户个人信息

**请求参数**

**Headers**

| 参数名称     | 参数值       | 是否必须 | 示例     | 备注 |
| :----------- | :----------- | :----- | :------- | :--- |
| Authorization |              | 是     | 用户token |      |

**Body**

无

**返回数据**

| 名称        | 类型   | 是否必须 | 默认值 | 备注     | 其他信息 |
| :---------- | :----- | :----- | :----- | :------- | :----- |
| data    | object | 必须     |         |          |          |
| ├─ id       | string | 必须     |         | 用户id   |          |
| ├─ name      | string | 必须     |         | 用户名   |          |
| ├─ photo     | string | 必须     |         | 用户头像 |          |
| ├─ mobile    | string | 必须     |         | 手机号   |          |
| ├─ gender    | number | 必须     |         | 性别     |          |
| ├─ birthday  | string | 必须     |         | 生日     |          |
| ├─ location  | string | 必须     |         | 位置     |          |
| ├─ profession | string | 必须     |         | 职业     |          |
| message | string | 必须     |         |          |          |

**返回状态码**

* 200 OK
* 401 token过期或未传
* 507 服务器数据库异常

### 获取用户频道列表

**基本信息**

* **Path:** `/v1_0/channels`
* **Method:** `GET`

**接口描述:**

获取用户频道列表

**请求参数**

**Headers**

| 参数名称     | 参数值       | 是否必须 | 示例     | 备注 |
| :----------- | :----------- | :----- | :------- | :--- |
| Authorization |              | 是     | 用户token |      |

**Body**

无

**返回数据**

| 名称    | 类型   | 是否必须 | 默认值 | 备注     | 其他信息                                          |
| :------ | :----- | :----- | :----- | :------- | :------------------------------------------------ |
| data    | array  | 必须     |         | 频道列表 | item 类型: [获取所有频道列表-返回数据-data](#获取所有频道列表) |
| message | string | 必须     |         |          |                                                   |

**返回状态码**

* 200 OK
* 401 token过期或未传
* 507 服务器数据库异常

## 频道

### 获取所有频道列表

**基本信息**

* **Path:** `/v1_0/channels`
* **Method:** `GET`

**接口描述:**

获取所有频道列表

**请求参数**

**Headers**

无

**Body**

无

**返回数据**

| 名称    | 类型   | 是否必须 | 默认值 | 备注     | 其他信息 |
| :------ | :----- | :----- | :----- | :------- | :----- |
| data    | array  | 必须     |         | 频道列表 |          |
| ├─ id   | string | 必须     |         | 频道id   |          |
| ├─ name | string | 必须     |         | 频道名称 |          |
| message | string | 必须     |         |          |          |

**返回状态码**

* 200 OK
* 507 服务器数据库异常

## 评论

### 获取评论或评论回复

**基本信息**

* **Path:** `/v1_0/comments`
* **Method:** `GET`

**接口描述:**

获取评论或评论回复

**请求参数**

**Headers**

无

**Query**

| 参数名称 | 是否必须 | 示例 | 备注                                                         |
| :------- | :----- | :--- | :----------------------------------------------------------- |
| type     | 是     | a或c | 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复 |
| source   | 是     |      | 源id，文章id或评论id                                       |
| offset   | 否     |      | 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据 |
| limit    | 否     |      | 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量 |

**Body**

无

**返回数据**

| 名称          | 类型       | 是否必须 | 默认值 | 备注                                                         | 其他信息 |
| :------------ | :--------- | :----- | :----- | :----------------------------------------------------------- | :----- |
| message       | string    | 必须     |         | 提示信息                                                     |          |
| data          | object    | 必须     |         |                                                              |          |
| ├─ total_count | integer   | 必须     |         | 该文章的评论总数 或 该评论的回复总数                         |          |
| ├─ end_id     | string    | 必须     |         | 所有评论或回复的最后一个id（截止offset值，小于此值的offset可以不用发送请求获取评论数据，已经没有数据），若无评论或回复数据，则值为NULL |          |
| ├─ last_id    | string    | 必须     |         | 本次返回结果的最后一个评论id，作为请求下一页数据的offset参数，若本次无具体数据，则值为NULL |          |
| ├─ results     | object [] | 必须     |         | 评论或回复的内容                                             |          |

**results item 类型:**

| 名称        | 类型    | 是否必须 | 默认值 | 备注                     | 其他信息 |
| :---------- | :------ | :----- | :----- | :----------------------- | :----- |
| ├─ com_id   | string  | 必须     |         | 评论或回复id             |          |
| ├─ aut_id   | string  | 必须     |         | 评论或回复的用户id         |          |
| ├─ aut_name | string  | 必须     |         | 用户名称                 |          |
| ├─ aut_photo | string  | 必须     |         | 用户头像url               |          |
| ├─ like_count | integer | 必须     |         | 点赞数量                 |          |
| ├─ reply_count | integer | 必须     |         | 回复数量                 |          |
| ├─ pubdate   | string  | 必须     |         | 创建时间                 |          |
| ├─ content   | string  | 必须     |         | 评论或回复内容             |          |
| ├─ is_liking  | boolean | 必须     |         | 当前用户是否点赞           |          |

**返回状态码**

* 200 OK
* 400 请求参数错误
* 507 数据库错误

## 文件

### 上传图片

**基本信息**

* **Path:** `/v1_0/upload`
* **Method:** `POST`

**接口描述:**

上传图片

**请求参数**

**Headers**

| 参数名称     | 参数值             | 是否必须 | 示例 | 备注 |
| :----------- | :----------------- | :----- | :--- | :--- |
| Content-Type | multipart/form-data | 是     |      |      |

**Body**

| 参数名称 | 参数类型 | 是否必须 | 示例 | 备注     |
| :------- | :------- | :----- | :--- | :------- |
| image    | file     | 是     |      | 图片file |

**返回数据**

| 名称    | 类型   | 是否必须 | 默认值 | 备注         | 其他信息 |
| :------ | :----- | :----- | :----- | :----------- | :----- |
| data    | object | 必须     |         |             |          |
| ├─ url | string | 必须     |         | 上传成功的图片 |          |

**返回状态码**

* 200 OK
* 400 请求参数错误
* 507 数据库错误 

 
 
