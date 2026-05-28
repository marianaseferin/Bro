import { z } from "zod"

export const SuggestionRequestSchema = z.object({
  ingredients: z.array(z.string().min(1)).min(1, "Add at least one ingredient"),
  preference: z.string().optional(),
  maxTime: z.number().min(5).max(120).optional(),
  servings: z.number().min(1).max(10).optional(),
})

export const GoalCreateSchema = z.object({
  type: z.enum([
    "REDUCE_MEAT",
    "VEGAN",
    "VEGETARIAN",
    "WHOLE_FOODS",
    "LOW_CARB",
    "HIGH_PROTEIN",
    "GENERAL_HEALTH",
  ]),
  notes: z.string().max(500).optional(),
})

export const GoalUpdateSchema = z.object({
  status: z.enum(["ACTIVE", "COMPLETED", "PAUSED"]),
  notes: z.string().max(500).optional(),
})

export const InteractionSchema = z.object({
  suggestionId: z.string().cuid(),
  action: z.enum(["COOK", "SWAP", "SAVE", "SKIP", "SHARE"]),
})

export const RecipeFilterSchema = z.object({
  tags: z.array(z.string()).optional(),
  maxTime: z.number().optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(12),
})

export type SuggestionRequest = z.infer<typeof SuggestionRequestSchema>
export type GoalCreate = z.infer<typeof GoalCreateSchema>
export type GoalUpdate = z.infer<typeof GoalUpdateSchema>
export type RecipeFilter = z.infer<typeof RecipeFilterSchema>
