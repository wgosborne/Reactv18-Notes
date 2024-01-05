import { useState, useRef, useEffect } from "react";
//import axios, { AxiosError, CanceledError } from "axios";
import apiClient, { CanceledError } from "./services/api-client";
import Message from "./Message";
import Alert from "./components/Alert";
import { Button } from "./components/Button/Button";
import ListGroup from "./components/ListGroup/ListGroup";
import { BsFillCalendarFill } from "react-icons/bs"; //got this from the react-icons docs
import { Like } from "./components/Like";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";
import Form from "./components/Form";
import categories from "./ExpenseApp/categories";
import ExpenseForm from "./ExpenseApp/components/ExpenseForm";
import ExpenseList from "./ExpenseApp/components/ExpenseList";
import ExpenseFilter from "./ExpenseApp/components/ExpenseFilter";
import ProductList from "./components/ProductList";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

function App() {
  const { users, error, isLoading, setUsers, setError } = useUsers(); // custom hook to reuse in components

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((currUser) => currUser.id !== user.id));

    userService.delete(user.id).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Wagner Hufflepuff" };
    setUsers([newUser, ...users]);

    userService
      .create(newUser)
      .then(({ data: savedUser }) => {
        setUsers([savedUser, ...users]);
      })
      .catch((error) => {
        setError(error.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(
      users.map((currUser) =>
        currUser.id === user.id ? updatedUser : currUser
      )
    );

    userService.update(user).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add User
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

// let items = ["New York", "San Francisco", "Chicago", "London"];
// const handleSelectItem = (item: string) => {
//   console.log(item);
// };
// return (
//   <div>
//     <ListGroup
//       items={items}
//       heading="Cities"
//       onSelectItem={handleSelectItem}
//     />
//   </div>

// return (
//   <div className="alert alert-primary">
//     <Alert>
//       Hello <span>World</span>
//     </Alert>
//   </div>
// );

// const [alertVisible, setAlertVisible] = useState(false);

// return (
//   <div>
//     {alertVisible && <Alert onClose={() => setAlertVisible(false)}>Warning!!!!!!!!!</Alert>}
//     <Button color="secondary" onClick={() => setAlertVisible(true)}>
//       Button
//     </Button>
//   </div>
// );

//Calendar Icon
// <div>
//     <BsFillCalendarFill color='blue' size='50'/>
//   </div>

//Button
//<Button color="primary" onClick={() => {}}>Button</Button>

//Liking Button Example
// import { Like } from "./components/Like";
// function App() {
//   return (
//     <div>
//       <Like
//         onLike={() => {
//           console.log("Like! <3");
//         }}
//       />
//     </div>
//   );
// }
// export default App;

//State
//group similar things
//const [person, setPerson] = useState({
//   firstName: '',
//   lastName: ''
// });

//Updating State Object
//we have to pass a whole new object, we cant cherry pick and update
//const handleClick = () => {
//   const newDrink = {
//     ...drink,
//     price: 6
//   }
//   setDrink(newDrink);
// };
//Customer nested object example
//const handleClick = () => {
//   setCustomer({...customer, adress: {...customer.address, zipcode: 35401}})
// }
//Updating Player Example
// function App() {
//   const [game, setGame] = useState({
//     id: 1,
//     player : {
//       name: 'john'
//     }
//   });
//   const handleClick = () => {
//     setGame({...game, player: {...game.player, name : 'bob'}})
//   }
//   return (
//     <div>

//     </div>
//   );
// }
// export default App;

//STATE AND ARRAYS

//Adding to state
//Don't use push because it modifies the array
//const handleClick = () => {
//   setTags([...tags, 'exciting'])
// }
//Pizza Example
// function App() {
//   const [pizza, setPizza] = useState({
//     name: 'spicy pepperoni',
//     toppings: ['mushroom']
//   });
//   const handleClick = () => {
//     setPizza({...pizza, toppings: [...pizza.toppings, 'cheese']})
//   }
//   return (
//     <div>
//     </div>
//   );
// }
// export default App;

//Removing from state
//use filter
//const handleClick = () => {
// setTags(tags.filter(tag => tag !== 'happy'));

//Updating State Arrays
//const handleClick = () => {
//  setTags(tags.map(tag => tag === 'happy' ? 'happiness' : tag))
//Cart Example
// function App() {
//   const [cart, setCart] = useState({
//     discount: 0.1,
//     items: [
//       { id: 1, title: "prod1", quantity: 1 },
//       { id: 2, title: "prod2", quantity: 1 },
//     ],
//   });
//   const handleClick = () => {
//     setCart({
//       ...cart,
//       items: cart.items.map((item) =>
//         item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item
//       ),
//     });
//   };
//   return <div></div>;
// }
// export default App;

//STATE AND OBJECT ARRAYS
// const handleClick = () => {
//   setBugs(bugs.map(bug => bug.id === 1 ? {...bug, speciesAlive: true} : bug))
// }

//Using Immer
// import produce from 'immer';
// setBugs(produce(draft => {
////draft is a copy of the array so we cna make changes then immer will actually make them
//   const bug = draft.find(bug => bug.id === 1)
//   if (bug) {bug.speciesAlive = true};
// }))

//using Immer in a div tag
//{bugs.map(bug => <p key={bug.id}>{bug.name} {bug.speciesAlive ? 'Alive' : 'Extinct'}{</p>)}
//onClick it will change

//Sharing State Between Components
//Cart Example
// import NavBar from "./components/NavBar";
// import Cart from "./components/Cart";
// function App() {
//   const [cartItems, setCartItems] = useState(['prod1', 'prod2']);
//   return (
//     <div>
//       <NavBar count={cartItems.length}/>
//       <Cart cartItems={cartItems} onClear={() => setCartItems([])}/>
//     </div>
//   );
// };
// export default App;

//Expandable Text Example
// import ExpandableText from "./components/ExpandableText";
// function App() {
//   return (
//     <div>
//       <ExpandableText maxChars={10}>
//         Hi!
//       </ExpandableText>
//     </div>
//   );
// }
// export default App;

//ExpenseApp
// import categories from "./ExpenseApp/categories";
// import ExpenseForm from "./ExpenseApp/components/ExpenseForm";
// import ExpenseList from "./ExpenseApp/components/ExpenseList";
// import ExpenseFilter from "./ExpenseApp/components/ExpenseFilter";
// function App() {
//   const [category, setCategory] = useState("");
//   const [expenses, setExpenses] = useState([
//     { id: 1, description: "Milk", amount: 3.49, category: "Groceries" },
//     { id: 2, description: "Coffee", amount: 5.5, category: "Groceries" },
//     { id: 3, description: "Gas", amount: 50, category: "Utilities" },
//   ]);
//   const visibleExpenses = category
//     ? expenses.filter((expense) => expense.category === category)
//     : expenses;
//   return (
//     <div>
//       <div className="mb-5">
//         <ExpenseForm
//           onSubmit={(expense) =>
//             setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
//           }
//         />
//       </div>
//       <div className="mb-3">
//         <ExpenseFilter onSelect={(category) => setCategory(category)} />
//       </div>
//       <ExpenseList
//         expenses={visibleExpenses}
//         onDelete={(id) =>
//           setExpenses(expenses.filter((expense) => expense.id !== id))
//         }
//       />
//     </div>
//   );
// }
// export default App;

//Using Effect
//this will happen after rendering, maintaining the purity of the component
// useEffect(() => {
//   if(ref.current) ref.current.focus();
// })
// //cannot call inside loops, can call multiple times, they will run in order after each render
// useEffect(() => {
//   document.title = 'Wagner'
// });
//Category of Products Example
// import ProductList from "./components/ProductList";
// function App() {
//   const [category, setCategory] = useState('');
//   const ref = useRef<HTMLInputElement>(null);
//   return (
//     <div>
//       <select name="" id="" className="form-select" onChange={(event) => setCategory(event.target.value)}>
//         <option value=""></option>
//         <option value="clothing">Clothing</option>
//         <option value="household">Household</option>
//       </select>
//       <ProductList category={category}/>
//     </div>
//   );
// }
// export default App;
//Connecting and Disconnecting Example
// const connect = () => {
//   console.log('connecting')
// };
// const disconnect = () => {
//   console.log('disconnecting')
// };
// function App() {
//   useEffect(() => {
//     connect();
//     return () => disconnect(); //clean up function to unsubsribe or disconnect or hide modal
//   });
//   return (
//     <div>
//     </div>
//   );
// }
// export default App;

//Using .then() and .catch() User API Example
//get returns a promise which returns either a response or error
// interface User {
//   id: number;
//   name: string;
// }
// function App() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [error, setError] = useState('');
//   useEffect(() => {
//     axios.get<User[]>("https://jsonplaceholder.typicode.com/users")
//       .then((response) => {
//         setUsers(response.data);
//       }).catch((error) => {
//         setError(error.message);
//       });

//   }, []);
//   return (
//     <>
//       {error && <p className="text-danger">{error}</p>}
//       <ul>
//         {users.map(user => <li key={user.id}>{user.name}</li>)}
//       </ul>
//     </>
//   );
// }
// export default App;

//Await and Async in Users Example
//async is good, but not good for using in useEffect
// interface User {
//   id: number;
//   name: string;
// }
// function App() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [error, setError] = useState("");
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try{
//         const response = await axios.get<User[]>(
//           "https://jsonplaceholder.typicode.com/users"
//         );
//         setUsers(response.data);
//       } catch (error) {
//         setError((error as AxiosError).message);
//       }
//     };
//     fetchUsers();
//   }, []);
//   return (
//     <>
//       {error && <p className="text-danger">{error}</p>}
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>{user.name}</li>
//         ))}
//       </ul>
//     </>
//   );
// }
// export default App;

//Final User Data Example
//Shows Loading Indicator, fetching using axios, deleting, creating, and updating
// import { useState, useRef, useEffect } from "react";
// import axios, { AxiosError, CanceledError } from "axios";
// interface User {
//   id: number;
//   name: string;
// }
// function App() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   useEffect(() => {
//     const controller = new AbortController(); //built in class in modern browsers for cancelling
//     setIsLoading(true);
//     axios
//       .get<User[]>("https://jsonplaceholder.typicode.com/users", {
//         signal: controller.signal, //config object
//       })
//       .then((response) => {
//         setUsers(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         if (error instanceof CanceledError) return;
//         setError(error.message);
//         setIsLoading(false);
//       })
//       .finally(() => {
//         // setIsLoading(false); //works in prod but not with strict mode on
//       });
//     return () => controller.abort(); //cleaup function
//   }, []);
//   const deleteUser = (user: User) => {
//     const originalUsers = [...users];
//     setUsers(users.filter((currUser) => currUser.id !== user.id));
//     axios
//       .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
//       .catch((error) => {
//         setError(error.message);
//         setUsers(originalUsers);
//       });
//   };
//   const addUser = () => {
//     const originalUsers = [...users]
//     const newUser = { id: 0, name: 'Wagner Hufflepuff' };
//     setUsers([newUser, ...users]);
//     axios.post("https://jsonplaceholder.typicode.com/users", newUser)
//       .then(({ data : savedUser}) => {
//         setUsers([savedUser, ...users]);
//       }).catch((error) => {
//         setError(error.message);
//         setUsers(originalUsers);
//       })
//   }
//   const updateUser = (user: User) => {
//     const originalUsers = [...users];
//     const updatedUser = {...user, name: user.name + '!'};
//     setUsers(users.map((currUser) => currUser.id === user.id ? updatedUser : currUser));
//     //can use put or patch for updating
//     axios.patch("https://jsonplaceholder.typicode.com/users/" + user.id, updatedUser)
//       .catch((error) => {
//         setError(error.message);
//         setUsers(originalUsers);
//       })
//   };
//   return (
//     <>
//       {error && <p className="text-danger">{error}</p>}
//       {isLoading && <div className="spinner-border"></div>}
//       <button className="btn btn-primary mb-3" onClick={addUser}>Add User</button>
//       <ul className="list-group">
//         {users.map((user) => (
//           <li
//             key={user.id}
//             className="list-group-item d-flex justify-content-between"
//           >
//             {user.name}
//             <div>
//               <button className="btn btn-outline-secondary mx-1" onClick={() => updateUser(user)}>Update</button>
//               <button
//                 className="btn btn-outline-danger"
//                 onClick={() => deleteUser(user)}
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }
// export default App;
