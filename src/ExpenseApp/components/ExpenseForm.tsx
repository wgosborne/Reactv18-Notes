import React, { FormEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import categories from "../categories";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//an enum is one of many objects
const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters." })
    .max(50, { message: "Description cannot be more than 50 characters." }),
  amount: z
    .number({ invalid_type_error: "Amount field is required." })
    .min(0.01, { message: "Amount must be at least .01." })
    .max(1_000_000, {
      message:
        "Amount must be less than 1 million. If you bought anything that cost more than a million... girl.",
    }),
  category: z.enum(categories, {
    errorMap: () => ({
      message: "Category is required.",
    }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit((data) => {
      onSubmit(data);
      reset(); //resets the form to blank
    })}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select {...register("category")} id="category" className="form-select">
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ExpenseForm;
