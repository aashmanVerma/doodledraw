"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react";
import { submitFeedback } from "@/supabase";


export default function feedback() {

  const [feedback, setFeedback] = useState({
    title: null,
    type: null,
    description: null,
    check: false,
  });

  const [sucess, setSuccess] = useState(false);
  const [error, setError] = useState(false);


  const handleFeedback = async () => {
    if (feedback.title && feedback.type && feedback.description) {
      if (feedback.title.length > 0 && feedback.type.length > 0 && feedback.description.length > 0 && feedback.check) {
        try {
          await submitFeedback({
            title: feedback.title,
            type: feedback.type,
            description: feedback.description,
          });
          setSuccess(true);
          setFeedback({
            ...feedback,
            title: null,
            type: null,
            description: null,
            check: false,
          })
          setError(false);
        } catch (error) {
          console.log('error', error);
          setSuccess(false);
          setError(true);
        }
      }
    }
  }


  return (
    <div className="my-14">
      <Card className="mx-auto min-w-[300px] max-w-[500px]">
        <CardHeader>
          <CardTitle>Provide suggestions</CardTitle>
          <CardDescription>Share Your Thoughts, Shape Our Future!</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Title</Label>
                <Input id="title" placeholder="Title of your feedback" onChange={(e) => setFeedback({ ...feedback, title: e.target.value })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Type</Label>
                <Select onValueChange={(e) => setFeedback({ ...feedback, type: e })}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="feature">Feature</SelectItem>
                    <SelectItem value="bug">Bug</SelectItem>
                    <SelectItem value="fix">Fixes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Description</Label>
                <Textarea onChange={(e) => setFeedback({ ...feedback, description: e.target.value })} />
              </div>
            </div>
          </form>
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="terms" onClick={() => setFeedback({ ...feedback, check: !feedback.check })} />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          {
            sucess ? <div className="text-green-600 text-left font-medium text-sm mt-4 ">Feedback submitted successfully</div> : null
          }
          {
            error ? <div className="text-red-600 text-left font-medium text-sm mt-4 ">Error occurred, try again later!</div> : null
          }
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleFeedback}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
