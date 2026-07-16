# TypeScript Interview Questions

## 18. TypeScript

## 1. What is TypeScript?

TypeScript is a strongly typed superset of JavaScript. It adds static typing, interfaces, generics, and compile-time checks, then compiles to plain JavaScript.

## 2. Why use TypeScript with React?

TypeScript makes React code safer and easier to maintain. It helps type component props, hooks, refs, events, API responses, and reusable components. It also improves autocomplete and refactoring.

## 3. TypeScript versus JavaScript.

JavaScript is dynamically typed and runs directly in browsers or Node.js. TypeScript adds static types and catches many errors during development, but it needs a compile step before running as JavaScript.

## 4. interface versus type.

`interface` is commonly used for object shapes and can be extended or declaration-merged. `type` can describe objects, unions, intersections, tuples, primitives, and advanced type expressions.

```ts
interface User {
  id: number;
  name: string;
}

type Status = "active" | "inactive";
```

Use `interface` or `type` for object props. Use `type` when you need unions or more complex composition.

## 5. any versus unknown.

`any` disables type checking. `unknown` accepts any value but forces you to narrow the type before using it.

```ts
let value: unknown = "hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

Prefer `unknown` when a value is truly unknown.

## 6. never versus void.

`void` means a function does not return a useful value. `never` means a function never completes normally or a value should be impossible.

```ts
function logMessage(): void {
  console.log("Done");
}

function throwError(): never {
  throw new Error("Failed");
}
```

## 7. What is a union type?

A union type allows a value to be one of several possible types.

```ts
type Status = "idle" | "loading" | "success" | "error";
```

Unions are useful for status values, flexible parameters, and component variants.

## 8. What is an intersection type?

An intersection type combines multiple types into one type that must satisfy all of them.

```ts
type User = { id: number; name: string };
type Admin = { permissions: string[] };

type AdminUser = User & Admin;
```

## 9. What are generics?

Generics let you write reusable code while preserving type information.

```ts
function identity<T>(value: T): T {
  return value;
}

const result = identity<string>("Asha");
```

They are useful for reusable hooks, API helpers, utilities, and components.

## 10. What is type inference?

Type inference means TypeScript automatically figures out a type from the value or usage.

```ts
const count = 10; // inferred as number
```

You do not need to manually annotate every obvious type.

## 11. What is type narrowing?

Type narrowing reduces a broad type to a more specific type using checks such as `typeof`, `instanceof`, equality checks, `in`, or custom type guards.

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

## 12. What are type guards?

Type guards are runtime checks that tell TypeScript a value has a specific type.

```ts
type User = { name: string };

function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "name" in value;
}
```

The `value is User` return type helps TypeScript narrow safely.

## 13. What does keyof do?

`keyof` creates a union of the keys of a type.

```ts
type User = { id: number; name: string };
type UserKey = keyof User; // "id" | "name"
```

It is useful for generic property access.

## 14. What does typeof do in a type context?

In a type context, `typeof` gets the TypeScript type of an existing variable or value.

```ts
const defaultUser = { id: 1, name: "Asha" };
type User = typeof defaultUser;
```

This is different from runtime `typeof`, which returns values like `"string"` or `"number"`.

## 15. What are utility types?

Utility types are built-in helpers that transform existing types. Common examples are `Partial`, `Required`, `Pick`, `Omit`, `Record`, `Readonly`, `ReturnType`, and `Parameters`.

## 16. Explain Partial, Required, Pick, Omit and Record.

`Partial<T>` makes all properties optional.

```ts
type UpdateUser = Partial<User>;
```

`Required<T>` makes all properties required.

```ts
type CompleteUser = Required<User>;
```

`Pick<T, K>` selects specific properties.

```ts
type UserSummary = Pick<User, "id" | "name">;
```

`Omit<T, K>` removes specific properties.

```ts
type PublicUser = Omit<User, "password">;
```

`Record<K, T>` creates an object type with keys `K` and values `T`.

```ts
type UsersById = Record<string, User>;
```

## 17. What are optional properties?

Optional properties may be missing from an object. They are marked with `?`.

```ts
type User = {
  id: number;
  email?: string;
};
```

When reading optional properties, handle `undefined`.

## 18. What are readonly properties?

`readonly` properties cannot be reassigned after creation.

```ts
type User = {
  readonly id: number;
  name: string;
};
```

This helps prevent accidental mutation.

## 19. Enum versus union of string literals.

Enums create runtime objects and are useful when named runtime constants are needed. String literal unions are type-only and are often simpler for React state and props.

```ts
type Status = "idle" | "loading" | "success" | "error";
```

String literal unions are commonly preferred for lightweight values.

## 20. How do you type React component props?

Create a props type or interface and use it in the component parameter.

```tsx
type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
};

function Button({ label, disabled, onClick }: ButtonProps) {
  return <button disabled={disabled} onClick={onClick}>{label}</button>;
}
```

## 21. How do you type useState?

TypeScript often infers `useState` automatically. Add a generic when the initial value is empty, nullable, or ambiguous.

```tsx
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<string[]>([]);
```

## 22. How do you type an event handler?

Use React event types such as `ChangeEvent`, `MouseEvent`, and `FormEvent`.

```tsx
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  setValue(event.target.value);
}

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
}
```

## 23. How do you type a ref?

Use `useRef` with the correct DOM element type and `null` as the initial value.

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);

function focusInput() {
  inputRef.current?.focus();
}
```

## 24. How do you type children?

Use `React.ReactNode` for most component children.

```tsx
type CardProps = {
  children: React.ReactNode;
};

function Card({ children }: CardProps) {
  return <section>{children}</section>;
}
```

`React.ReactNode` supports JSX, strings, numbers, arrays, fragments, `null`, and `undefined`.

## 25. How do you type API responses?

Create a type that matches the expected response and use it in the API function.

```ts
type UserResponse = {
  id: number;
  name: string;
  email: string;
};

async function fetchUser(id: number): Promise<UserResponse> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

For important data, validate runtime responses with a schema library like Zod because TypeScript does not validate server data at runtime.

## 26. How do you create a generic reusable component?

Use a generic type parameter for the data shape.

```tsx
type SelectProps<T> = {
  options: T[];
  getLabel: (option: T) => string;
  onSelect: (option: T) => void;
};

function Select<T>({ options, getLabel, onSelect }: SelectProps<T>) {
  return (
    <ul>
      {options.map((option, index) => (
        <li key={index} onClick={() => onSelect(option)}>
          {getLabel(option)}
        </li>
      ))}
    </ul>
  );
}
```

Generics keep the component reusable without losing type safety.

## 27. What is a discriminated union?

A discriminated union is a union where each member has a common field that identifies its shape.

```ts
type ApiState =
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error"; error: string };

function renderState(state: ApiState) {
  if (state.status === "success") {
    return state.data.length;
  }
}
```

The `status` field lets TypeScript narrow the correct object shape.

## 28. What is type assertion?

Type assertion tells TypeScript to treat a value as a specific type.

```ts
const input = document.getElementById("email") as HTMLInputElement;
```

Use it carefully because it does not change the runtime value and can hide real type problems.

## 29. What is declaration merging?

Declaration merging means TypeScript combines multiple declarations with the same name. Interfaces are the most common example.

```ts
interface User {
  id: number;
}

interface User {
  name: string;
}
```

The final `User` interface has both `id` and `name`.

## 30. What are .d.ts files?

`.d.ts` files are declaration files. They describe the types of JavaScript code without containing implementation.

They are used to provide types for libraries, global variables, modules, and generated APIs.
