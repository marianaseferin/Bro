import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Clock, Users, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Recipes" }

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; tag?: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const { search, tag } = await searchParams

  const recipes = await db.recipe.findMany({
    where: {
      isPublic: true,
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
      ...(tag ? { tags: { has: tag } } : {}),
    },
    include: {
      ingredients: { include: { ingredient: true }, take: 4 },
    },
    orderBy: { createdAt: "desc" },
    take: 24,
  })

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Recipes</h1>
        <p className="text-muted-foreground mt-1">Explore our plant-based recipe library.</p>
      </div>

      <form className="flex gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            name="search"
            defaultValue={search}
            placeholder="Search recipes..."
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </form>

      {recipes.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No recipes found.</p>
          <Link href="/dashboard/cook" className="text-primary text-sm hover:underline mt-2 inline-block">
            Try getting suggestions based on your ingredients →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base leading-snug">{recipe.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs shrink-0">
                    {recipe.difficulty}
                  </Badge>
                </div>
                {recipe.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {recipe.timeMinutes}m
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {recipe.servings} servings
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {recipe.tags.slice(0, 3).map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  {recipe.ingredients
                    .slice(0, 4)
                    .map((ri) => ri.ingredient.emoji ?? "" + ri.ingredient.name)
                    .join(", ")}
                  {recipe.ingredients.length > 4 && ` +${recipe.ingredients.length - 4} more`}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
