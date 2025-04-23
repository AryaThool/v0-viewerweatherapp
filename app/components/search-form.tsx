"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  onSearch: (location: string) => void
  isLoading?: boolean
}

export function SearchForm({ onSearch, isLoading = false }: SearchFormProps) {
  const [location, setLocation] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim()) {
      onSearch(location.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md space-x-2">
      <Input
        type="text"
        placeholder="Enter city or location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading || !location.trim()}>
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Search className="h-4 w-4" />
        )}
        <span className="ml-2 hidden sm:inline">Search</span>
      </Button>
    </form>
  )
}

