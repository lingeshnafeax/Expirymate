"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileCategories } from "@/constants";

const FileFilter = () => {
  return (
    <div className="flex items-center gap-x-10">
      <div className="flex items-center gap-x-2">
        <Input type="text" placeholder="Coupon Name"></Input>
        <Search />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"}>
            <SlidersHorizontal />
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
              <Label htmlFor="file-category">Category</Label>
              <Select>
                <SelectTrigger
                  id="file-category"
                  className="w-full"
                  defaultValue={FileCategories[0]}
                  onClick={(e) => e.preventDefault()}
                >
                  {FileCategories[0]}
                </SelectTrigger>
                <SelectContent align="end" onClick={(e) => e.preventDefault()}>
                  <SelectItem value={FileCategories[0]}>
                    {FileCategories[0]}
                  </SelectItem>
                  <SelectItem value={FileCategories[1]}>
                    {FileCategories[1]}
                  </SelectItem>
                  <SelectItem value={FileCategories[2]}>
                    {FileCategories[2]}
                  </SelectItem>
                </SelectContent>
              </Select>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FileFilter;
