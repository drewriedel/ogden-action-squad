"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export function NewsFilters() {
  const [level, setLevel] = useState("all");

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Filter News</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">News Categories</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="politics" defaultChecked />
              <Label htmlFor="politics">Politics</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="social" defaultChecked />
              <Label htmlFor="social">Social Issues</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="environment" defaultChecked />
              <Label htmlFor="environment">Environment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="economy" defaultChecked />
              <Label htmlFor="economy">Economy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="health" defaultChecked />
              <Label htmlFor="health">Healthcare</Label>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Government Level</h3>
          <RadioGroup value={level} onValueChange={setLevel}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Levels</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="local" id="local" />
              <Label htmlFor="local">Local</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="state" id="state" />
              <Label htmlFor="state">State</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="federal" id="federal" />
              <Label htmlFor="federal">Federal</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Action Type</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="contact" defaultChecked />
              <Label htmlFor="contact">Contact Officials</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="volunteer" defaultChecked />
              <Label htmlFor="volunteer">Volunteer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="donate" defaultChecked />
              <Label htmlFor="donate">Donate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="attend" defaultChecked />
              <Label htmlFor="attend">Attend Events</Label>
            </div>
          </div>
        </div>

        <Button className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  );
}
