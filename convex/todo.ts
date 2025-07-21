import { ConvexError, v } from "convex/values";
import { mutation, query } from "../convex/_generated/server";

//iegūstam todos no db

export const getTodos = query({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").order("desc").collect();
        return todos;
    }
});

// todo pievienoshanas funkcija

export const addTodo = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        const todoId = await ctx.db.insert("todos", {
            text: args.text,
            isCompleted: false
        });
        return todoId;
    }
});


// pārslēgs pogai - ir vai nav todo

export const toggleTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id);
        if (!todo) {
            throw new ConvexError("Todo not found");
        }
        await ctx.db.patch(args.id, {
            isCompleted: !todo.isCompleted
        });
    }
})

// todo dzēšanas funkcija

export const deleteTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    }
})

// todo rediģēšanas funkcija

export const updateTodo = mutation({
    args: { id: v.id("todos"), text: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            text: args.text
        });
    }
})

// reset app btn funkcija (visi todos tiek dzēsti)

export const clearAllTodos = mutation(async ({ db }) => {
    const todos = await db.query("todos").collect();
    for (const todo of todos) {
        await db.delete(todo._id);
    }
    return { deletedCount: todos.length };
});

