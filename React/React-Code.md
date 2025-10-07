## Passing Data from Parent to Child Component in React (props)

```javascript
//App.js
import React from 'react';
import Parent from './Parent';

export default function App() {
  return (
    <div>
      <Parent />
    </div>
  );
}
```

```javascript
//Child.js
import React from 'react';

const Child = (props) => {
  return (
    <>
      <div>{props.sendData}</div>
    </>
  );
};
export default Child;
```

```javascript
//Parent.js
import React, { useState } from 'react';
import Child from './Child';
const Parent = () => {
  const [data, setData] = useState('');
  const [show, setShow] = useState('');
  function sendData() {
    setData(show);
  }
  function loadData(e) {
    setShow(e.target.value);
  }
  return (
    <>
      <Child sendData={data} />
      <input onChange={(e) => loadData(e)} />
      <button onClick={sendData}>Click</button>
    </>
  );
};
export default Parent;
```



## Passing data from child to parent (callback fn)

```javascript
// App.js
import React from 'react';
import './style.css';
import ParentComponent from './Parent.js';
export default function App() {
  return (
    <div>
      <ParentComponent />
    </div>
  );
}
```

```javascript
// Parent.js
import React, { useState } from 'react';
import ChildComponent from './Child';

function ParentComponent() {
  const [childData, setChildData] = useState('');

  // Callback function to receive data from child
  const handleChildData = (data) => {
    setChildData(data);
  };

  return (
    <div>
      <h2>Parent Component</h2>
      <p>Data from child: {childData}</p>
      <ChildComponent onData={handleChildData} />
    </div>
  );
}

export default ParentComponent;
```

```javascript
// Child.js
import React, { useState } from 'react';

function ChildComponent({ onData }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendDataToParent = () => {
    // Invoke the callback function passed from the parent
    onData(inputValue);
  };

  return (
    <div>
      <h2>Child Component</h2>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={sendDataToParent}>Send Data to Parent</button>
    </div>
  );
}

export default ChildComponent;
```


## Redux Toolkit Example

```javascript
//AuthSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
```

```javascript
//store.js
import { configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
export const store = configureStore({
    reducer:{
        auth:authReducer
    }
})
```

```javascript
//Use
import {useDispatch, useSelector} from "react-redux"
const authStatus = useSelector((state) => state.auth.status);
const dispatch = useDispatch();
dispatch(authLogin(response.data));
```
