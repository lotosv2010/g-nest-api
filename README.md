# g-nest-app

nest 框架的后端模板

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## 安装

```bash
pnpm install
```

## 运行

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod

# 测试

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## docker

```bash
# 运行Docker容器，-d参数表示在后台运行容器，不显示容器的输出
$ docker-compose up -d

# 停止Docker Compose项目
$ docker-compose down

# 删除Docker容器
$ docker-compose rm -f

# 查看容器
$ docker ps

```

## License

Nest is [MIT licensed](LICENSE).

## 参考资料

### 生命周期

![生命周期](./public/image/lifecycle.png)

### 接口服务

![接口服务](./public/image/api-service.png)

### 核心概念

![核心概念](./public/image/core.png)

### 数据库联合查询对比

![数据库联合查询对比](./public/image/join.png)

### 关于方法的全名

![关于方法的全名](./public/image/csr.png)

### 服务与存储库的区别

![服务与存储库的区别](./public/image/sr.png)

### TypeOrm 方法对比

![TypeOrm 方法对比](./public/image/svr.png)

### 管道的应用

![管道的应用](./public/image/pipe.png)

### 管道的类型

![管道的类型](./public/image/pipe-type.png)

### 创建管道的过程

![创建管道的过程](./public/image/create-pipe.png)

### JWT

![JWT](./public/image/jwt.png)

### JwtStrategy

![JwtStrategy](./public/image/strategy.png)

### signup 流程

![signup 流程](./public/image/signup.png)

### 守卫和拦截器区别

![守卫和拦截器区别](./public/image/gi.png)

### 序列化流程

![序列化流程](./public/image/serialize.png)
