import React, { FormEvent, useRef, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({ //basicallly the interface but with built in validation
  name: z.string().min(3, { message: 'Name must be at least 3 characters.'}),
  age: z.number( { invalid_type_error: 'Age field is required.' }).min(18, { message: 'Age must be at least 18.'}),
});

type FormData = z.infer<typeof schema>; //now this is basically the interface

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name && (
          <p className="text-danger">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age", { valueAsNumber: true })}
          id="age"
          type="number"
          className="form-control"
        />
        {errors.age && (
          <p className="text-danger">{errors.age.message}</p>
        )}
      </div>
      <button disabled={!isValid /*This takes away the need for the error message */} className="btn btn-primary">Submit</button>
    </form>
  );
};

export default Form;

//Using Ref Hook Example
// import React, { FormEvent, useRef } from "react";
// const Form = () => {
//     const nameRef = useRef<HTMLInputElement>(null);
//     const ageRef = useRef<HTMLInputElement>(null);
//     const person = { name : '', age: 0 };
//     const handleSubmit = (event : FormEvent) => {
//         event.preventDefault(); //prevents refresh
//         if(nameRef.current !== null) {
//             person.name = nameRef.current.value;
//         }
//         if(ageRef.current !== null) {
//             person.age = parseInt(ageRef.current.value);
//         }
//         console.log(person)
//     }
//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label htmlFor="name" className="form-label">
//           Name
//         </label>
//         <input ref={nameRef} id="name" type="text" className="form-control" />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="age" className="form-label">
//           Age
//         </label>
//         <input ref={ageRef} id="age" type="number" className="form-control" />
//       </div>
//       <button className="btn btn-primary">Submit</button>
//     </form>
//   );
// };
// export default Form;

//Using State Example
// import React, { FormEvent, useRef, useState } from "react";
// const Form = () => {
//     const [person, setPerson] = useState({
//     name: "",
//     age: "",
//   });
//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault(); //prevents refresh
//     console.log(person);
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label htmlFor="name" className="form-label">
//           Name
//         </label>
//         <input
//           onChange={(event) =>
//             setPerson({ ...person, name: event.target.value })
//           }
//           value={person.name}
//           id="name"
//           type="text"
//           className="form-control"
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="age" className="form-label">
//           Age
//         </label>
//         <input
//           onChange={(event) =>
//             setPerson({ ...person, age: event.target.value })
//           }
//           value={person.age} //value of the input field is not controlled by DOM, but state. Keeps everything in sync
//           id="age"
//           type="number"
//           className="form-control"
//         />
//       </div>
//       <button className="btn btn-primary">Submit</button>
//     </form>
//   );
// };
// export default Form;

//Building a form using React Hook Form
// import React, { FormEvent, useRef, useState } from "react";
// import { useForm, FieldValues } from "react-hook-form";
// const Form = () => {
//   const { register, handleSubmit } = useForm();

//   const onSubmit = (data: FieldValues) => {
//     console.log(data);
//   };
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="mb-3">
//         <label htmlFor="name" className="form-label">
//           Name
//         </label>
//         <input
//           {...register("name")}
//           id="name"
//           type="text"
//           className="form-control"
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="age" className="form-label">
//           Age
//         </label>
//         <input
//           {...register("age")}
//           id="age"
//           type="number"
//           className="form-control"
//         />
//       </div>
//       <button className="btn btn-primary">Submit</button>
//     </form>
//   );
// };
// export default Form;

//Building a form using React Hook Form and Validation
// import React, { FormEvent, useRef, useState } from "react";
// import { useForm, FieldValues } from "react-hook-form";
// interface FormData {
//     name: string;
//     age: number;
// }
// const Form = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();
//   const onSubmit = (data: FieldValues) => {
//     console.log(data);
//   };
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="mb-3">
//         <label htmlFor="name" className="form-label">
//           Name
//         </label>
//         <input
//           {...register("name", { required: true, minLength: 3 })}
//           id="name"
//           type="text"
//           className="form-control"
//         />
//         {errors.name?.type === 'required' && <p className='text-danger'>The name field is required</p>}
//         {errors.name?.type === 'minLength' && <p className='text-danger'>The name must be at least 3 characters</p>}
//       </div>
//       <div className="mb-3">
//         <label htmlFor="age" className="form-label">
//           Age
//         </label>
//         <input
//           {...register("age")}
//           id="age"
//           type="number"
//           className="form-control"
//         />
//       </div>
//       <button className="btn btn-primary">Submit</button>
//     </form>
//   );
// };
// export default Form;
