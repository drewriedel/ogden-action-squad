"use client";

import { Badge } from "@/components/ui/badge";

import type React from "react";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SearchIcon, FilterIcon, XIcon } from "lucide-react";

// Define categories and action types
const categories = [
  { id: "politics", label: "Politics" },
  { id: "social", label: "Social Issues" },
  { id: "environment", label: "Environment" },
  { id: "economy", label: "Economy" },
  { id: "healthcare", label: "Healthcare" },
  { id: "education", label: "Education" },
  { id: "housing", label: "Housing" },
  { id: "immigration", label: "Immigration" },
  { id: "civil-rights", label: "Civil Rights" },
];

const actionTypes = [
  { id: "contact", label: "Contact Officials" },
  { id: "volunteer", label: "Volunteer" },
  { id: "donate", label: "Donate" },
  { id: "attend", label: "Attend Events" },
  { id: "sign", label: "Sign Petitions" },
  { id: "share", label: "Share Information" },
];

const governmentLevels = [
  { id: "all", label: "All Levels" },
  { id: "local", label: "Local" },
  { id: "state", label: "State" },
  { id: "federal", label: "Federal" },
];

export function CategorySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial values from URL
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",").filter(Boolean) || []
  );
  const [selectedActionTypes, setSelectedActionTypes] = useState<string[]>(
    searchParams.get("actions")?.split(",").filter(Boolean) || []
  );
  const [governmentLevel, setGovernmentLevel] = useState(
    searchParams.get("level") || "all"
  );

  // Toggle filter panel on mobile
  const [showFilters, setShowFilters] = useState(false);

  // Handle category selection
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle action type selection
  const toggleActionType = (actionTypeId: string) => {
    setSelectedActionTypes((prev) =>
      prev.includes(actionTypeId)
        ? prev.filter((id) => id !== actionTypeId)
        : [...prev, actionTypeId]
    );
  };

  // Handle search submission
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set("q", searchQuery);
    }

    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }

    if (selectedActionTypes.length > 0) {
      params.set("actions", selectedActionTypes.join(","));
    }

    if (governmentLevel && governmentLevel !== "all") {
      params.set("level", governmentLevel);
    }

    router.push(`/categories?${params.toString()}`);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedActionTypes([]);
    setGovernmentLevel("all");
    router.push("/categories");
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search news articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" className="md:w-auto">
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            className="md:hidden flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterIcon className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className={`${showFilters ? "block" : "hidden"} md:block`}>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Filter Results</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 text-xs"
                >
                  <XIcon className="h-3 w-3 mr-1" />
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Categories */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <Label htmlFor={`category-${category.id}`}>
                          {category.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Government Level */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Government Level</h4>
                  <RadioGroup
                    value={governmentLevel}
                    onValueChange={setGovernmentLevel}
                  >
                    {governmentLevels.map((level) => (
                      <div
                        key={level.id}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={level.id}
                          id={`level-${level.id}`}
                        />
                        <Label htmlFor={`level-${level.id}`}>
                          {level.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Action Types */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Action Types</h4>
                  <div className="space-y-2">
                    {actionTypes.map((actionType) => (
                      <div
                        key={actionType.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`action-${actionType.id}`}
                          checked={selectedActionTypes.includes(actionType.id)}
                          onCheckedChange={() =>
                            toggleActionType(actionType.id)
                          }
                        />
                        <Label htmlFor={`action-${actionType.id}`}>
                          {actionType.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button type="submit" className="md:hidden">
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>

      {/* Active filters display */}
      {(selectedCategories.length > 0 ||
        selectedActionTypes.length > 0 ||
        governmentLevel !== "all" ||
        searchQuery) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {searchQuery && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1"
              onClick={() => {
                setSearchQuery("");
                handleSearch();
              }}
            >
              Search: {searchQuery}
              <XIcon className="h-3 w-3 ml-1 cursor-pointer" />
            </Badge>
          )}

          {selectedCategories.map((categoryId) => {
            const category = categories.find((c) => c.id === categoryId);
            return (
              <Badge
                key={categoryId}
                variant="secondary"
                className="flex items-center gap-1"
                onClick={() => {
                  toggleCategory(categoryId);
                  handleSearch();
                }}
              >
                {category?.label}
                <XIcon className="h-3 w-3 ml-1 cursor-pointer" />
              </Badge>
            );
          })}

          {governmentLevel !== "all" && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1"
              onClick={() => {
                setGovernmentLevel("all");
                handleSearch();
              }}
            >
              Level:{" "}
              {governmentLevels.find((l) => l.id === governmentLevel)?.label}
              <XIcon className="h-3 w-3 ml-1 cursor-pointer" />
            </Badge>
          )}

          {selectedActionTypes.map((actionTypeId) => {
            const actionType = actionTypes.find((a) => a.id === actionTypeId);
            return (
              <Badge
                key={actionTypeId}
                variant="secondary"
                className="flex items-center gap-1"
                onClick={() => {
                  toggleActionType(actionTypeId);
                  handleSearch();
                }}
              >
                Action: {actionType?.label}
                <XIcon className="h-3 w-3 ml-1 cursor-pointer" />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
