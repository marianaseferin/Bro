"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Target, CheckCircle, PauseCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { BroCompanion } from "@/components/bro/BroCompanion"

const GOAL_LABELS: Record<string, string> = {
  REDUCE_MEAT: "Reduce meat consumption",
  VEGAN: "Go fully vegan",
  VEGETARIAN: "Go vegetarian",
  WHOLE_FOODS: "Eat more whole foods",
  LOW_CARB: "Low carb diet",
  HIGH_PROTEIN: "High protein diet",
  GENERAL_HEALTH: "General healthy eating",
}

const STATUS_ICONS = {
  ACTIVE: <Target className="h-4 w-4 text-primary" />,
  COMPLETED: <CheckCircle className="h-4 w-4 text-green-500" />,
  PAUSED: <PauseCircle className="h-4 w-4 text-muted-foreground" />,
}

export default function GoalsPage() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [goalType, setGoalType] = useState("")

  const { data: goals = [] } = useQuery({
    queryKey: ["goals"],
    queryFn: () => fetch("/api/goals").then((r) => r.json()),
  })

  const createGoal = useMutation({
    mutationFn: (type: string) =>
      fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      }).then((r) => {
        if (!r.ok) throw new Error("Failed")
        return r.json()
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] })
      toast.success("Goal created! You've got this!")
      setOpen(false)
      setGoalType("")
    },
    onError: () => toast.error("Failed to create goal"),
  })

  const updateGoal = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      fetch(`/api/goals?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }).then((r) => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] })
      toast.success("Goal updated!")
    },
  })

  const active = goals.filter((g: { status: string }) => g.status === "ACTIVE")
  const completed = goals.filter((g: { status: string }) => g.status === "COMPLETED")

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <BroCompanion
          mood={completed.length > 0 ? "excited" : "doctor"}
          message={
            completed.length > 0
              ? `${completed.length} goal${completed.length !== 1 ? "s" : ""} completed! Amazing progress!`
              : "Setting goals is the first step to lasting change."
          }
          size="md"
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shrink-0">
              <Plus className="h-4 w-4" />
              New goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set a new goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>What's your goal?</Label>
                <Select value={goalType} onValueChange={setGoalType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a goal..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(GOAL_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full"
                disabled={!goalType || createGoal.isPending}
                onClick={() => createGoal.mutate(goalType)}
              >
                {createGoal.isPending ? "Creating..." : "Set goal"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {active.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active</h2>
          {active.map((goal: { id: string; type: string; status: string; startDate: string }) => (
            <Card key={goal.id}>
              <CardContent className="flex items-center justify-between gap-3 p-4">
                <div className="flex items-center gap-3">
                  {STATUS_ICONS[goal.status as keyof typeof STATUS_ICONS]}
                  <div>
                    <p className="text-sm font-medium">{GOAL_LABELS[goal.type] ?? goal.type}</p>
                    <p className="text-xs text-muted-foreground">
                      Started {new Date(goal.startDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateGoal.mutate({ id: goal.id, status: "COMPLETED" })}
                  >
                    Complete
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateGoal.mutate({ id: goal.id, status: "PAUSED" })}
                  >
                    Pause
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {completed.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Completed</h2>
          {completed.map((goal: { id: string; type: string; status: string }) => (
            <Card key={goal.id} className="opacity-70">
              <CardContent className="flex items-center gap-3 p-4">
                {STATUS_ICONS.COMPLETED}
                <p className="text-sm">{GOAL_LABELS[goal.type] ?? goal.type}</p>
                <Badge variant="success" className="ml-auto text-xs">Done</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {goals.length === 0 && (
        <Card className="py-12 text-center">
          <CardContent>
            <Target className="h-12 w-12 text-muted mx-auto mb-3" />
            <p className="font-medium">No goals yet</p>
            <p className="text-sm text-muted-foreground mt-1">Start by setting your first food goal above.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
