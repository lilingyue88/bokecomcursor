---
title: "TypeScript 实用技巧总结"
date: "2025-01-20"
summary: "记录日常开发中积累的 TypeScript 使用技巧和最佳实践"
tags: ["TypeScript", "前端开发", "技巧总结"]
---

# TypeScript 实用技巧总结

## 类型推断优化

### 1. 使用 const assertions

```typescript
// 不好的写法
const colors = ['red', 'green', 'blue']; // 类型推断为 string[]

// 好的写法
const colors = ['red', 'green', 'blue'] as const; // 类型推断为 readonly ['red', 'green', 'blue']
```

### 2. 条件类型的使用

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

// 使用示例
type User = { name: string } | null;
type ValidUser = NonNullable<User>; // { name: string }
```

## 接口设计技巧

### 1. 使用 Partial 和 Required

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

// 创建用户时，所有字段都是可选的
type CreateUser = Partial<User>;

// 更新用户时，某些字段是必需的
type UpdateUser = Partial<User> & Pick<User, 'id'>;
```

### 2. 使用 Record 类型

```typescript
// 定义 API 响应类型
type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

// 使用 Record 定义多个 API 端点
type ApiEndpoints = Record<string, ApiResponse<any>>;
```

## 泛型高级用法

### 1. 条件泛型

```typescript
type IsArray<T> = T extends Array<any> ? true : false;

type Test1 = IsArray<string[]>; // true
type Test2 = IsArray<string>;   // false
```

### 2. 映射类型

```typescript
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type ReadonlyUser = Readonly<User>;
type MutableUser = Mutable<ReadonlyUser>; // 移除 readonly
```

## 实用工具类型

### 1. 自定义工具类型

```typescript
// 提取函数参数类型
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// 提取函数返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

### 2. 深度可选类型

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface NestedObject {
  user: {
    profile: {
      name: string;
      age: number;
    };
  };
}

type PartialNested = DeepPartial<NestedObject>;
```

## 错误处理技巧

### 1. 使用 Result 类型

```typescript
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const user = await api.getUser(id);
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
```

### 2. 类型守卫

```typescript
function isUser(obj: any): obj is User {
  return obj && typeof obj.name === 'string' && typeof obj.email === 'string';
}

// 使用
const data: unknown = await fetchData();
if (isUser(data)) {
  console.log(data.name); // TypeScript 知道 data 是 User 类型
}
```

## 性能优化技巧

### 1. 避免不必要的类型计算

```typescript
// 不好的写法 - 每次都会重新计算类型
type BadType<T> = T extends any ? T[] : never;

// 好的写法 - 使用条件类型缓存
type GoodType<T> = [T] extends [never] ? never : T[];
```

### 2. 使用 const 断言

```typescript
// 对于不会改变的对象，使用 const 断言
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
} as const;

// 这样 config 的类型就是字面量类型，而不是 string | number
```

## 总结

这些 TypeScript 技巧可以帮助我们写出更类型安全、更易维护的代码。关键是要理解类型系统的原理，并在实践中不断积累经验。

记住，TypeScript 的类型系统是一个强大的工具，合理使用可以大大提升代码质量。
